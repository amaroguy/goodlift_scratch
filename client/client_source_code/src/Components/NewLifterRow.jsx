import {React, useRef, memo} from "react";
import { useDispatch } from "react-redux";
import {setLifterName, setSex, setWeightClass, setAttempt, setScore, setDisplayedLift, deleteLifter} from "../features/competitionData/competitionDataSlice";
import {SQUAT, BENCH, DEADLIFT, ATTEMPT_ONE, ATTEMPT_TWO, ATTEMPT_THREE, GOOD_LIFT, NO_LIFT, LIFT_NOT_ATTEMPTED} from '../util'
import LifterTableContextMenu from "./LifterTableContextMenu";
import ContextMenuLightButtons from "./ContextMenuLightButtons";
import useContextMenu from "../hooks/useContextMenu";
import deepEqual from "deep-equal";

const FOCUS_LIFT = "Focus Lift"

function NewLifterRow({lifter}) {
    console.log('rendering lifter row of', lifter.name)

    const dispatch = useDispatch()
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

    function generateLiftContextMenu(lifterID, lift, attemptNum){  
        return <ContextMenuLightButtons lifterID = {lifterID} lift = {lift} attemptNum = {attemptNum} /> 
    }

    dispatch(setScore({lifterID: lifter.id}))

    let contextMenuOptions = useContextMenu()

    return (
        <>
            <tr>
                <td
                onContextMenu = {(e) => contextMenuOptions.openContextMenu(e, <li className = "context-menu-item" onClick = {() => dispatch(deleteLifter({lifterID: lifter.id}))}> 🗑️ Delete Lifter </li>)}
                >
                    <input type = "text" 
                    className = "table-input" 
                    value = {lifter.name} 
                    onChange = {(e) => dispatch(setLifterName({lifterID: lifter.id, newName: e.target.value}))}
                    />
                </td>
                <td>
                    <select 
                    name = "sex" 
                    id = "sex" 
                    value = {lifter.sex} 
                    onChange = {(e) => dispatch(setSex({lifterID: lifter.id, newSex: e.target.value}))}>
                        <option value = "M">M</option>
                        <option value = "F">F</option>
                    </select>
                </td>
                <td className = "weight-td">
                    <input 
                    type="text"
                    className = "weight-input"
                    value={lifter.weightClass}
                    onChange = {(e) => dispatch(setWeightClass({lifterID: lifter.id, newWeightClass: e.target.value}))}
                    />
                </td>
                <td  className = "lift-entry-td" 
                    style = {getLightStyle(squat.attemptOne.status)}
                    onContextMenu = {(e) => contextMenuOptions.openContextMenu(e, generateLiftContextMenu(lifter.id, SQUAT, ATTEMPT_ONE))}
                >
                    <input 
                    type= "text" 
                    className = "lift-entry table-input"
                    value = {squat.attemptOne.weight}
                    onChange = {(e) => dispatch(setAttempt({
                        lifterID: lifter.id,
                        lift: SQUAT,
                        attemptNum: ATTEMPT_ONE,
                        newWeight: e.target.value
                    }))}
                    />

                </td>
                <td 
                className = "lift-entry-td" 
                style = {getLightStyle(squat.attemptTwo.status)}
                onContextMenu = {(e) => contextMenuOptions.openContextMenu(e, generateLiftContextMenu(lifter.id, SQUAT, ATTEMPT_TWO))}
                >

                    <input 
                    type= "text" 
                    className = "lift-entry table-input"
                    value = {squat.attemptTwo.weight}
                    onChange = {(e) => dispatch(setAttempt({
                        lifterID: lifter.id,
                        lift: SQUAT,
                        attemptNum: ATTEMPT_TWO,
                        newWeight: e.target.value
                    }))}
                    />

                </td>
                <td 
                className = "lift-entry-td" 
                style = {getLightStyle(squat.attemptThree.status)}
                onContextMenu = {(e) => contextMenuOptions.openContextMenu(e, generateLiftContextMenu(lifter.id, SQUAT, ATTEMPT_THREE))}
                >
                    <input 
                    type= "text" 
                    className = "lift-entry table-input"
                    value = {squat.attemptThree.weight}
                    onChange = {(e) => dispatch(setAttempt({
                        lifterID: lifter.id,
                        lift: SQUAT,
                        attemptNum: ATTEMPT_THREE,
                        newWeight: e.target.value
                    }))}
                    />

                </td>
                <td 
                className = "lift-entry-td" 
                style = {getLightStyle(bench.attemptOne.status)}
                onContextMenu = {(e) => contextMenuOptions.openContextMenu(e, generateLiftContextMenu(lifter.id, BENCH, ATTEMPT_ONE))}
                >
                    <input 
                    type= "text" 
                    className = "lift-entry table-input"
                    value = {bench.attemptOne.weight}
                    onChange = {(e) => dispatch(setAttempt({
                        lifterID: lifter.id,
                        lift: BENCH,
                        attemptNum: ATTEMPT_ONE,
                        newWeight: e.target.value
                    }))}
                    />

                </td>
                <td 
                    className = "lift-entry-td"
                    style = {getLightStyle(bench.attemptTwo.status)}
                    onContextMenu = {(e) => contextMenuOptions.openContextMenu(e, generateLiftContextMenu(lifter.id, BENCH, ATTEMPT_TWO))}
                    >
                    <input 
                    type= "text" 
                    className = "lift-entry table-input"
                    value = {bench.attemptTwo.weight}
                    onChange = {(e) => dispatch(setAttempt({
                        lifterID: lifter.id,
                        lift: BENCH,
                        attemptNum: ATTEMPT_TWO,
                        newWeight: e.target.value
                    }))}
                    />

                </td>
                <td 
                className = "lift-entry-td" 
                style = {getLightStyle(bench.attemptThree.status)}
                onContextMenu = {(e) => contextMenuOptions.openContextMenu(e, generateLiftContextMenu(lifter.id, BENCH, ATTEMPT_THREE))}
                >
                    <input 
                    type= "text" 
                    className = "lift-entry table-input"
                    value = {bench.attemptThree.weight}
                    onChange = {(e) => dispatch(setAttempt({
                        lifterID: lifter.id,
                        lift: BENCH,
                        attemptNum: ATTEMPT_THREE,
                        newWeight: e.target.value
                    }))}
                    />
                </td>
                <td 
                className = "lift-entry-td" 
                style = {getLightStyle(deadlift.attemptOne.status)}
                onContextMenu = {(e) => contextMenuOptions.openContextMenu(e, generateLiftContextMenu(lifter.id, DEADLIFT, ATTEMPT_ONE))}
                >
                    <input 
                    type= "text" 
                    className = "lift-entry table-input"
                    value = {deadlift.attemptOne.weight}
                    onChange = {(e) => dispatch(setAttempt({
                        lifterID: lifter.id,
                        lift: DEADLIFT,
                        attemptNum: ATTEMPT_ONE,
                        newWeight: e.target.value
                    }))}
                    />
                </td>
                <td 
                className = "lift-entry-td" 
                style = {getLightStyle(deadlift.attemptTwo.status)}
                onContextMenu = {(e) => contextMenuOptions.openContextMenu(e, generateLiftContextMenu(lifter.id, DEADLIFT, ATTEMPT_TWO))}
                >
                    <input 
                    type= "text" 
                    className = "lift-entry table-input"
                    value = {deadlift.attemptTwo.weight}
                    onChange = {(e) => dispatch(setAttempt({
                        lifterID: lifter.id,
                        lift: DEADLIFT,
                        attemptNum: ATTEMPT_TWO,
                        newWeight: e.target.value
                    }))}
                    />

                </td>
                <td 
                className = "lift-entry-td" 
                style = {getLightStyle(deadlift.attemptThree.status)}
                onContextMenu = {(e) => contextMenuOptions.openContextMenu(e, generateLiftContextMenu(lifter.id, DEADLIFT, ATTEMPT_THREE))}
                >
                    <input 
                    type= "text" 
                    className = "lift-entry table-input"
                    value = {deadlift.attemptThree.weight}
                    onChange = {(e) => dispatch(setAttempt({
                        lifterID: lifter.id,
                        lift: DEADLIFT,
                        attemptNum: ATTEMPT_THREE,
                        newWeight: e.target.value
                    }))}
                    />
                </td>
                <td>
                    {lifter.score}
                </td>
            </tr>
            {   
                contextMenuOptions.isMenuShown && 
                <LifterTableContextMenu
                    posX={contextMenuOptions.x}
                    posY={contextMenuOptions.y}
                    children = {contextMenuOptions.children}
                />
            }
        </>

    )

}

export default memo(NewLifterRow)