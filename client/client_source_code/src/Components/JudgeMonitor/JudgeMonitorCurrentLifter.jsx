import React from "react";
import { ATTEMPT_ONE, ATTEMPT_TWO, ATTEMPT_THREE } from "../../util";

export default function JudgeMonitorCurrentLifter({tableData}) {
    console.log("AAAA", tableData)

    function getLifterFromID(lifterID){
        return tableData.lifters.find(lifter => lifterID === lifter.id)
    }


    let displayedLifter = getLifterFromID(tableData.displayedLift.lifterID)
    console.log("DL:", displayedLifter)

    function getLiftDetailsString(){
        let attemptNumber = 'N/A'
        let lift = tableData.displayedLift.attemptDetails.lift.toUpperCase()

        switch(tableData.displayedLift.attemptDetails.attemptNum){
            case ATTEMPT_ONE:
                attemptNumber = 'Attempt One'
                break
            case ATTEMPT_TWO:
                attemptNumber = 'Attempt Two'
                break
            case ATTEMPT_THREE:
                attemptNumber = 'Attempt Three'
                break
        }

        return `${lift} ${attemptNumber}: ${tableData.displayedLift.attemptDetails.weight}`

    }

    return (
        <>  {tableData.displayedLift.lifterID === -1 ? <h1>Lifter has not been focused yet! </h1> :
            <> 
                <h1> {displayedLifter.name ? displayedLifter.name : "N/A"} </h1>
                <h4> WEIGHT CLASS {displayedLifter.weightClass ? displayedLifter.weightClass : "N/A"} </h4>
                <h2> CURRENT ATTEMPT {getLiftDetailsString()}</h2>    
            </>
            }
        </>
        
    )

}