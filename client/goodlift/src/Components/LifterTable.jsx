import React from 'react'
import { LifterContext } from './LifterContext.jsx'
import LifterDataRow from './LifterDataRow.jsx'
import './LifterTable.css'


const TABLE_HEADINGS = ['Name','Weight','Squat', 'Bench', 'Deadlift']
const HEADING_SPANS = [1,1,3,3,3]




function LifterTable (props) {

    const Context = React.useContext(LifterContext)
    console.log(Context)

    function generateTableHeadings(){
        return TABLE_HEADINGS.map((title, index) => {
            return <th colSpan={HEADING_SPANS[index]}> 
                {title} 
                </th>
        })
    }

    function generateLifterRows(){
        return Context.compData.lifters.map(lifter => <LifterDataRow lifter={lifter}/>)
    }



    return (
        <table>
            <tbody>
                <tr>
                    {generateTableHeadings()}
                </tr>
                {generateLifterRows()}
            </tbody>
        </table>
        )
}

export default LifterTable