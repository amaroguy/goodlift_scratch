import {React, useState, useEffect, useRef} from 'react'
import {useSelector} from 'react-redux'
import NewLifterTable from './NewLifterTable'
import { SOCKET_URL } from '../util'
import { io } from 'socket.io-client'


export default function MeetManage(props){

    const competitionData = useSelector((store) => store.competitionData)
    let StreamingSocketRef = useRef(null)
    const [resultsStreamingID, setResultsStreamingID] = useState("")

    function startResultsStream() {
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
                <div className="table-container" style = {{marginTop: "100px"}}>
                    <NewLifterTable/>
                </div>
                <div className = "streaming-options">
                        <input className = "general-input" type="text" placeholder="Streaming ID" value={resultsStreamingID} onChange = {(e) => setResultsStreamingID(e.target.value)}/> 
                        <button className="general-button" style = {{marginRight: "20px"}} onClick={() => startResultsStream()}> Start streaming competition </button>
                </div> 
            </>
    )
}