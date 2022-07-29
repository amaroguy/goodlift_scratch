import React from 'react'
import { LifterContext } from './LifterContext'
import './MeetManager/MeetManager.css'

export default function LifterTableNav(props) {
    const {compData, getLifterFromID} = React.useContext(LifterContext)

    function getDisplayedLifterName(){
  
        console.log(compData.displayedLift)
        const lifter = getLifterFromID(compData.displayedLift.lifterID)
        console.log(lifter)

        return lifter ? lifter.name : "N/A"
    }
    

    return (
        <div className = "table-nav">
            <div className = "table-nav-judge-lights-container">
                <div className="table-nav-judge-light">1</div>
                <div className="table-nav-judge-light">2</div>
                <div className="table-nav-judge-light">3</div>
            </div>
    
            <p className = "table-nav-txt">Current Lifter: {getDisplayedLifterName()} </p>
        </div> 
    )



    return(<h1> {compData.displayedLift.attemptDetails.weight} <br/> {compData.displayedLift.attemptDetails.status} </h1>)
}