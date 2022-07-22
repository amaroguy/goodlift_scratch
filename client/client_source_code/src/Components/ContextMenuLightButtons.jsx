import React, {useContext} from 'react'
import { LifterContext } from './LifterContext'
import { GOOD_LIFT, NO_LIFT, LIFT_NOT_ATTEMPTED } from '../util'

/* <li className="context-menu-item" onClick={() => setAttemptStatus(lifter.id, SQUAT, ATTEMPT_ONE, GOOD_LIFT)}> Good Lift </li>
<li className="context-menu-item" onClick={() => setAttemptStatus(lifter.id, SQUAT, ATTEMPT_ONE, BAD_LIFT)}> No Lift </li>
<li className="context-menu-item" onClick={() => setAttemptStatus(lifter.id, SQUAT, ATTEMPT_ONE, LIFT_NOT_ATTEMPTED)}> Not Done </li> */

//Props: liferId, lift to change, attempt to change, new lift status
export default function ContextMenuLightButtons({lifterID, lift ,attemptNum}) {
    const {setAttemptStatus} = useContext(LifterContext)

    return (
    <>
        <li className="context-menu-item" onClick={() => setAttemptStatus(lifterID, lift, attemptNum, GOOD_LIFT)}> Good Lift </li>
        <li className="context-menu-item" onClick={() => setAttemptStatus(lifterID, lift, attemptNum, NO_LIFT)}> No Lift </li>
        <li className="context-menu-item" onClick={() => setAttemptStatus(lifterID, lift, attemptNum, LIFT_NOT_ATTEMPTED)}> Not Done </li>
    </>
    )
}