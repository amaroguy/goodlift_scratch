import React, {useRef, useEffect, useState} from 'react'
import { LifterContext } from './LifterContext.jsx'
import LifterDataRow from './LifterDataRow.jsx'
import './LifterTable.css'
import io from 'socket.io-client'
import { useParams } from 'react-router-dom'

//IF YOU CHANGE THIS, ADD A NEW <TD> TO LIFTERDATAROW
const TABLE_HEADINGS = ['','Name','Weight','Squat', 'Bench', 'Deadlift']
const HEADING_SPANS = [1,1,1,3,3,3]

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
        const StreamingSocket = io.connect("http://localhost:3001")

        StreamingSocket.emit('joinResultsStreamingRoom', resultsStreamingID, ({tableData}) => {setTableData(tableData)})

        StreamingSocket.on('tableDataUpdated', (data) => {
            setTableData(data.newTableData)
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
        return tableData.lifters.map(lifter => <LifterDataRow lifter={lifter} setFocusedLifter = {props.setFocusedLifter} spectate={true}/>)
    }



    return (
        <>
            <table>
                <tbody>
                    <tr>
                        {generateTableHeadings()}
                    </tr>
                    {generateLifterRows()}
                </tbody>
            </table>
            <h3>You are spectating!</h3>
        </>
        )

}