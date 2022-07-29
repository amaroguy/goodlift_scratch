import React from "react";
import { GOOD_LIFT, NO_LIFT, LIFT_NOT_ATTEMPTED, SOCKET_URL } from "../../util";

export default function JudgeMonitorLights({lights}){

    console.log('rerendering with lights', lights)
    function lightStyle(status){
        switch(status){
            case GOOD_LIFT:
                return {backgroundColor: "white"}
            case NO_LIFT:
                return {backgroundColor: "red"}
            case LIFT_NOT_ATTEMPTED:
                return {backgroundColor: "black"}
        }
    }

    return (
        <div className="jm-lights-container">
            <div className = "light" style = {lightStyle(lights.judgeLeft)}> </div> 
            <div className = "light" style = {lightStyle(lights.judgeMiddle)}> </div> 
            <div className = "light" style = {lightStyle(lights.judgeRight)}> </div> 
        </div>
    )

}