import React, {useState} from 'react'
import RefLights from './RefLights'
import RefConnectForm from './RefConnectForm'

export default function RefUI(){
    const [isInRoom, setIsInRoom] = useState(false)
    const [roomID, setRoomID] = useState("")
    const [username, setUsername] = useState("")

    return (
        <>
            {isInRoom ? 
            <RefLights setIsInRoom = {setIsInRoom} roomID = {roomID} username={username}/> : 
            <RefConnectForm 
            setIsInRoom={setIsInRoom} 
            roomID={roomID} 
            setRoomID={setRoomID}
            username={username}
            setUsername={setUsername}/>}
        </>
    )
    
}