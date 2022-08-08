const express = require('express')
const path = require('path')
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const { SocketAddress } = require('net')
const { table } = require('console')
//END IMPORTS

const PORT = process.env.PORT || 3001; 

const TEST = "FOO"

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server,  {
    cors: {
        origin: "amaro.tech",
        methods: ["GET", "POST"]
    }
})
//END SERVER INIT


// roomName: {host: socketID, tabledata: data lol }
let tableDataRooms = {

}

let lightRooms = {

}

//socket gives the user, get its id with socket.id
//TODO REFACTOR, REPLACE FOREACH WITH FOR LOOP IN ORDER FOR BREAK TO WORK
io.on('connection', socket => {
    console.log('New WS Connection....', socket.id)


    //RESULTS TABLE STREAMING
    socket.on('initResultsStreamingRoom', (data) => {
        socket.join(data.resultsStreamingID)

        tableDataRooms[data.resultsStreamingID] = {
            host: socket.id,
            tableData: data.tableData
        }

        //toupper the usernames 
        lightRooms[data.resultsStreamingID] = {
            host: socket.id,
            lights: {
                judgeLeft: "NOT ATTEMPTED",
                judgeMiddle: "NOT ATTEMPTED",
                judgeRight: "NOT ATTEMPTED"
            },
            allowedUsernames: [],
            usersJoined: []
        }
        //check if usersJoined < 3

        socket.isHost = true
        socket.roomHosted = data.resultsStreamingID
        
        console.log(tableDataRooms)
        console.log(lightRooms)

        console.log('Started Rooms:', data.resultsStreamingID) 
    })

    socket.on('joinResultsStreamingRoom', (resultsStreamingID, callback) => {
        console.log('Spectator joined room:', resultsStreamingID)
        socket.join(resultsStreamingID)

        callback(tableDataRooms[resultsStreamingID])  
    })

    //tabledata === compdata
    socket.on('hostUpdateTableData', (data) => {
        tableDataRooms[data.resultsStreamingID].tableData = data.newTableData
        console.log("Host updated the table data to:", data.newTableData )
        socket.in(data.resultsStreamingID).emit('tableDataUpdated', {newTableData: data.newTableData})
    })

    socket.on('joinJudgeRoom', ({username, judgeRole, resultsStreamingID}) => {
        //TODO ADD VERIFICATION
        if(!(username && judgeRole && resultsStreamingID)){
            console.log("CRITICAL ERROR: INVALID PARAMETERS IN JOINJUDGEROOM") 
        }

        console.log(lightRooms)
        console.log(lightRooms.hasOwnProperty(resultsStreamingID))

        if(!lightRooms.hasOwnProperty(resultsStreamingID)){
            socket.emit('forceDisconnect', {msg: "This room does not exist!"}) 
            socket.disconnect()
        }

        socket.join(resultsStreamingID)

        console.log(`Joined room with these stats
            {
                username: ${username}
                judgeRole: ${judgeRole}
                resultsStreamingID: ${resultsStreamingID} 
            }
        `)

    })

    socket.on('fetchLights', (resultsStreamingID, callback) => {
        callback(lightRooms[resultsStreamingID].lights)
    })

    socket.on('changeLight', ({resultsStreamingID, judgeRole, lightStatus}) => {
 
        console.log(lightRooms[resultsStreamingID].lights) 

        //edit lights server side
        lightRooms[resultsStreamingID].lights = {
            ...lightRooms[resultsStreamingID].lights,
            [judgeRole]: lightStatus
        }

        //sync new changes with refs
        socket.in(resultsStreamingID).emit('syncLights', {lights: lightRooms[resultsStreamingID].lights})
        socket.emit('syncLights', {lights: lightRooms[resultsStreamingID].lights})

    }) 


    //Store the table on the server, every change we make after we're connected, the server will be updating its own table too, when a user joins, since the server has a copy of it, we'll just send it to them
  







    //DEBUG
    socket.on('foo', (callback) => { 
        callback()
    })


    async function verifyConnection(data) {
        const sockets = await io.in(data.roomID).fetchSockets();
        console.log('SOCKETS CONNECTED :', sockets.length)
        console.log('Verifying connection for new socket...')
        console.log('Socket Info:')
        console.log(`
            {
                username: ${data.username}
                judge id: ${data.judgeID}
            }
        `)
        // console.log('CURRENT SOCKET: ',socket)
        
        isDC = false

        sockets.forEach(roomSocket => {

            // console.log('ITERATING SOCKET', roomSocket)
            if(isDC) {return}

            //Short circuit these checks if its a spectator, actually move these out but im too lazy because its 3am
            if((roomSocket.judgeID !== "SPECTATOR") && (roomSocket.username === data.username)){
                //TODO deny connection and return error msg
                console.log("VERIFICATION ERROR: SOCKET USED DUPLICATE USERNAME")
                console.log(`${roomSocket.id} conflicted with ${socket.id}`)
                console.log(`conflicting username was ${roomSocket.username} === ${data.username}`)
                socket.emit('connectionDenied', {errorMessage: "There is already somebody with this username connected!"})
                socket.disconnect(true)
                isDC = true
                return
            } else if ((roomSocket.judgeID !== "SPECTATOR") && (roomSocket.judgeID === data.judgeID)) {
                //TODO deny connection and return error msg
                console.log("VERIFICATION ERROR: SOCKET USED DUPLICATE JUDGE ID")
                socket.emit('connectionDenied', {errorMessage: "This judge seat is already taken!"})
                socket.disconnect(true)
                isDC = true
                return
            }
        })

        
        if(!isDC) { console.log('Connection Verified!') }
    }


    //socket gets put in a room sent from the front end
    socket.on("joinRoom", async (data) => {

        await verifyConnection(data)

        socket.judgeID = data.judgeID
        socket.username = data.username
        socket.lightState = "NOT ATTEMPTED"


        socket.join(data.roomID)
        console.log(`joined room ${data.roomID}`)
    })

    //received light change from judge/client
    socket.on('sendLightToServer', (data) => {
        console.log(data.newLightState)

        //send it back to all judge/client in the sender's room
        socket.in(data.roomID).emit("receiveLightFromServer", {judgeID: data.judgeID, newLightState: data.newLightState})
        socket.emit("receiveLightFromServer", {judgeID: data.judgeID, newLightState: data.newLightState})
    })



    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)

        if(socket.isHost){
            socket.in(socket.roomHosted).emit('hostDisconnect', {msg: "The host of this competition has disconnected, you will be redirected soon."})
            io.socketsLeave(socket.roomHosted)
            
            delete tableDataRooms[socket.roomHosted]
            delete lightRooms[socket.roomHosted]
        }

    })

})




server.listen(PORT, () => console.log(`Server running on ${PORT}`))
