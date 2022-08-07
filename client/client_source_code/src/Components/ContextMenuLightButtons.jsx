import React from 'react'
import { GOOD_LIFT, NO_LIFT, LIFT_NOT_ATTEMPTED } from '../util'
import { useDispatch } from 'react-redux'
import { setAttemptStatus, setDisplayedLift } from '../features/competitionData/competitionDataSlice'


/* <li className="context-menu-item" onClick={() => setAttemptStatus(lifter.id, SQUAT, ATTEMPT_ONE, GOOD_LIFT)}> Good Lift </li>
<li className="context-menu-item" onClick={() => setAttemptStatus(lifter.id, SQUAT, ATTEMPT_ONE, BAD_LIFT)}> No Lift </li>
<li className="context-menu-item" onClick={() => setAttemptStatus(lifter.id, SQUAT, ATTEMPT_ONE, LIFT_NOT_ATTEMPTED)}> Not Done </li> */

//Props: liferId, lift to change, attempt to change, new lift status
export default function ContextMenuLightButtons({lifterID, lift ,attemptNum}) {

    const dispatch = useDispatch()

    return (
    <>
        <li
        className = "context-menu-item"
        onClick = {() => dispatch(setDisplayedLift({
            lifterID,
            lift,
            attemptNum
        }))} 
        >📺 Focus Lift</li>
        <li 
        className="context-menu-item" 
        onClick={() => dispatch(setAttemptStatus({
            lifterID,
            lift,
            attemptNum,
            newStatus: GOOD_LIFT
        }))}
        > ⚪ Good Lift </li>
        <li 
        className="context-menu-item" 
        onClick= {() => dispatch(setAttemptStatus({
            lifterID,
            lift,
            attemptNum,
            newStatus: NO_LIFT
        }))}
        > 🔴 No Lift </li>
        <li 
        className="context-menu-item" 
        onClick = {() => dispatch(setAttemptStatus({
            lifterID,
            lift,
            attemptNum,
            newStatus: LIFT_NOT_ATTEMPTED
        }))}
        > 🔃 Reset Status </li>
    </>
    )
}