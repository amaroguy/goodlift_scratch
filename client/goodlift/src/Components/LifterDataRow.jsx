import React, {useContext, useRef, useEffect} from 'react'
import {LifterContext} from './LifterContext'
import { useContextMenu, testArr } from '../hooks/useContextMenu'
import LifterTableContextMenu from './LifterTableContextMenu'

//TODO Make more dynamic
//Like a form?

const ATTEMPT_ONE = "attemptOne"
const ATTEMPT_TWO = "attemptTwo"
const ATTEMPT_THREE = "attemptThree"
const SQUAT = "squat"
const BENCH = "bench"
const DEADLIFT = "deadlift"

const GOOD_LIFT = "GOOD LIFT"
const BAD_LIFT = "BAD LIFT"
const LIFT_NOT_ATTEMPTED = "NOT ATTEMPTED"

function LifterDataRow({lifter}) {
//Set style based on lift status 

    const {setCompData, setAttempt, setName, setWeight, setAttemptStatus} = React.useContext(LifterContext)
    const {squat, bench, deadlift} = lifter.lifts

    //TODO REMOVE THIS
    const testRef = useRef(null)
    const testRefState = useContextMenu(testRef) // {x, y, isMenuShown}

    const testRefTwo = useRef(null)
    const testRefStateTwo = useContextMenu(testRefTwo)//

    //REFS FOR RIGHT CLICK MENUS 

    //REFS FOR SQUAT ATTEMPT TABLE ITEMS
    const squatAttemptOneRef = useRef(null)
    const squatAttemptTwoRef = useRef(null)
    const squatAttemptThreeRef = useRef(null)
    const squatOneState = useContextMenu(squatAttemptOneRef)
    const squatTwoState =  useContextMenu(squatAttemptTwoRef)
    const squatThreeState = useContextMenu(squatAttemptThreeRef)

    //REFS FOR BENCH ATTEMPT TABLE ITEMS
    const benchAttemptOneRef = useRef(null)
    const benchAttemptTwoRef = useRef(null)
    const benchAttemptThreeRef = useRef(null)
    const benchOneState = useContextMenu(benchAttemptOneRef)
    const benchTwoState = useContextMenu(benchAttemptTwoRef)
    const benchThreeState = useContextMenu(benchAttemptThreeRef)

    //REFS FOR DEADLIFT ATTEMPT TABLE ITEMS
    const deadliftAttemptOneRef = useRef(null)
    const deadliftAttemptTwoRef = useRef(null)
    const deadliftAttemptThreeRef = useRef(null)
    const deadliftOneState = useContextMenu(deadliftAttemptOneRef)
    const deadliftTwoState = useContextMenu(deadliftAttemptTwoRef)
    const deadliftThreeState = useContextMenu(deadliftAttemptThreeRef)


    useEffect(() => {
        window.addEventListener('contextmenu', (e) => {
            console.log(testArr)
        })
    })

    // function setAttempt(lifterID, lift, attemptNum, newWeight){

    function getLightStyle(result){
        switch(result){
            case GOOD_LIFT:
                return {backgroundColor: "green"}
            case BAD_LIFT: 
                return {backgroundColor: "red"}
            case LIFT_NOT_ATTEMPTED:
                return {backgroundColor: "blue"}
            default:
                console.log('Invalid Lift Result Passed in, please contact the site owner')
        }
    }

    //right click on td, state has to be generated here?
    //setAttemptStatus(lifterID, lift, attemptNum, newStatus)
    //Context menu state will be controlled by the box contianing data (detecting clicks to change X Y and display state)
    //Pass the state into the LifterTableContextMenu
    return (
        <tr>
            <td ref = {testRef}>
                <input type = "text" value = {lifter.name} onChange = {(event) => {setName(lifter.id, event.target.value)}}/>
                <LifterTableContextMenu posX = {testRefState.x} posY = {testRefState.y} isShown = {testRefState.isMenuShown}>
                    <h3 onClick = {() => console.log('foo')} > Testing The Table: Name </h3>
                </LifterTableContextMenu>
            </td>    
            <td ref = {testRefTwo}>
                <input type = "text" value = {lifter.weightClass} onChange = {(event) => {setWeight(lifter.id, event.target.value)}}/>
                <LifterTableContextMenu posX = {testRefStateTwo.x} posY = {testRefStateTwo.y} isShown = {testRefStateTwo.isMenuShown}>
                    <h3 onClick = {() => console.log('foo')} > Testing The Table: Weight </h3>
                </LifterTableContextMenu>
            </td>    
            <td ref = {squatAttemptOneRef} style={getLightStyle(squat.attemptOne.status)} >
                <input type = "text" className = "lift-entry" value = {squat.attemptOne.weight} onChange={(event) => {setAttempt(lifter.id, SQUAT, ATTEMPT_ONE, event.target.value )}} />
                <LifterTableContextMenu posX = {squatOneState.x} posY={squatOneState.y} isShown={squatOneState.isMenuShown} >
                    <li className="context-menu-item" onClick={() => setAttemptStatus(lifter.id, SQUAT, ATTEMPT_ONE, GOOD_LIFT)}> Good Lift </li>
                    <li className="context-menu-item" onClick={() => setAttemptStatus(lifter.id, SQUAT, ATTEMPT_ONE, BAD_LIFT)}> No Lift </li>
                    <li className="context-menu-item" onClick={() => setAttemptStatus(lifter.id, SQUAT, ATTEMPT_ONE, LIFT_NOT_ATTEMPTED)}> Not Done </li>
                </LifterTableContextMenu>
            </td>    
            <td ref = {squatAttemptTwoRef} style={getLightStyle(squat.attemptTwo.status)}>
                <input type = "text" className = "lift-entry" value = {squat.attemptTwo.weight} onChange={(event) => {setAttempt(lifter.id, SQUAT, ATTEMPT_TWO, event.target.value)}}/>
                <LifterTableContextMenu posX = {squatTwoState.x} posY={squatTwoState.y} isShown={squatTwoState.isMenuShown}>
                    
                </LifterTableContextMenu>
            </td>    
            <td ref = {squatAttemptThreeRef} style={getLightStyle(squat.attemptThree.status)}>
                <input type = "text" className = "lift-entry" value = {squat.attemptThree.weight} onChange={(event) => {setAttempt(lifter.id, SQUAT, ATTEMPT_THREE, event.target.value)}} />
                <LifterTableContextMenu posX = {squatThreeState.x} posY={squatThreeState.y} isShown={squatThreeState.isMenuShown}>
                    
                </LifterTableContextMenu>
            </td>    
            <td  ref = {benchAttemptOneRef} style={getLightStyle(bench.attemptOne.status)}>
                <input type = "text" className = "lift-entry" value = {bench.attemptOne.weight} onChange={(event) => {setAttempt(lifter.id, BENCH, ATTEMPT_ONE, event.target.value)}} />
                <LifterTableContextMenu posX = {benchOneState.x} posY={benchOneState.y} isShown={benchOneState.isMenuShown}>
                    
                </LifterTableContextMenu>
            </td>    
            <td ref = {benchAttemptTwoRef} style={getLightStyle(bench.attemptTwo.status)}>
                <input type = "text" className = "lift-entry" value = {bench.attemptTwo.weight} onChange={(event) => {setAttempt(lifter.id, BENCH, ATTEMPT_TWO, event.target.value)}} />
                <LifterTableContextMenu posX = {benchTwoState.x} posY={benchTwoState.y} isShown={benchTwoState.isMenuShown}>
                    
                </LifterTableContextMenu>
            </td>    
            <td ref = {benchAttemptThreeRef} style={getLightStyle(bench.attemptThree.status)}>
                <input type = "text" className = "lift-entry" value = {bench.attemptThree.weight} onChange={(event) => {setAttempt(lifter.id, BENCH, ATTEMPT_THREE, event.target.value)}} />
                <LifterTableContextMenu posX = {benchThreeState.x} posY={benchThreeState.y} isShown={benchThreeState.isMenuShown}>
                    
                </LifterTableContextMenu>
            </td>    
            <td ref = {deadliftAttemptOneRef} style={getLightStyle(deadlift.attemptOne.status)}>
                <input type = "text" className = "lift-entry" value = {deadlift.attemptOne.weight} onChange={(event) => {setAttempt(lifter.id, DEADLIFT, ATTEMPT_ONE, event.target.value)}} />
                <LifterTableContextMenu posX = {deadliftOneState.x} posY={deadliftOneState.y} isShown={deadliftOneState.isMenuShown}>
                    
                </LifterTableContextMenu>
            </td>    
            <td ref = {deadliftAttemptTwoRef} style={getLightStyle(deadlift.attemptTwo.status)}>
                <input type = "text" className = "lift-entry" value = {deadlift.attemptTwo.weight} onChange={(event) => {setAttempt(lifter.id, DEADLIFT, ATTEMPT_TWO, event.target.value)}} />
                <LifterTableContextMenu posX = {deadliftTwoState.x} posY={deadliftTwoState.y} isShown={deadliftTwoState.isMenuShown}>
                    
                </LifterTableContextMenu>
            </td>    
            <td ref = {deadliftAttemptThreeRef} style={getLightStyle(deadlift.attemptThree.status)}>
                <input type = "text" className = "lift-entry" value = {deadlift.attemptThree.weight} onChange={(event) => {setAttempt(lifter.id, DEADLIFT, ATTEMPT_THREE, event.target.value)}} />
                <LifterTableContextMenu posX = {deadliftThreeState.x} posY={deadliftThreeState.y} isShown={deadliftThreeState.isMenuShown}>
                    
                </LifterTableContextMenu>
            </td>    
        </tr>


    )
}

export default LifterDataRow