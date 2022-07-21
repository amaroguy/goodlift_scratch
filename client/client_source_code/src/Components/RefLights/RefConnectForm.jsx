import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function RefConnectForm(){
    const [errorMsg, setErrorMsg] = useState("")
    const [username, setUsername] = useState("")
    const [roomID, setRoomID] = useState("")
    const [judgeID, setJudgeID] = useState(0)
    const RRNavigate = useNavigate()

    //TODO CHANGE THESE BACK!!!!
    const REF_ONE = "judgeLeft"
    const REF_TWO = "judgeMid"
    const REF_THREE = "judgeRight"

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
            <button className = "judgeButtons" style = {judgeID === REF_ONE ? selectedStyle : {}} onClick = {() => {setJudgeID(REF_ONE)}}> Left Side Judge </button>
            <button className = "judgeButtons" style = {judgeID === REF_TWO ? selectedStyle : {}} onClick = {() => {setJudgeID(REF_TWO)}}> Right Side Judge </button>
            <button className = "judgeButtons" style = {judgeID === REF_THREE ? selectedStyle : {}} onClick = {() => {setJudgeID(REF_THREE)}}> Front Judge </button>
            <br/> 
            <button onClick={logRefIn} style = {{backgroundColor: "salmon", marginTop: "20px"}}> Log In! </button>
        </>
    )
}