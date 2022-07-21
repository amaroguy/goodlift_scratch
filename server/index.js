const express = require('express')
const path = require('path')
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const { SocketAddress } = require('net')
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

//set static folder

//socket gives the user, get its id with socket.id
io.on('connection', socket => {
    console.log('New WS Connection....', socket.id)

    //socket gets put in a room sent from the front end 
    socket.on("joinRoom", (data) => {
        socket.join(data.room)
        console.log(`joined room ${data.room}`)
    })

    //received light change from referee
    socket.on('sendLight', (data) => {
        console.log(data.newLightState)

        //send it back to all referees in the sender's room
        socket.in(data.room).emit("receiveLight", {newLightState: data.newLightState})
        socket.emit("receiveLight", {newLightState: data.newLightState})
    })



    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
    })

})




server.listen(PORT, () => console.log(`Server running on ${PORT}`))
