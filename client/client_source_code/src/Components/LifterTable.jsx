import React, {useRef, useState} from 'react'
import { LifterContext } from './LifterContext.jsx'
import LifterDataRow from './LifterDataRow.jsx'
import './LifterTable.css'
import io from 'socket.io-client'
import ContextMenuLightButtons from './ContextMenuLightButtons.jsx'
import LifterTableNav from './LifterTableNav.jsx'
import { useEffect } from 'react'
import AddLifterButton from './AddLifterButton.jsx'
import {v4 as uuid} from 'uuid'
import { SOCKET_URL } from '../util.js'

//IF YOU CHANGE THIS, ADD A NEW <TD> TO LIFTERDATAROW
//TURN THIS INTO A CONSTANT
const TABLE_HEADINGS = ['Name', 'Sex', 'Weight','Squat', 'Bench', 'Deadlift', 'DOTS']
const HEADING_SPANS = [1,1,1,3,3,3,1]


function LifterTable (props) {

    const Context = React.useContext(LifterContext)
    let StreamingSocketRef = useRef(null)

    const [resultsStreamingID, setResultsStreamingID] = useState("")

    function startResultsStream(){

        if(StreamingSocketRef.current){
            console.log("You're already Connected!")
            return
        } 

        StreamingSocketRef.current = io.connect(SOCKET_URL)
        StreamingSocketRef.current.emit("initResultsStreamingRoom", {tableData: Context.compData, resultsStreamingID})
    }

    function generateTableHeadings(){
        return TABLE_HEADINGS.map((title, index) => {
            return <th  colSpan={HEADING_SPANS[index]}> 
                {title} 
                </th>
        })
    }

    useEffect(() => {
        if(StreamingSocketRef.current){
            StreamingSocketRef.current.emit('hostUpdateTableData', {newTableData: Context.compData, resultsStreamingID})   
        }
    }, [Context.compData])


    function generateLifterRows(){
        return Context.compData.lifters.map(lifter => <LifterDataRow  lifter={lifter}/>)
    }

    let rows = generateLifterRows()

    //cannot use state bc then context menu functions wont work.
    return (
        <div className="table-container">
            <LifterTableNav/>
            <table>
                <tbody>
                    <tr>
                        {generateTableHeadings()}
                    </tr>
                    {rows}
                </tbody>
            </table>
            
            { props.spectatorMode ?  <h2>Spectator Mode</h2> : 
                <>
                    <div className = "streaming-options">
                        <input className = "general-input" type="text" placeholder="Streaming ID" value={resultsStreamingID} onChange = {(e) => setResultsStreamingID(e.target.value)}/> 
                        <button className="general-button" style = {{marginRight: "20px"}} onClick={() => startResultsStream()}> Start streaming competition </button>
                    </div> 
                    <div className = "streaming-options">
                        <AddLifterButton/>
                    </div> 

                </>
            }
            <h3> The number of lifters is {Context.compData.lifters.length} </h3>
        </div>
        )
}

export default LifterTable