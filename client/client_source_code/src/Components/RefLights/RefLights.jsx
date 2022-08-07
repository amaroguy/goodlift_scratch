import React, {useState, useEffect, useRef} from 'react'
import './RefLights.css'
import io from 'socket.io-client'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { GOOD_LIFT, NO_LIFT, LIFT_NOT_ATTEMPTED, SOCKET_URL } from '../../util'
import { REF_SIDE_LEFT, REF_SIDE_RIGHT, REF_MIDDLE } from '../../util'


//Moved The Room joining so we can pass the room as props
export default function RefLights(props){

    //gets the variables from query string
    const [errorMessage, setErrorMessage] = useState("")
    const [isConnected, setIsConnected] = useState(true)
    const [searchParams] = useSearchParams()
    const username  = searchParams.get('username')
    const qsRoomID = searchParams.get('roomID')
    const qsJudgeID = searchParams.get('judgeID')
    const [lights, setLights] = useState({refOne: LIFT_NOT_ATTEMPTED, refTwo: LIFT_NOT_ATTEMPTED, refThree: LIFT_NOT_ATTEMPTED})
    console.log('foo')
    const clientSocket = useRef()
    const redirectFunction = useNavigate()

    
    
    //LOGIN ERROR HANDLING
    if(!username || !qsRoomID  || !qsJudgeID){
        return (
            <h1> Something Went Wrong! Try again! </h1>
            )
        }
        
        
        
    useEffect( () => {
        const socket =  io.connect(SOCKET_URL)
        socket.emit('joinRoom', {username, roomID: qsRoomID, judgeID: qsJudgeID})
        
        socket.on('connectionDenied', (data) => {
            setErrorMessage(data.errorMessage)
            setTimeout(() => {redirectFunction("/judge")}, 5000)
        })
        
        async function socketSetLight(newLightState){
            await socket.emit('sendLightToServer', {newLightState, roomID: qsRoomID, judgeID: qsJudgeID})
        }
        
        socket.on("receiveLightFromServer", (data) => {
            console.log('Received light from server! Judge ID:', data.judgeID)
            setLight(data.judgeID, data.newLightState)
        })

        socket.on('hostDisconnect', ({msg}) => {
            console.log("HOST DISCONNECTED")
            console.log(msg)
        })

        //I cannot call socketSetLight since it is out of scope, using a ref declared outside
        //Learned that useEffect, even when just onMount, runs after the outer code is run 
        clientSocket.current = socket
        clientSocket.current.socketSetLight = socketSetLight

        return () => {
            socket.disconnect()
        }
    }, [])

    console.log(`Loaded component with room ID ${qsRoomID}`)

    //NON-SOCKET RELATED
    function setLight(refNum, newLightState){

        setLights(oldLights => {
            return {
                ...oldLights,
                [refNum]: newLightState
            }
        })
    }

    function getLightStyle(refNum){
        if(lights[refNum] === GOOD_LIFT){
            return {
                backgroundColor: "white"
            }
        } else if (lights[refNum] === NO_LIFT) {
            return {
                backgroundColor: "red"
            }

        } else if (lights[refNum] === LIFT_NOT_ATTEMPTED){
            return {
                backgroundColor: "black"
            }
        }
    }

    if(errorMessage){
        return (<><h3>You've been disconnected by the server for reason:</h3> <h3>{errorMessage}</h3> <h3>You will be returned to the login page shortly</h3></>)
    }


    return (
        <>  <div> <h3>JUDGE ID: {qsJudgeID}</h3> <h3>This is for platform: {qsRoomID}</h3> <h3>Your username is: {username}</h3></div>
            <div className = "lights-container" style = {{display: "flex", justifyContent: "center"}}>
                <div style = {getLightStyle(REF_SIDE_LEFT)} className = "ref-light-one">Light One</div>
                <div style = {getLightStyle(REF_MIDDLE)} className = "ref-light-two">Light Two</div>
                <div style = {getLightStyle(REF_SIDE_RIGHT)} className = "ref-light-three">Light Three</div>
            </div>
            <div className="buttons-container-ref-one">
                <button onClick = {() => clientSocket.current.socketSetLight(GOOD_LIFT)}>Good Lift</button>
                <button onClick = {() => clientSocket.current.socketSetLight(NO_LIFT)}>No Lift</button>
                <button onClick = {() => clientSocket.current.socketSetLight(LIFT_NOT_ATTEMPTED)}>Not Attempted</button>
            </div>
        </>
    )
}