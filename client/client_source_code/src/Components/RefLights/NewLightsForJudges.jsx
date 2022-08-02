import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { GOOD_LIFT, NO_LIFT, LIFT_NOT_ATTEMPTED, SOCKET_URL } from '../../util'
import { io } from 'socket.io-client'
import { useSearchParams } from 'react-router-dom'

export default function NewLights(props){

    const [searchParams] = useSearchParams()
    const username  = searchParams.get('username')
    const resultsStreamingID = searchParams.get('roomID')
    const judgeRole = searchParams.get('judgeID')
    const socketRef = useRef(null)
    const [errorMsg, setErrorMsg] = useState("")

    if(!(username && resultsStreamingID && judgeRole)){
        return <h1> An Error Has Occurred, please try again! </h1>
    }

    const [judgeLights, setJudgeLights] = useState(
        {
        judgeLeft: LIFT_NOT_ATTEMPTED,
        judgeMiddle: LIFT_NOT_ATTEMPTED,
        judgeRight: LIFT_NOT_ATTEMPTED    
    })

    useEffect(() => {
        const socket = io.connect(SOCKET_URL)
        socketRef.current = socket

        socket.emit('joinJudgeRoom', {resultsStreamingID, judgeRole, username})

        socket.emit('fetchLights', resultsStreamingID, 
            (lights) =>{
                setJudgeLights(lights)
        })

        socket.on('syncLights', ({lights}) => {
            setJudgeLights(lights)
        })

        function setLight(judgeRole, lightStatus){
            socket.emit('changeLight', {resultsStreamingID, judgeRole, lightStatus})
        }

        socket.on('forceDisconnect', ({msg}) => {
            setErrorMsg(msg)
        })

        socket.on('hostDisconnect', ({msg}) => {
            console.log(msg)
        })

        socketRef.current.setLight = setLight
    }, [])

    function lightStyle(status){
        switch(status){
            case GOOD_LIFT:
                return {backgroundColor: "white"}
            case NO_LIFT:
                return {backgroundColor: "red"}
            case LIFT_NOT_ATTEMPTED:
                return {backgroundColor: "black"}
        }
    }

    function isUser(judge){
        if(judge === judgeRole){
            return {border: "7px solid goldenrod"}
        }

        return {}
    }

    if(errorMsg){
        return (<h2> {errorMsg} </h2>)
    }


    return (
        <>
            <div className="lights-container">
                <div className="light" 
                style = {{...lightStyle(judgeLights.judgeLeft), ...isUser("judgeLeft")}}>
                </div>

                <div className="light" 
                style = {{...lightStyle(judgeLights.judgeMiddle), ...isUser("judgeMiddle")}}>
                </div>

                <div className="light"
                style = {{...lightStyle(judgeLights.judgeRight), ...isUser("judgeRight")}}>
                </div>
            </div>
            <div className="light-buttons-container">
                <button className="no-lift-btn" onClick = {() => socketRef.current.setLight(judgeRole, NO_LIFT)}> No lift</button>
                <button className="na-lift-btn" onClick = {() => socketRef.current.setLight(judgeRole, LIFT_NOT_ATTEMPTED)}> Reset </button>
                <button className="good-lift-btn" onClick = {() => socketRef.current.setLight(judgeRole, GOOD_LIFT)}> Good Lift</button>
            </div>
            <small> The light you control has a golden border </small>
        </>
    )

}