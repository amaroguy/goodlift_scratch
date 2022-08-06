import React, {useRef, useEffect, useState} from 'react'
import './LifterTable.css'
import io from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { SOCKET_URL } from '../util.js'
import LifterSpectateRow from './LifterSpectateRow.jsx'

//IF YOU CHANGE THIS, ADD A NEW <TD> TO LIFTERDATAROW
const TABLE_HEADINGS = ['Name', 'Sex', 'Weight','Squat', 'Bench', 'Deadlift', 'DOTS']
const HEADING_SPANS = [1,1,1,3,3,3,1]

//LifterTable Spectator Mode?
export default function LifterTableSpectatorMode(props) {

    let StreamingSocketRef = useRef(null)
    let {resultsStreamingID} = useParams()
    //idea for later use: make this a hook, which returns the functions we need to modify the data,
    //pass it into the rows section and the context menu should work. 
    const [tableData, setTableData] = useState({lifters: []})

    function testCallback(foo){
        console.log(foo)
    }

    useEffect(() => {
        const StreamingSocket = io.connect(SOCKET_URL)

        StreamingSocket.emit('joinResultsStreamingRoom', resultsStreamingID, ({tableData}) => {setTableData(tableData)})

        StreamingSocket.on('tableDataUpdated', (data) => {
            console.log(data)
            setTableData(data.newTableData)
        })

        StreamingSocket.on('hostDisconnect', ({msg}) => {
            console.log(msg)
        })

    }, [])


    function generateTableHeadings(){
        return TABLE_HEADINGS.map((title, index) => {
            return <th colSpan={HEADING_SPANS[index]}> 
                {title} 
                </th>
        })
    }


    function generateLifterRows(){
        return tableData.lifters.map(lifter => <LifterSpectateRow lifter = {lifter}/>)
    }

    return (
        <div className="table-container spectate-container">
            <h3 className = "center-header">You are spectating this competition!</h3>
            <table>
                <tbody>
                    <tr>
                        {generateTableHeadings()}
                    </tr>
                    {generateLifterRows()}
                </tbody>
            </table>
        </div>
        )

}