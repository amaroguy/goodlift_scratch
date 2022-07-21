import React, {useState, useEffect, useRef} from 'react'
import './RefLights.css'
import io from 'socket.io-client'
import { useSearchParams } from 'react-router-dom'

const LIFT_NOT_ATTEMPTED = "NOT ATTEMPTED"
const GOOD_LIFT = "GOOD LIFT"
const BAD_LIFT = "BAD LIFT"

const REF_ONE = "refOne"
const REF_TWO = "refTwo"
const REF_THREE = "refThree"


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

    
    
    //LOGIN ERROR HANDLING
    if(!username || !qsRoomID  || !qsJudgeID){
        return (
            <h1> Something Went Wrong! Try again! </h1>
            )
        }
        
        
        
    useEffect( () => {
        const socket =  io.connect("http://localhost:3001")
        socket.emit('joinRoom', {username, roomID: qsRoomID, judgeID: qsJudgeID})
        
        socket.on('connectionDenied', (data) => {
            return <h3> data.errorMessage</h3>
        })
        
        async function socketSetLight(newLightState){
            await socket.emit('sendLightToServer', {newLightState, roomID: qsRoomID, refID: qsJudgeID})
        }
        
        socket.on("receiveLightFromServer", (data) => {
            console.log('Received light from server!')
            setLight(REF_ONE, data.newLightState)
        })

        clientSocket.current = socket
        clientSocket.current.socketSetLight = socketSetLight
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
        } else if (lights[refNum] === BAD_LIFT) {
            return {
                backgroundColor: "red"
            }

        } else if (lights[refNum] === LIFT_NOT_ATTEMPTED){
            return {
                backgroundColor: "black"
            }
        }
    }


    return (
        <>
            <div className = "lights-container">
                <div style = {getLightStyle(REF_ONE)} className = "ref-light-one">Light One</div>
                <div  className = "ref-light-two">Light Two</div>
                <div  className = "ref-light-three">Light Three</div>
                
                <div className="buttons-container-ref-one">
                    <button onClick = {() => clientSocket.current.socketSetLight(GOOD_LIFT)}>Set Light 1 to Good Lift</button>
                    <button onClick = {() => clientSocket.current.socketSetLight(BAD_LIFT)}>Set Light 2 to No Lift</button>
                    <button onClick = {() => clientSocket.current.socketSetLight(LIFT_NOT_ATTEMPTED)}>Set Light 3 to Not Attempted</button>
                </div>
            </div>
        </>
    )
}