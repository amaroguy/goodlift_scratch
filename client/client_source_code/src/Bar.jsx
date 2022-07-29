import { current } from 'immer'
import React, {useState} from 'react'

export default function Bar({weightsAvailable, currentLiftWeight}) {

    currentLiftWeight = parseFloat(currentLiftWeight)

    const [barWeight, setBarWeight] = useState(20)
    const [results, setResults] = useState(0)
    const [plateArr, setPlateArr] = useState([])
    const [weightNeeded, setWeightNeeded] = useState(-1)

    const [weightsAvailableKg, setWeightsAvailableKg] = useState({
        25: 2,
        20: 2,
        15: 2,
        10: 2,
        5: 2,
        2.5: 2,
        1: 6,
        0.75: 2,
        0.5: 2,
        0.25: 2,
        0.125: 2
    }) 


    function handleChange(e){
        setWeightsAvailableKg({...weightsAvailableKg, 25: e.target.value})
        console.log(weightsAvailableKg)
    }

    function calculateWeight(weight, weightsAvailable){

        weight-= barWeight

        let platesUsed = Object.keys(weightsAvailable)
                        .map(weight => parseFloat(weight))
                        .sort((weightOne, weightTwo) => {
                            return weightOne > weightTwo ? -1 : 1
                        })

        console.log(platesUsed)

        let plateArr = []

        for(let plate of platesUsed){
            let currentPlate = parseFloat(plate)
            let platesRemaining = weightsAvailable[plate]
            console.log('Looking at plate:', currentPlate)
            console.log('weight % currentPlate: ', weight / currentPlate)
            console.log('weight:', weight)

            while(platesRemaining >= 2 && weight / currentPlate >= 2 && weight > 0){
                platesRemaining -= 2
                weight -= currentPlate * 2
                plateArr.push(currentPlate)
            }

        }
        
        return weight === 0 || weight < 0 ? plateArr : "Not Possible"
    }

    const st = {
        display: "flex",
        flexDirection: "column"
    }

    function unitTests() {
        for(let i = 20; i <= 500; i+=2.5){
            let result = calculateWeight(i, weightsAvailableKg)
            console.log("Testing weight", i)
            if(!Array.isArray(result)){
                console.log("Failed test with weight", i)
                return false
            } else {
                console.log("Passed unit test of weight", i, result)
            }
        }
        console.log("Passed Test!")
        return true
    }

    function generatePlates() {
        return plateArr.map(plate => {
            let classStr = plate.toString() + "kg"

            return (<div className = {classStr}> </div>)

        })
    }

    return (
        <div class = "container">
            <div class = "modifiers" style = {st}>
                Number of 25kg plates
                <input type="number" value={weightsAvailableKg[25]} onChange={(e) => setWeightsAvailableKg({...weightsAvailableKg, 25: e.target.value})} /> 
                Number of 20kg plates
                <input type="number" value={weightsAvailableKg[20]} onChange={(e) => setWeightsAvailableKg({...weightsAvailableKg, 20: e.target.value})} /> 
                Number of 15kg plates
                <input type="number" value={weightsAvailableKg[15]} onChange={(e) => setWeightsAvailableKg({...weightsAvailableKg, 15: e.target.value})} /> 
                Number of 10kg plates
                <input type="number" value={weightsAvailableKg[10]} onChange={(e) => setWeightsAvailableKg({...weightsAvailableKg, 10: e.target.value})} /> 
                Number of 5kg plates
                <input type="number" value={weightsAvailableKg[5]} onChange={(e) => setWeightsAvailableKg({...weightsAvailableKg, 5: e.target.value})} /> 
                Number of 2.5kg plates
                <input type="number" value={weightsAvailableKg[2.5]} onChange={(e) => setWeightsAvailableKg({...weightsAvailableKg, 2.5: e.target.value})} /> 
                Number of 1kg plates
                <input type="number" value={weightsAvailableKg[1]} onChange={(e) => setWeightsAvailableKg({...weightsAvailableKg, 1: e.target.value})} />
                Number of 0.75kg plates
                <input type="number" value={weightsAvailableKg[0.75]} onChange={(e) => setWeightsAvailableKg({...weightsAvailableKg, 0.75: e.target.value})} />
                Number of 0.5kg plates
                <input type="number" value={weightsAvailableKg[0.5]} onChange={(e) => setWeightsAvailableKg({...weightsAvailableKg, 0.50: e.target.value})} />
                Number of 0.25kg plates
                <input type="number" value={weightsAvailableKg[0.25]} onChange={(e) => setWeightsAvailableKg({...weightsAvailableKg, 0.25: e.target.value})} />


                Weight Needed 
                <input type="number" value = {weightNeeded} onChange = {(e) => setWeightNeeded(e.target.value)} />
            </div>
            
            <button onClick = {() => setPlateArr(calculateWeight(weightNeeded, weightsAvailableKg))} > Calculate </button>
            <button onClick = {() => unitTests()} > Unit Test </button>
            <h5>{Array.isArray(plateArr) ? plateArr.join(",") : plateArr}</h5>

            <h2> {results ? results : "To be Calculated"} </h2> 

            <div style = {{display: "flex", alignItems: "center"}}>
                {plateArr.length === 0 ? "" : generatePlates()}
            </div>
        </div> 
    ) 




}