import {React, useState, useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import NewLifterTable from './NewLifterTable'
import { SOCKET_URL } from '../util'
import { io } from 'socket.io-client'
import CompetitionDetails from './CompetitionDetails'


export default function MeetManage(props){

    const [editDetails, setEditDetails] = useState(false)
    const competitionData = useSelector((store) => store.competitionData)
    let StreamingSocketRef = useRef(null)
    const [resultsStreamingID, setResultsStreamingID] = useState("")
    const [isStreaming, setIsStreaming] = useState(false)
    const [streamError, setStreamError] = useState("")

    const handleToggle = () => setEditDetails(oldVal => !oldVal)



    function startResultsStream() {

        if(resultsStreamingID.indexOf(" ") !== -1){
            setStreamError('Spaces are not allowed to be part of the streaming ID')
            return
        }


        setIsStreaming(true)

        if(StreamingSocketRef.current){
            console.log("You're already connected!")
            return
        }
        StreamingSocketRef.current = io.connect(SOCKET_URL)
        StreamingSocketRef.current.emit('initResultsStreamingRoom', {tableData: competitionData, resultsStreamingID})
    }

    useEffect(() => {
        if(StreamingSocketRef.current){
            StreamingSocketRef.current.emit('hostUpdateTableData', {newTableData: competitionData, resultsStreamingID})
        }
    }, [competitionData])

    return (
            <>  
                {/* <button className = "general-button" onClick = {handleToggle} > Toggle Comp Details </button>  */}
                {
                    editDetails ? 
                    <CompetitionDetails/> : 
                    <>
                        <div className="table-container" style = {{marginTop: "100px"}}>
                            <NewLifterTable/>
                            <br/>
                            <small> Right click on a lifter's name to delete them from the competition! </small> <br/>
                            <small> Right click on a lift input to change it to a Good Lift or No Lift! </small>
                        </div>
                        <div className = "streaming-options">
                                {streamError && <p style = {{color: "salmon"}} >{streamError}</p>}
                                <input className = "general-input" type="text" placeholder="Streaming ID" value={resultsStreamingID} onChange = {(e) => setResultsStreamingID(e.target.value)}/> 
                                <button className="general-button" style = {{marginRight: "20px"}} onClick={() => startResultsStream()}> Start streaming competition </button>
                        </div>
                        {isStreaming && 
                            <div>
                                <h2> Keep this window open! Refreshing or closing the tab will stop streaming the competition! </h2>
                                <p> You can access the online functionalities by going to the links below </p>
                                <p> Let anybody in the world have a live feed of the results: {`https://amaro.tech/goodlift/spectate/${resultsStreamingID}`} </p>
                                <p> A monitor displaying details of the focused lifter, and how to load their weight: {`https://amaro.tech/goodlift/judgemonitor/${resultsStreamingID}`} </p>
                                <p> Allow judges to connect to the judge lights {`https://amaro.tech/judge`}, the room ID will be what you entered, which is {resultsStreamingID} </p>
                            </div>
                        }
                    </>
                }
            </>
    )
}