import { parse } from "uuid"

export const GOOD_LIFT = "GOOD LIFT"
export const NO_LIFT = "NO LIFT"
export const LIFT_NOT_ATTEMPTED = "NOT ATTEMPTED"

export const REF_SIDE_LEFT = "judgeLeft"
export const REF_SIDE_RIGHT = "judgeRight"
export const REF_MIDDLE = "judgeMiddle"
export const SPECTATOR = "SPECTATOR"

export const ATTEMPT_ONE = "attemptOne"
export const ATTEMPT_TWO = "attemptTwo"
export const ATTEMPT_THREE = "attemptThree"

export const SQUAT = "squat"
export const BENCH = "bench"
export const DEADLIFT = "deadlift"

export const TABLE_HEADINGS = ['Name','Weight','Squat', 'Bench', 'Deadlift', 'DOTS']
export const HEADING_SPANS = [1,1,3,3,3,1]

export const MALE = "M"
export const FEMALE = "F"
export const MIXED = "Mx"

export function CALCULATE_DOTS(lifter){
    console.log('calculating dots for', lifter.name)
    return lifter.sex === MALE ? mensDots(lifter) : womensDots(lifter)

}

function mensDots(lifter){
    let total = getTotal(lifter)
    console.log('DOTS CALC TOTAL ', total)
    let bw = parseFloat(lifter.weightClass)

    let termA = -0.000001093 * Math.pow(bw, 4)
    let termB = 0.0007391293 * Math.pow(bw, 3)
    let termC = -0.1918759221 * Math.pow(bw, 2)
    let termD = 24.0900756 * bw
    let termE = -307.75076 
    let sumTerms = termA + termB + termC + termD + termE

    let DOTS = total * (500 / sumTerms)

    return DOTS.toFixed(2)
}

function womensDots(lifter){
    let total = getTotal(lifter)
    let bw = parseFloat(lifter.weightClass)

    let termA = -0.0000010706  * Math.pow(bw, 4)
    let termB = 0.0005158568 * Math.pow(bw, 3)
    let termC = -0.1126655495 * Math.pow(bw, 2)
    let termD = 13.6175032 * bw
    let termE = -57.96288
    let sumTerms = termA + termB + termC + termD + termE

    let DOTS = total * (500 / sumTerms)

    return DOTS.toFixed(2)
}

function getMaxLift(liftAttempts){

    let goodLifts = liftAttempts.reduce((acc, liftAttempt) => {
        if (liftAttempt.status === GOOD_LIFT){
            return [...acc, parseFloat(liftAttempt.weight)]
        } 
        return acc
    }, [])

    return goodLifts.length === 0 ? 0: Math.max(...goodLifts)
}

function getTotal(lifter){
    
    let {lifts} = lifter
    let total = 0

    let squatMax = getMaxLift(Object.values(lifter.lifts.squat))
    let benchMax = getMaxLift(Object.values(lifter.lifts.bench))
    let deadliftMax = getMaxLift(Object.values(lifter.lifts.deadlift))


    return (squatMax + benchMax + deadliftMax)

}

export const SOCKET_URL = "http://localhost:3001"