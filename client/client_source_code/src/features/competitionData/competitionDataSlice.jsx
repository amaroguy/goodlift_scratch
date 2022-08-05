import { createSlice } from "@reduxjs/toolkit"
import {TESTING_TABLE_DATA as initialState, BLANK_LIFTER} from "../../Components/test_data/LifterTestData"
import { CALCULATE_DOTS } from "../../util"
import { v4 as uuid } from "uuid"

const competitionDataSlice = createSlice({
    name: 'competitionData',
    initialState,
    reducers: {
        setDisplayedLift: (state, action) => {
            console.log('foo')
        },
        setLifterName: (state , {payload}) => {
            const {lifterID, newName} = payload

            let lifter = state.lifters.find(lifter => lifterID === lifter.id)
            lifter.name = newName

        },
        setAttempt: (state, {payload}) => {
            const {lifterID, lift, attemptNum, newWeight} = payload

            let lifter = state.lifters.find(lifter => lifterID === lifter.id)
            lifter.lifts[lift][attemptNum].weight = newWeight

        },
        setAttemptStatus: (state, {payload}) => {
            const {lifterID, lift, attemptNum, newStatus} = payload

            let lifter = state.lifters.find(lifter => lifterID === lifter.id)
            lifter.lifts[lift][attemptNum].status = newStatus

        },
        setWeightClass: (state, {payload}) => {
            const {lifterID, newWeightClass} = payload
            let lifter = state.lifters.find(lifter => lifter.id === lifterID)
            lifter.weightClass = newWeightClass
        },
        setSex: (state, {payload}) => {
            const {lifterID, newSex} = payload
            let lifter = state.lifters.find(lifter => lifter.id === lifterID)
            lifter.sex = newSex
        },
        setScore: (state, {payload}) => {
            const {lifterID} = payload
            let lifter = state.lifters.find(lifter => lifter.id === lifterID)
            let score = CALCULATE_DOTS(lifter)
            lifter.score = score
        },
        deleteLifter: (state, {payload}) => {
            //lifterID
            console.log('foo')
        },
        addDefaultLifter: (state) => {
            let newLifter = {...BLANK_LIFTER, id: uuid()}
            state.lifters.push(newLifter)
        }
    }
})

export const {setDisplayedLift, 
    setLifterName, 
    setAttempt, 
    setAttemptStatus, 
    setWeightClass, 
    setSex, 
    setScore, 
    deleteLifter,
    addDefaultLifter} = competitionDataSlice.actions
export default competitionDataSlice.reducer