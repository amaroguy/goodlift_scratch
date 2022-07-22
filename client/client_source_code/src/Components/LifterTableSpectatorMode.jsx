import React, {useRef, useState} from 'react'
import { LifterContext } from './LifterContext.jsx'
import LifterDataRow from './LifterDataRow.jsx'
import './LifterTable.css'
import io from 'socket.io-client'

//IF YOU CHANGE THIS, ADD A NEW <TD> TO LIFTERDATAROW
const TABLE_HEADINGS = ['','Name','Weight','Squat', 'Bench', 'Deadlift']
const HEADING_SPANS = [1,1,1,3,3,3]



//LifterTable Spectator Mode?
function LifterTable (props) {

    const Context = React.useContext(LifterContext)
    let StreamingSocketRef = useRef(null)

    const [resultsStreamingID, setResultsStreamingID] = useState("")

    function startResultsStream(){

        if(StreamingSocketRef.current){
            console.log("You're already Connected!")
            return
        }

        StreamingSocketRef.current = io.connect("http://localhost:3001")
        StreamingSocketRef.current.emit('initResultsStreamingRoom', {streamingRoomID: resultsStreamingID, username: "HOST"})

        StreamingSocketRef.current.on('compDataRequest', (data) => {
            StreamingSocketRef.current.emit('compDataResponse', 
            {compData: Context.compData.lifters, tableHeadings: TABLE_HEADINGS, headingSpans:HEADING_SPANS})
        })
    }

    function generateTableHeadings(){
        return TABLE_HEADINGS.map((title, index) => {
            return <th colSpan={HEADING_SPANS[index]}> 
                {title} 
                </th>
        })
    }


    function generateLifterRows(){
        return Context.compData.lifters.map(lifter => <LifterDataRow lifter={lifter} setFocusedLifter = {props.setFocusedLifter}/>)
    }



    // return (
    //     <>
    //         <table>
    //             <tbody>
    //                 <tr>
    //                     {generateTableHeadings()}
    //                 </tr>
    //                 {generateLifterRows()}
    //             </tbody>
    //         </table>
            
    //         { props.spectatorMode ?  <h2>Spectator Mode</h2> : 
    //             <>
    //                 <input type="text" placeholder="Streaming ID" value={resultsStreamingID} onChange = {(e) => setResultsStreamingID(e.target.value)}/> 
    //                 <button className="btn" style = {{marginRight: "20px"}} onClick={() => startResultsStream()}> Start Streaming results table </button>
    //             </> 
    //         }
    //     </>
    //     )

    return (
        <h1>Spectator Mode</h1>
    )
}