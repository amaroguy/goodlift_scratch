import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store'
import NewLifterTable from './NewLifterTable'


export default function MeetManage(props){


    return (
        <Provider store = {store}>
            <NewLifterTable/>
        </Provider>
    )
}