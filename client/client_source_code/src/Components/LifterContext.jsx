import React, {useState} from 'react'
import {TESTING_TABLE_DATA as COMP_DUMMY_DATA, BLANK_LIFTER} from './test_data/LifterTestData'
import {v4 as uuid} from 'uuid'

const LifterContext = React.createContext()


function LifterContextProvider(props){

    const [compData, setCompData] = useState(COMP_DUMMY_DATA)

    function setName(lifterId, newName){
        console.log("Setting Name")
        setCompData(oldData => {
            return {
                ...oldData,
                lifters: oldData.lifters.map(lifter => {
                    if(lifter.id === lifterId){
                        return {
                            ...lifter,
                            name: newName
                        }
                    } else {
                        return lifter
                    }
                }),
                competitionDetails: {...oldData.competitionDetails}
            }
        })
    }

    //chungus function
    function setAttempt(lifterID, lift, attemptNum, newWeight){

        setCompData(oldData => {
            return {
                ...oldData,
                lifters: oldData.lifters.map(lifter => {

                    if(lifter.id === lifterID){
                    //Found the lifter we want
                        return {
                            ...lifter,
                            lifts: {
                                ...lifter.lifts,
                                [lift]: {
                                    ...lifter.lifts[lift],
                                    [attemptNum]: {
                                        ...lifter.lifts[lift][attemptNum],
                                        weight: newWeight
                                    }
                                }
                            }
                        }
                    } else {
                        return lifter
                    }
                }
                ),
                competitionDetails: {...oldData.competitionDetails}
             }
        })
    }

        //chungus function
        function setAttemptStatus(lifterID, lift, attemptNum, newStatus){

            setCompData(oldData => {
                return {
                    ...oldData,
                    lifters: oldData.lifters.map(lifter => {
    
                        if(lifter.id === lifterID){
                        //Found the lifter we want
                            return {
                                ...lifter,
                                lifts: {
                                    ...lifter.lifts,
                                    [lift]: {
                                        ...lifter.lifts[lift],
                                        [attemptNum]: {
                                            ...lifter.lifts[lift][attemptNum],
                                            status: newStatus
                                        }
                                    }
                                }
                            }
                        } else {
                            return lifter
                        }
                    }
                    ),
                    competitionDetails: {...oldData.competitionDetails}
                 }
            })
        }

    function setWeight(lifterId, newWeightClass){
        setCompData(oldData => {
            return {
                ...oldData,
                lifters: oldData.lifters.map(lifter => {
                    if(lifter.id === lifterId){
                        return {
                            ...lifter,
                            weightClass: newWeightClass
                        }
                    } else {
                        return lifter
                    }
                }),
                competitionDetails: {...oldData.competitionDetails}
            }
        })
    }

    function addBlankLifter(){
        setCompData(oldData => {
            return {
                ...oldData,
                lifters: [...oldData.lifters, {...BLANK_LIFTER, id: uuid()}]
            }
        })
    }

    return (
        <LifterContext.Provider 
        value = {{setAttemptStatus, compData, setCompData, setAttempt, setName, setWeight, addBlankLifter}}>
            {props.children}
        </LifterContext.Provider>
    )

}

export {LifterContext, LifterContextProvider}