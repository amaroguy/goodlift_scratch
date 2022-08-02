import React from "react"
import { TABLE_HEADINGS, HEADING_SPANS } from "../../util"
import { GOOD_LIFT, NO_LIFT, LIFT_NOT_ATTEMPTED } from "../../util"

export default function JudgeMonitorTable({tableData}) {

    if(tableData.displayedLift.lifterID === -1){
        return (<h1>No lifter has been displayed by the meet manager!</h1>)
    }



    function generateTableHeadings() {
        return TABLE_HEADINGS.map((title, index) => {
            return <th colSpan = {HEADING_SPANS[index]}>
                {title}
            </th>
        })
    }

    let lifter = tableData.lifters.find((lifter) => {
        return lifter.id === tableData.displayedLift.lifterID
    })


    //export to utils
    function getLightStyle(result){
        switch(result){
            case GOOD_LIFT:
                return {backgroundColor: "#76DE6D"}
            case NO_LIFT: 
                return {backgroundColor: "#E05265"}
            case LIFT_NOT_ATTEMPTED:
                return {backgroundColor: "#D3DBDD"}
            default:
                console.log('Invalid Lift Result Passed in, please contact the site owner')
        }
    }

    let squat = lifter.lifts.squat
    let deadlift = lifter.lifts.deadlift
    let bench = lifter.lifts.bench

    return (            
    <table>
        <tbody>
            <tr>
                {generateTableHeadings()}
            </tr>
            <tr>
                <td className="jm-td">
                    <input type = "text" value = {lifter.name} />
                </td>    
                <td className="jm-td">
                    <input className = "weight-class-input" type = "text" value = {lifter.weightClass} />
                </td>    
                <td className="jm-td"  style={getLightStyle(squat.attemptOne.status)} >
                    <input type = "text" className = "lift-entry" value = {squat.attemptOne.weight} />
                </td>    
                <td className="jm-td"  style={getLightStyle(squat.attemptTwo.status)}>
                    <input type = "text" className = "lift-entry" value = {squat.attemptTwo.weight} />
                </td>    
                <td className="jm-td"  style={getLightStyle(squat.attemptThree.status)}>
                    <input type = "text" className = "lift-entry" value = {squat.attemptThree.weight} />
                </td>    
                <td className="jm-td"   style={getLightStyle(bench.attemptOne.status)}>
                    <input type = "text" className = "lift-entry" value = {bench.attemptOne.weight} />
                </td>    
                <td className="jm-td"  style={getLightStyle(bench.attemptTwo.status)}>
                    <input type = "text" className = "lift-entry" value = {bench.attemptTwo.weight}  />
                </td>    
                <td className="jm-td"  style={getLightStyle(bench.attemptThree.status)}>
                    <input type = "text" className = "lift-entry" value = {bench.attemptThree.weight}  />
                </td>    
                <td className="jm-td"  style={getLightStyle(deadlift.attemptOne.status)}>
                    <input type = "text" className = "lift-entry" value = {deadlift.attemptOne.weight} />
                </td>    
                <td className="jm-td"  style={getLightStyle(deadlift.attemptTwo.status)}>
                    <input type = "text" className = "lift-entry" value = {deadlift.attemptTwo.weight}  />
                </td>    
                <td className="jm-td"  style={getLightStyle(deadlift.attemptThree.status)}>
                    <input type = "text" className = "lift-entry" value = {deadlift.attemptThree.weight}  />
                </td> 
                <td className="jm-td">
                    456
                </td>
            </tr>
        </tbody>
    </table>
    )
}