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
                return {backgroundColor: "#6D6D6D"}
        }
    }

    return (
        <>
            <div className = "jm-light" style = {lightStyle(lights.judgeLeft)}> </div> 
            <div className = "jm-light" style = {lightStyle(lights.judgeMiddle)}> </div> 
            <div className = "jm-light" style = {lightStyle(lights.judgeRight)}> </div> 
        </>
    )

}