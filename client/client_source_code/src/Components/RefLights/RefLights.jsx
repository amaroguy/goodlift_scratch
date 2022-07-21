import React, {useState, useEffect} from 'react'
import './RefLights.css'
import io from 'socket.io-client'
import { useSearchParams } from 'react-router-dom'

const LIFT_NOT_ATTEMPTED = "NOT ATTEMPTED"
const GOOD_LIFT = "GOOD LIFT"
const BAD_LIFT = "BAD LIFT"

const REF_ONE = "refOne"
const REF_TWO = "refTwo"
const REF_THREE = "refThree"

const socket = io.connect("http://localhost:3001")

//Moved The Room joining so we can pass the room as props
export default function RefLights(props){

    //gets the variables from query string
    const [searchParams] = useSearchParams()
    const username  = searchParams.get('username')
    const qsRoomID = searchParams.get('roomID')
    const qsJudgeID = searchParams.get('judgeID')


    const [lights, setLights] = useState({refOne: LIFT_NOT_ATTEMPTED, refTwo: LIFT_NOT_ATTEMPTED, refThree: LIFT_NOT_ATTEMPTED})


    console.log("QUERY STRING PARAM USERNAME:", username)
    console.log("QUERY STRING PARAM ROOMID:", qsRoomID)

    //ERROR HANDLING
    if(!username || !qsRoomID  || !qsJudgeID){
        return (
            <h1> Something Went Wrong! Try again! </h1>
        )
    }

    console.log(`Loaded component with room ID ${qsRoomID}`)

    //START SOCKET INTERACTION 
    useEffect( () => {
        //we do NOT want to be sending this every time the component rerenders 
        socket.emit('joinRoom', {room: props.roomID})
        console.log(`Joined room ${props.roomID}`)
        }
    ,[])

    async function socketSetLight(newLightState){
        await socket.emit('sendLight', {newLightState, room: props.roomID})
    }

    socket.on("receiveLight", (data) => {
        console.log('Received light from server!')
        setLight(REF_ONE, data.newLightState)
    })

    //END SOCKET INTERACTION



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
                    <button onClick = {() => socketSetLight(GOOD_LIFT)}>Set Light 1 to Good Lift</button>
                    <button onClick = {() => socketSetLight(BAD_LIFT)}>Set Light 2 to No Lift</button>
                    <button onClick = {() => socketSetLight(LIFT_NOT_ATTEMPTED)}>Set Light 3 to Not Attempted</button>
                </div>
            </div>
        </>
    )
}