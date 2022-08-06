import deepEqual from 'deep-equal'
import {React, memo} from 'react'
import {GOOD_LIFT, NO_LIFT, LIFT_NOT_ATTEMPTED} from '../util.js'

function LifterSpectateRow({lifter}) {

    console.log('rendering lifter row of', lifter.name)

    const {squat, bench, deadlift} = lifter.lifts

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

    return (
        <tr>
            <td>
                <input type = "text" 
                className = "table-input" 
                value = {lifter.name} 
                readOnly= {true}
                />
            </td>
            <td>
                <select 
                name = "sex" 
                id = "sex" 
                value = {lifter.sex}
                readOnly= {true} >
                    <option value = "M">M</option>
                    <option value = "F">F</option>
                </select>
            </td>
            <td>
                <input 
                type="text"
                value={lifter.weightClass}
                readOnly= {true}
                />
            </td>
            <td className = "lift-entry-td" 
                style = {getLightStyle(squat.attemptOne.status)}
            >
                <input 
                type= "text" 
                className = "lift-entry table-input"
                value = {squat.attemptOne.weight}
                readOnly= {true}
                />
            </td>
            <td className = "lift-entry-td" style = {getLightStyle(squat.attemptTwo.status)}>

                <input 
                type= "text" 
                className = "lift-entry table-input"
                value = {squat.attemptTwo.weight}
                readOnly= {true}
                />
            </td>
            <td className = "lift-entry-td" style = {getLightStyle(squat.attemptThree.status)}>
                <input 
                type= "text" 
                className = "lift-entry table-input"
                value = {squat.attemptThree.weight}
                readOnly= {true}
                />
            </td>
            <td className = "lift-entry-td" style = {getLightStyle(bench.attemptOne.status)}>
                <input 
                type= "text" 
                className = "lift-entry table-input"
                value = {bench.attemptOne.weight}
                readOnly= {true}
                />
            </td>
            <td className = "lift-entry-td" style = {getLightStyle(bench.attemptTwo.status)}>
                <input 
                type= "text" 
                className = "lift-entry table-input"
                value = {bench.attemptTwo.weight}
                readOnly= {true}
                />
            </td>
            <td className = "lift-entry-td" style = {getLightStyle(bench.attemptThree.status)}>
                <input 
                type= "text" 
                className = "lift-entry table-input"
                value = {bench.attemptThree.weight}
                readOnly= {true}
                />
            </td>
            <td className = "lift-entry-td" style = {getLightStyle(deadlift.attemptOne.status)}>
                <input 
                type= "text" 
                className = "lift-entry table-input"
                value = {deadlift.attemptOne.weight}
                readOnly= {true}
                />
            </td>
            <td className = "lift-entry-td" style = {getLightStyle(deadlift.attemptTwo.status)}>
                <input 
                type= "text" 
                className = "lift-entry table-input"
                value = {deadlift.attemptTwo.weight}
                readOnly= {true}
                />
            </td>
            <td  className = "lift-entry-td" style = {getLightStyle(deadlift.attemptThree.status)}>
                <input 
                type= "text" 
                className = "lift-entry table-input"
                value = {deadlift.attemptThree.weight}
                readOnly= {true}
                />
            </td>
            <td>
                {lifter.score}
            </td>
        </tr>

    )

}

export default memo(LifterSpectateRow, (oldProps, newProps) => deepEqual(oldProps, newProps, {strict: true}))