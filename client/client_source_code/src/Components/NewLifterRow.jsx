import {React, useRef, memo} from "react";
import { useDispatch } from "react-redux";
import {setLifterName, setSex, setWeightClass, setAttempt, setScore} from "../features/competitionData/competitionDataSlice";
import {SQUAT, BENCH, DEADLIFT, ATTEMPT_ONE, ATTEMPT_TWO, ATTEMPT_THREE, GOOD_LIFT, NO_LIFT, LIFT_NOT_ATTEMPTED} from '../util'
import LifterTableContextMenu from "./LifterTableContextMenu";
import ContextMenuLightButtons from "./ContextMenuLightButtons";
import { useContextMenu } from '../hooks/useContextMenu'

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

    //REFS FOR RIGHT CLICK MENUS 
    //CONTEXT TABLE REFS FOR SQUAT ATTEMPT TABLE ITEMS
    const squatAttemptOneRef = useRef(null)
    const squatAttemptTwoRef = useRef(null)
    const squatAttemptThreeRef = useRef(null)

    //STATE FOR SQUAT CONTEXT MENUS
    const squatOneState = useContextMenu(squatAttemptOneRef)
    const squatTwoState = useContextMenu(squatAttemptTwoRef)
    const squatThreeState = useContextMenu(squatAttemptThreeRef)

    //CONTEXT TABLE REFS FOR BENCH ATTEMPT TABLE ITEMS
    const benchAttemptOneRef = useRef(null)
    const benchAttemptTwoRef = useRef(null)
    const benchAttemptThreeRef = useRef(null)

    //STATE FOR BENCH CONTEXT MENUS
    const benchOneState = useContextMenu(benchAttemptOneRef)
    const benchTwoState = useContextMenu(benchAttemptTwoRef)
    const benchThreeState = useContextMenu(benchAttemptThreeRef)

    //CONTEXT TABLE REF FOR DEADLIFT ATTEMPT TABLE ITEMS
    const deadliftAttemptOneRef = useRef(null)
    const deadliftAttemptTwoRef = useRef(null)
    const deadliftAttemptThreeRef = useRef(null)

    //STATE FOR DEADLIFT CONTEXT MENUS
    const deadliftOneState = useContextMenu(deadliftAttemptOneRef)
    const deadliftTwoState = useContextMenu(deadliftAttemptTwoRef)
    const deadliftThreeState = useContextMenu(deadliftAttemptThreeRef)

    dispatch(setScore({lifterID: lifter.id}))

    return (
        <tr>
            <td>
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
            <td>
                <input 
                type="text"
                value={lifter.weightClass}
                onChange = {(e) => dispatch(setWeightClass({lifterID: lifter.id, newWeightClass: e.target.value}))}
                />
            </td>
            <td ref = {squatAttemptOneRef} className = "lift-entry-td" 
                style = {getLightStyle(squat.attemptOne.status)}
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

                <LifterTableContextMenu posX = {squatOneState.x} posY = {squatOneState.y} isShown = {squatOneState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {SQUAT} attemptNum = {ATTEMPT_ONE}/>
                </LifterTableContextMenu>

            </td>
            <td ref = {squatAttemptTwoRef} className = "lift-entry-td" style = {getLightStyle(squat.attemptTwo.status)}>

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

                <LifterTableContextMenu poxX = {squatTwoState.x} posY = {squatTwoState.y} isShown = {squatTwoState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {SQUAT} attemptNum = {ATTEMPT_TWO}/>
                </LifterTableContextMenu>

            </td>
            <td ref = {squatAttemptThreeRef} className = "lift-entry-td" style = {getLightStyle(squat.attemptThree.status)}>
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

                <LifterTableContextMenu posX = {squatThreeState.x} posY = {squatThreeState.y} isShown = {squatThreeState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {SQUAT} attemptNum = {ATTEMPT_THREE} /> 
                </LifterTableContextMenu>

            </td>
            <td ref = {benchAttemptOneRef} className = "lift-entry-td" style = {getLightStyle(bench.attemptOne.status)}>
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

                <LifterTableContextMenu posX = {benchOneState.x} posY = {benchOneState.y} isShown = {benchOneState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {BENCH} attemptNum = {ATTEMPT_ONE}/>
                </LifterTableContextMenu>

            </td>
            <td ref = {benchAttemptTwoRef} className = "lift-entry-td" style = {getLightStyle(bench.attemptTwo.status)}>
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

                <LifterTableContextMenu posX = {benchTwoState.x} posY = {benchTwoState.y} isShown = {benchTwoState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {BENCH} attemptNum = {ATTEMPT_TWO}/>
                </LifterTableContextMenu>

            </td>
            <td ref = {benchAttemptThreeRef} className = "lift-entry-td" style = {getLightStyle(bench.attemptThree.status)}>
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
                
                <LifterTableContextMenu posX = {benchThreeState.x} posY = {benchThreeState.y} isShown = {benchThreeState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {BENCH} attemptNum = {ATTEMPT_THREE}/>
                </LifterTableContextMenu>



            </td>
            <td ref = {deadliftAttemptOneRef} className = "lift-entry-td" style = {getLightStyle(deadlift.attemptOne.status)}>
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

                <LifterTableContextMenu posX = {deadliftOneState.x} posY = {deadliftOneState.y} isShown = {deadliftOneState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {DEADLIFT} attemptNum = {ATTEMPT_ONE} /> 
                </LifterTableContextMenu>

            </td>
            <td ref = {deadliftAttemptTwoRef} className = "lift-entry-td" style = {getLightStyle(deadlift.attemptTwo.status)}>
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

                <LifterTableContextMenu posX = {deadliftTwoState.x} posY = {deadliftTwoState.y} isShown = {deadliftTwoState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {DEADLIFT} attemptNum = {ATTEMPT_TWO} />
                </LifterTableContextMenu>

            </td>
            <td ref = {deadliftAttemptThreeRef} className = "lift-entry-td" style = {getLightStyle(deadlift.attemptThree.status)}>
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

                <LifterTableContextMenu posX = {deadliftThreeState.x} posY = {deadliftThreeState.y} isShown = {deadliftThreeState.isMenuShown}>
                    <ContextMenuLightButtons lifterID = {lifter.id} lift = {DEADLIFT} attemptNum = {ATTEMPT_THREE} /> 
                </LifterTableContextMenu>

            </td>
            <td>
                {lifter.score}
            </td>
        </tr>

    )

}

export default memo(NewLifterRow)