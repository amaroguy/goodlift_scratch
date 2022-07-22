import React, {useState, useEffect, useRef} from 'react'
import LifterTable from '../LifterTable'
import './MeetManager.css'
import { LIFT_NOT_ATTEMPTED, NO_LIFT, GOOD_LIFT, SPECTATOR } from '../../util'
import io from 'socket.io-client'


export default function MeetManager (){

    const [focusedLifter, setFocusedLifter] = useState("")
    const [currentPlatform, setCurrentPlatform] = useState(-1)
    const [judgeLightsRoomID, setJudgeLightsRoomID] = useState("")
    const [resultsStreamingID, setResultsStreamingID] = useState("")
    const [errorMsgStreaming, setErrorMsgStreaming] = useState("")
    const [errorMsgLights, setErrorMsgLights] = useState("")
    const [isLightsConnected, setIsLightsConnected] = useState(false)
    const [isStreamingConnected, setIsStreamingConnected] = useState(false)
    const [lights, setLights] = useState({refOne: LIFT_NOT_ATTEMPTED, refTwo: LIFT_NOT_ATTEMPTED, refThree: LIFT_NOT_ATTEMPTED})

    //TODO Move into hook/utils?
    function setLight(refNum, newLightState){

        setLights(oldLights => {
            return {
                ...oldLights,
                [refNum]: newLightState
            }
        })
    }


    let StreamingSocketRef = useRef(null)
    let LightSocketRef = useRef(null)
 
    let highlight = {
        backgroundColor: "#B1B1B1",
        paddingLeft: "25px",
        paddingRight: "25px"
    }

    function getPotentialHighlight(buttonNum){
        return currentPlatform === buttonNum ? highlight : {}
    }

    //REDO move this into the table itself 
    function startStreamingSocket(){
        if(!isStreamingConnected){
            StreamingSocketRef.current = io.connect("http://localhost:3001")
            setIsStreamingConnected(true)
        }
    }

    //TODO This could actually be a hook :thonk:
    function startLightsSocket(){
        if(!isLightsConnected){
            LightSocketRef.current = io.connect("http://localhost:3001")
            LightSocketRef.current.emit('joinRoom', {judgeID: SPECTATOR, username: SPECTATOR, roomID: judgeLightsRoomID})

            LightSocketRef.current.on('receiveLightFromServer', (data) => {
                setLight(data.judgeID, data.newLightState)
                console.log(lights)
            })

            setIsLightsConnected(true)
        }
    }




    return (
        <>
            <div className = "table-nav">
                <div className = "table-nav-judge-lights-container">
                    <div className="table-nav-judge-light">1</div>
                    <div className="table-nav-judge-light">2</div>
                    <div className="table-nav-judge-light">3</div>
                </div>
                
                <p className = "table-nav-txt">Current Lifter: {focusedLifter.name ? focusedLifter.name : "N/A"} </p>

                <button style = {getPotentialHighlight(-1)} className = "table-nav-platform-tab" onClick = {() => setCurrentPlatform(-1)}> All </button>
                <button style = {getPotentialHighlight(1)} className = "table-nav-platform-tab" onClick = {() => setCurrentPlatform(1)}> Platform 1</button>
                <button style = {getPotentialHighlight(2)} className = "table-nav-platform-tab" onClick = {() => setCurrentPlatform(2)}> Platform 2</button>
                <button style = {getPotentialHighlight(3)} className = "table-nav-platform-tab" onClick = {() => setCurrentPlatform(3)}> Platform 3</button>
            </div>
            <LifterTable setFocusedLifter = {setFocusedLifter}/>
            <input type = "text" placeholder="Judge Light session ID" value = {judgeLightsRoomID} onChange = {(e) => setJudgeLightsRoomID(e.target.value)}/> 
            <button className = "btn" onClick = {() => startLightsSocket()}>Connect to Judge Lights</button> 
            <br/>
            {errorMsgLights && <h3>{errorMsgLights}</h3>}
            {errorMsgStreaming && <h3>{errorMsgStreaming}</h3>}
        </>
    )
}

//Itll probably be this
// <>
// <LifterTable/>
// <AddLifterButton/>
// <DownloadDataButton/>
// </> 