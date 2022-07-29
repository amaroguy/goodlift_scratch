import React, {useState, useEffect, useRef} from 'react'
import LifterTable from '../LifterTable'
import './MeetManager.css'
import { LIFT_NOT_ATTEMPTED, NO_LIFT, GOOD_LIFT, SPECTATOR } from '../../util'
import io from 'socket.io-client'


export default function MeetManager (){

    const [focusedLifter, setFocusedLifter] = useState("")

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


<>
{/* {errorMsgLights && <h3>{errorMsgLights}</h3>}
{errorMsgStreaming && <h3>{errorMsgStreaming}</h3>} */}

<div className = "table-nav">
    <div className = "table-nav-judge-lights-container">
        <div className="table-nav-judge-light">1</div>
        <div className="table-nav-judge-light">2</div>
        <div className="table-nav-judge-light">3</div>
    </div>
    
    <p className = "table-nav-txt">Current Lifter: {focusedLifter.name ? focusedLifter.name : "N/A"} </p>
</div>
{/* <br/> */}
{/* {errorMsgLights && <h3>{errorMsgLights}</h3>}
{errorMsgStreaming && <h3>{errorMsgStreaming}</h3>} */}
</>