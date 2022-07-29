import React, {useState} from 'react'
import {TESTING_TABLE_DATA as COMP_DUMMY_DATA, BLANK_LIFTER} from './test_data/LifterTestData'
import {v4 as uuid} from 'uuid'
import {produce} from 'immer'

const LifterContext = React.createContext()


function LifterContextProvider(props){

    const [compData, setCompData] = useState(COMP_DUMMY_DATA)


    function setDisplayedLift(lifterID, lift, attemptNum){
        const lifter = getLifterFromID(lifterID)


        console.log('setting the displayed lift to', lifter.lifts[lift][attemptNum])

        const newCompData = produce(compData, draft => {
            draft.displayedLift.lifterID = lifter.id

            //
            draft.displayedLift.attemptDetails.lift = lift
            draft.displayedLift.attemptDetails.attemptNum = attemptNum
            draft.displayedLift.attemptDetails.weight = lifter.lifts[lift][attemptNum]["weight"]
            draft.displayedLift.attemptDetails.status = lifter.lifts[lift][attemptNum]["status"]
        })

        setCompData(newCompData)
    }

    function getLifterFromID(lifterID){
        return compData.lifters.find(lifter => lifterID === lifter.id)
    } 

    function setFocusedLifterID(lifterID){

        console.log("setting id to", lifterID)

        setCompData(oldData => {
            return {...oldData, focusedLifterID: lifterID}
        })
    }

    function setName(lifterID, newName){
        console.log("Setting Name")

        let index = compData.lifters.findIndex((lifter) => {
            return lifter.id === lifterID
        })


        const newCompData = produce(compData, draft => {
            draft.lifters[index].name = newName
        })
        setCompData(newCompData)

}

    function setAttempt(lifterID, lift, attemptNum, newWeight){

        let index = compData.lifters.findIndex((lifter) => {
            return lifter.id === lifterID
        })

        let newCompData = produce(compData, draft => {
            draft.lifters[index]["lifts"][lift][attemptNum]["weight"] = newWeight
        })

        setCompData(newCompData)

    }

        //chungus function
    function setAttemptStatus(lifterID, lift, attemptNum, newStatus){

        let index = compData.lifters.findIndex((lifter) => {
            return lifter.id === lifterID
        })

        let newCompData = produce(compData, draft => {

            //attemptDetails and the attempt itself in the lifter's
            //data is not synced, so we have to do this messy stuff.
            if(lifterID === compData.displayedLift.lifterID &&
                lift === compData.displayedLift.attemptDetails.lift &&
                attemptNum === compData.displayedLift.attemptDetails.attemptNum){
                    draft.displayedLift.attemptDetails.status = newStatus 
                }

            draft.lifters[index]["lifts"][lift][attemptNum]["status"] = newStatus
        })

        setCompData(newCompData)
    }

    function setWeight(lifterID, newWeightClass){

        let index = compData.lifters.findIndex((lifter) => {
            return lifter.id === lifterID
        })

        let newCompData = produce(compData, draft => {
            draft.lifters[index]["weightClass"]= newWeightClass
        })

        setCompData(newCompData)

    }

    function addBlankLifter(){
        setCompData(oldData => {
            return {
                ...oldData,
                lifters: [...oldData.lifters, {...BLANK_LIFTER, id: uuid()}]
            }
        })
    }

    return (
        <LifterContext.Provider 
        value = {{setAttemptStatus, compData, setCompData, setAttempt, setName, setWeight, addBlankLifter, setFocusedLifterID, getLifterFromID, setDisplayedLift}}>
            {props.children}
        </LifterContext.Provider>
    )

}

export {LifterContext, LifterContextProvider}