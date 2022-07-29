import React, {useState} from 'react'
import './plates.css'

export default function JudgeMonitorPlateLoading({weightsInfo, currentLiftWeight}) {

    console.log("JMPL || weightsInfo", weightsInfo)
    console.log("JMPL || currentLiftWeight", currentLiftWeight)


    currentLiftWeight = parseFloat(currentLiftWeight)
    let platesToDisplay = []

    function handleChange(e){
        setWeightsAvailableKg({...weightsAvailableKg, 25: e.target.value})
        console.log(weightsAvailableKg)
    }

    function calculateWeight(weight, barWeight, weightsAvailable){

        if(weight === barWeight){
            return ["EMPTY"]
        }


        console.log("calculating the plates...", weight)
        weight-= barWeight

        console.log('weight w/out bar', weight)

        let platesUsed = Object.keys(weightsAvailable)
                        .map(weight => parseFloat(weight))
                        .sort((weightOne, weightTwo) => {
                            return weightOne > weightTwo ? -1 : 1
                        })

        let plateArr = []

        for(let plate of platesUsed){
            let currentPlate = parseFloat(plate)
            let platesRemaining = weightsAvailable[plate]

            while(platesRemaining >= 2 && weight / currentPlate >= 2 && weight > 0){
                platesRemaining -= 2
                weight -= currentPlate * 2
                plateArr.push(currentPlate)
            }

        }
        console.log("This is the arr at the end", plateArr)
        return weight === 0 || weight < 0 ? plateArr : [-1]
    }

    function generatePlates(plateArr) {
        return plateArr.map(plate => {

            if(plate === "EMPTY"){
                return "EMPTY BAR"
            } else if (plate === -1){
                return "Weight not Possible"
            }

            let classStr = plate.toString() + "kg"

            return (<div className = {classStr}> </div>)

        })
    }

    let {barAndClipsWeight, platesAvailable} = weightsInfo
    platesToDisplay = calculateWeight(currentLiftWeight, barAndClipsWeight, platesAvailable)
    console.log("im supposed to display these",platesToDisplay)

    return (
        <>
            <div style = {{display: "flex", alignItems: "center"}}>
                {platesToDisplay.length === 0 ? "This weight is not possibles" : generatePlates(platesToDisplay)}
            </div> 
        </>
    ) 




}