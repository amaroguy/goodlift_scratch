import React, {useContext, useRef, useEffect} from 'react'
import {LifterContext} from './LifterContext'
import { useContextMenu, testArr } from '../hooks/useContextMenu'
import LifterTableContextMenu from './LifterTableContextMenu'
import ContextMenuLightButtons from './ContextMenuLightButtons'
import { GOOD_LIFT, NO_LIFT, LIFT_NOT_ATTEMPTED, ATTEMPT_ONE, ATTEMPT_TWO, ATTEMPT_THREE, SQUAT, BENCH, DEADLIFT, CALCULATE_DOTS } from '../util'

//TODO Make more dynamic

function LifterDataRow({lifter, setFocusedLifterID}) {
//Set style based on lift status 

    const { setAttempt, setName, setWeight, setAttemptStatus, setDisplayedLift, setSex, setScore, deleteLifter} = React.useContext(LifterContext)

    //sus variables names, change this.
    const {squat, bench, deadlift} = lifter.lifts

    

    //REFS FOR RIGHT CLICK MENUS 
    //CONTEXT TABLE REFS FOR SQUAT ATTEMPT TABLE ITEMS
    const squatAttemptOneRef = useRef(null)
    const squatAttemptTwoRef = useRef(null)
    const squatAttemptThreeRef = useRef(null)
    const squatOneState = useContextMenu(squatAttemptOneRef)
    const squatTwoState =  useContextMenu(squatAttemptTwoRef)
    const squatThreeState = useContextMenu(squatAttemptThreeRef)

    //CONTEXT TABLE REFS FOR BENCH ATTEMPT TABLE ITEMS
    const benchAttemptOneRef = useRef(null)
    const benchAttemptTwoRef = useRef(null)
    const benchAttemptThreeRef = useRef(null)
    const benchOneState = useContextMenu(benchAttemptOneRef)
    const benchTwoState = useContextMenu(benchAttemptTwoRef)
    const benchThreeState = useContextMenu(benchAttemptThreeRef)

    //CONTEXT TABLE REFS FOR DEADLIFT ATTEMPT TABLE ITEMS
    const deadliftAttemptOneRef = useRef(null)
    const deadliftAttemptTwoRef = useRef(null)
    const deadliftAttemptThreeRef = useRef(null)
    const deadliftOneState = useContextMenu(deadliftAttemptOneRef)
    const deadliftTwoState = useContextMenu(deadliftAttemptTwoRef)
    const deadliftThreeState = useContextMenu(deadliftAttemptThreeRef)

    //ETC
    const deleteLifterRef = useRef(null)
    const deleteLifterState = useContextMenu(deleteLifterRef)

    //handle removing eventlisteners
    function deleteRow(lifterID){
        //have to handle unmounting the event listeners out here bc idk how else to do it lol
        squatAttemptOneRef.current.removeEventListener('contextmenu', squatOneState.openContextMenu)
        squatAttemptTwoRef.current.removeEventListener('contextmenu', squatTwoState.openContextMenu)
        squatAttemptThreeRef.current.removeEventListener('contextmenu', squatThreeState.openContextMenu)
        benchAttemptOneRef.current.removeEventListener('contextmenu', benchOneState.openContextMenu)
        benchAttemptTwoRef.current.removeEventListener('contextmenu', benchTwoState.openContextMenu)
        benchAttemptThreeRef.current.removeEventListener('contextmenu', benchThreeState.openContextMenu)
        deadliftAttemptOneRef.current.removeEventListener('contextmenu', deadliftOneState.openContextMenu)
        deadliftAttemptTwoRef.current.removeEventListener('contextmenu', deadliftTwoState.openContextMenu)
        deadliftAttemptThreeRef.current.removeEventListener('contextmenu', deadliftThreeState.openContextMenu)
        deleteLifterRef.current.removeEventListener('contextmenu', deleteLifterState.openContextMenu)
        deadliftAttemptThreeRef.current.removeEventListener('contextmenu', () => console.log('this function dne'))

        deleteLifter(lifterID)
    }


    // useEffect(() => {
    //     window.addEventListener('contextmenu', (e) => {
    //         console.log(testArr)
    //     })
    // })

    // function setAttempt(lifterID, lift, attemptNum, newWeight){

    //determines grid cell color
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

    //right click on td, state has to be generated here?
    //setAttemptStatus(lifterID, lift, attemptNum, newStatus)
    //Context menu state will be controlled by the box contianing data (detecting clicks to change X Y and display state)
    //Pass the state into the LifterTableContextMenu
    return (
        <tr>

            <td ref = {deleteLifterRef}>
                <input type = "text" className = "table-input" value = {lifter.name} onChange = {(event) => {setName(lifter.id, event.target.value)}}/>
                <LifterTableContextMenu posX = {deleteLifterState.x} posY = {deleteLifterState.y} isShown= {deleteLifterState.isMenuShown}>
                    <li className = "context-menu-item" onClick= {() => deleteRow(lifter.id)} > Delete From Table </li>
                </LifterTableContextMenu>
            </td>    
            <td>
                <select name="sex" id="sex" value = {lifter.sex} onChange = {(e) => setSex(lifter.id, e.target.value)}>
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>
            </td>    
            <td>
                <input type = "text" className = "table-input" value = {lifter.weightClass} onChange = {(event) => {setWeight(lifter.id, event.target.value)}}/>
            </td>    
            <td ref = {squatAttemptOneRef} className = "lift-entry-td" style={getLightStyle(squat.attemptOne.status)} >
                <input type = "text" className = "lift-entry table-input" value = {squat.attemptOne.weight} onChange={(event) => {setAttempt(lifter.id, SQUAT, ATTEMPT_ONE, event.target.value )}} />
                <LifterTableContextMenu posX = {squatOneState.x} posY={squatOneState.y} isShown={squatOneState.isMenuShown} >
                    <li className="context-menu-item" onClick={() => setDisplayedLift(lifter.id, SQUAT, ATTEMPT_ONE)}> Display Lift </li>
                    <li className="context-menu-item" onClick={() => setAttemptStatus(lifter.id, SQUAT, ATTEMPT_ONE, GOOD_LIFT)}> Good Lift </li>
                    <li className="context-menu-item" onClick={() => setAttemptStatus(lifter.id, SQUAT, ATTEMPT_ONE, NO_LIFT)}> No Lift </li>
                    <li className="context-menu-item" onClick={() => setAttemptStatus(lifter.id, SQUAT, ATTEMPT_ONE, LIFT_NOT_ATTEMPTED)}> Not Done </li>
                </LifterTableContextMenu>
            </td>    
            <td ref = {squatAttemptTwoRef} className = "lift-entry-td"  style={getLightStyle(squat.attemptTwo.status)}>
                <input type = "text" className = "lift-entry table-input" value = {squat.attemptTwo.weight} onChange={(event) => {setAttempt(lifter.id, SQUAT, ATTEMPT_TWO, event.target.value)}}/>
                <LifterTableContextMenu posX = {squatTwoState.x} posY={squatTwoState.y} isShown={squatTwoState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {SQUAT} attemptNum = {ATTEMPT_TWO}/>
                </LifterTableContextMenu>
            </td>    
            <td ref = {squatAttemptThreeRef} className = "lift-entry-td"  style={getLightStyle(squat.attemptThree.status)}>
                <input type = "text" className = "lift-entry table-input" value = {squat.attemptThree.weight} onChange={(event) => {setAttempt(lifter.id, SQUAT, ATTEMPT_THREE, event.target.value)}} />
                <LifterTableContextMenu posX = {squatThreeState.x} posY={squatThreeState.y} isShown={squatThreeState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {SQUAT} attemptNum = {ATTEMPT_THREE}/>
                </LifterTableContextMenu>
            </td>    
            <td  ref = {benchAttemptOneRef} className = "lift-entry-td"  style={getLightStyle(bench.attemptOne.status)}>
                <input type = "text" className = "lift-entry table-input" value = {bench.attemptOne.weight} onChange={(event) => {setAttempt(lifter.id, BENCH, ATTEMPT_ONE, event.target.value)}} />
                <LifterTableContextMenu posX = {benchOneState.x} posY={benchOneState.y} isShown={benchOneState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {BENCH} attemptNum = {ATTEMPT_ONE}/>
                </LifterTableContextMenu>
            </td>    
            <td ref = {benchAttemptTwoRef} className = "lift-entry-td"  style={getLightStyle(bench.attemptTwo.status)}>
                <input type = "text" className = "lift-entry table-input" value = {bench.attemptTwo.weight} onChange={(event) => {setAttempt(lifter.id, BENCH, ATTEMPT_TWO, event.target.value)}} />
                <LifterTableContextMenu posX = {benchTwoState.x} posY={benchTwoState.y} isShown={benchTwoState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {BENCH} attemptNum = {ATTEMPT_TWO}/>
                </LifterTableContextMenu>
            </td>    
            <td ref = {benchAttemptThreeRef} className = "lift-entry-td"  style={getLightStyle(bench.attemptThree.status)}>
                <input type = "text" className = "lift-entry table-input" value = {bench.attemptThree.weight} onChange={(event) => {setAttempt(lifter.id, BENCH, ATTEMPT_THREE, event.target.value)}} />
                <LifterTableContextMenu posX = {benchThreeState.x} posY={benchThreeState.y} isShown={benchThreeState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {BENCH} attemptNum = {ATTEMPT_THREE}/>
                </LifterTableContextMenu>
            </td>    
            <td ref = {deadliftAttemptOneRef} className = "lift-entry-td"  style={getLightStyle(deadlift.attemptOne.status)}>
                <input type = "text" className = "lift-entry table-input" value = {deadlift.attemptOne.weight} onChange={(event) => {setAttempt(lifter.id, DEADLIFT, ATTEMPT_ONE, event.target.value)}} />
                <LifterTableContextMenu posX = {deadliftOneState.x} posY={deadliftOneState.y} isShown={deadliftOneState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {DEADLIFT} attemptNum = {ATTEMPT_ONE}/>
                </LifterTableContextMenu>
            </td>    
            <td ref = {deadliftAttemptTwoRef} className = "lift-entry-td"  style={getLightStyle(deadlift.attemptTwo.status)}>
                <input type = "text" className = "lift-entry table-input" value = {deadlift.attemptTwo.weight} onChange={(event) => {setAttempt(lifter.id, DEADLIFT, ATTEMPT_TWO, event.target.value)}} />
                <LifterTableContextMenu posX = {deadliftTwoState.x} posY={deadliftTwoState.y} isShown={deadliftTwoState.isMenuShown}>
                <ContextMenuLightButtons lifterID = {lifter.id} lift = {DEADLIFT} attemptNum = {ATTEMPT_TWO}/>
                </LifterTableContextMenu>
            </td>    
            <td ref = {deadliftAttemptThreeRef} className = "lift-entry-td"  style={getLightStyle(deadlift.attemptThree.status)}>
                <input type = "text" className = "lift-entry table-input" value = {deadlift.attemptThree.weight} onChange={(event) => {setAttempt(lifter.id, DEADLIFT, ATTEMPT_THREE, event.target.value)}} />
                <LifterTableContextMenu posX = {deadliftThreeState.x} posY={deadliftThreeState.y} isShown={deadliftThreeState.isMenuShown}>
                <ContextMenuLightButtons lifterID = {lifter.id} lift = {DEADLIFT} attemptNum = {ATTEMPT_THREE}/>
                </LifterTableContextMenu>
            </td>  
            <td>
                {setScore(lifter)}
            </td>      
        </tr>


    )
}

export default LifterDataRow