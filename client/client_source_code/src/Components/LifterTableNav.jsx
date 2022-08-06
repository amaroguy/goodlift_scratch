import React from 'react'
import { LifterContext } from './LifterContext'
import './MeetManager/MeetManager.css'

export default function LifterTableNav({displayedLifterName}) {    
    return (
        <div className = "table-nav">
            <p className = "table-nav-txt">Current Lifter: {displayedLifterName} </p>
        </div> 
    )
}