import {configureStore} from '@reduxjs/toolkit'
import competitionDataReducer from './features/competitionData/competitionDataSlice'

export const store = configureStore({
    reducer: {
        competitionData: competitionDataReducer
    }
})