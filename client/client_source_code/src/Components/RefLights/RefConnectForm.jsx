import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { REF_SIDE_LEFT, REF_SIDE_RIGHT, REF_MIDDLE } from '../../util'

export default function RefConnectForm(){
    const [errorMsg, setErrorMsg] = useState("")
    const [username, setUsername] = useState("")
    const [roomID, setRoomID] = useState("")
    const [judgeID, setJudgeID] = useState("")
    const RRNavigate = useNavigate()

    const selectedStyle = {backgroundColor: "orange"}
    const errorStyle = {
        color: "red",
        opacity: "70%"
    }

    function logRefIn(){
        
        //Error Handling
        if(!roomID || !username){
            setErrorMsg("The Room ID and/or Username cannot be empty!")
            return
        } else if (!judgeID) {
            setErrorMsg("You didn't pick a judge role!")
            return
        }

        RRNavigate(`join?username=${username}&roomID=${roomID}&judgeID=${judgeID}`)
    }


    return (
        <>
        
            <h2>Connect To A Judge Light Room</h2>
            { errorMsg !== "" && <h3 style = {errorStyle}>{errorMsg}</h3>}
            <input type="text" placeholder="Room ID" value={roomID} onChange = {(e) => setRoomID(e.target.value)} style = {{margin: "10px"}}/>
            <input type="text" placeholder= "Username" value= {username} onChange = {(e) => setUsername(e.target.value)} style = {{margin: "10px"}}/>

            <h2> Select Judge Role </h2> 
            <button className = "judgeButtons" style = {judgeID === REF_SIDE_LEFT ? selectedStyle : {}} onClick = {() => {setJudgeID(REF_SIDE_LEFT)}}> Left Side Judge </button>
            <button className = "judgeButtons" style = {judgeID === REF_SIDE_RIGHT ? selectedStyle : {}} onClick = {() => {setJudgeID(REF_SIDE_RIGHT)}}> Right Side Judge </button>
            <button className = "judgeButtons" style = {judgeID === REF_MIDDLE ? selectedStyle : {}} onClick = {() => {setJudgeID(REF_MIDDLE)}}> Front Judge </button>
            <br/> 
            <button onClick={logRefIn} style = {{backgroundColor: "salmon", marginTop: "20px"}}> Log In! </button>
        </>
    )
}