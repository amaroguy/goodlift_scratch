import React, {useState} from 'react'
import {TESTING_TABLE_DATA as COMP_DUMMY_DATA, BLANK_LIFTER} from './test_data/LifterTestData'
import {v4 as uuid} from 'uuid'
import {produce} from 'immer'

const LifterContext = React.createContext()


function LifterContextProvider(props){

    const [compData, setCompData] = useState(COMP_DUMMY_DATA)

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
        value = {{setAttemptStatus, compData, setCompData, setAttempt, setName, setWeight, addBlankLifter}}>
            {props.children}
        </LifterContext.Provider>
    )

}

export {LifterContext, LifterContextProvider}