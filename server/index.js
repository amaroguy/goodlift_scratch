const express = require('express')
const path = require('path')
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const { SocketAddress } = require('net')
const { verify } = require('crypto')
//END IMPORTS



const PORT = 3001 || process.env.PORT;



const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server,  {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"]
    }
})
//END SERVER INIT

//socket gives the user, get its id with socket.id
//TODO REFACTOR, REPLACE FOREACH WITH FOR LOOP IN ORDER FOR BREAK TO WORK
io.on('connection', socket => {
    console.log('New WS Connection....', socket.id)


    //RESULTS TABLE STREAMING
    socket.on('initResultsStreamingRoom', (data) => {
        socket.join(data.resultsStreamingID)
        console.log('Started Room:', data.streamingRoomID)
    })

    socket.on('joinResultsStreamingRoom', (data) => {
        socket.join(data.resultsStreamingID)
    })


    //DEBUG
    socket.on('foo', (data) => {
        socket.emit('bar', {msg: `I received the message "${data.msg}" from ${socket.id}`})
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
    })

})




server.listen(PORT, () => console.log(`Server running on ${PORT}`))
