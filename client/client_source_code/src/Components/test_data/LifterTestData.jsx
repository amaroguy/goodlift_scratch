
//Notes

// Object Structure
//  
//  lifters: [Array]
//      name: String
//      weightClass: String
//      lifts: Object
//          squat: Object
//          bench: Object
//          deadlift: Object
//              attemptOne:Object
//              attemptTwo:Object
//              attemptThree: Object
//                  weight: String
//                  status: String
//                  lights: [Array] SEE LIGHTS NOTES
//
//  competitionDetails : Object
//     location: String
//     competition_id: Integer,
//     status: String
//  
//          
//

// LIGHTS
// -1 == No Judge Input
// 0 == Red Light
// 1 == White Light


const BLANK_LIFTER = {
    id: 1,
    name: "",
    sex: "",
    weightClass: "",
    lifts: {
        squat: {
            attemptOne: {
                weight: "",
                status: "NOT ATTEMPTED",
                lights: [1,1,1]
            },
            attemptTwo: {
                weight: "",
                status: "NOT ATTEMPTED",
                lights: [1,1,0]
            },
            attemptThree: {
                weight: "",
                status: "NOT ATTEMPTED",
                lights: [-1,-1,-1]
            }
        },

        bench: {
            attemptOne: {
                weight: "",
                status: "NOT ATTEMPTED",
                lights: [1,1,1]
            },
            attemptTwo: {
                weight: "",
                status: "NOT ATTEMPTED",
                lights: [1,1,0]
            },
            attemptThree: {
                weight: "",
                status: "NOT ATTEMPTED",
                lights: [-1,-1,-1]
            }
        },

        deadlift: {
            attemptOne: {
                weight: "",
                status: "NOT ATTEMPTED",
                lights: [1,1,1]
            },
            attemptTwo: {
                weight: "",
                status: "NOT ATTEMPTED",
                lights: [1,1,0]
            },
            attemptThree: {
                weight: "",
                status: "NOT ATTEMPTED",
                lights: [-1,-1,-1]
            }
        }
    }
}

const TESTING_TABLE_DATA = {
    displayedLift: {
        lifterID: -1,

        attemptDetails: {
            lift: "Deadsquat",
            attemptNum: "FOO",
            weight: "1kg",
            status: "NOT ATTEMPTED"
        }
    },
    lifters: [
        {
            id: 1,
            name: "Erick",
            sex: "M", 
            weightClass: "100kg",
            score: 0,
            lifts: {
                squat: {
                    attemptOne: {
                        weight: "20kg",
                        status: "GOOD LIFT",
                        lights: [1,1,1]
                    },
                    attemptTwo: {
                        weight: "40kg",
                        status: "NO LIFT",
                        lights: [1,1,0]
                    },
                    attemptThree: {
                        weight: "60kg",
                        status: "NOT ATTEMPTED",
                        lights: [-1,-1,-1]
                    }
                },

                bench: {
                    attemptOne: {
                        weight: "2kg",
                        status: "GOOD LIFT",
                        lights: [1,1,1]
                    },
                    attemptTwo: {
                        weight: "4kg",
                        status: "NO LIFT",
                        lights: [1,1,0]
                    },
                    attemptThree: {
                        weight: "6kg",
                        status: "NOT ATTEMPTED",
                        lights: [-1,-1,-1]
                    }
                },

                deadlift: {
                    attemptOne: {
                        weight: "200kg",
                        status: "GOOD LIFT",
                        lights: [1,1,1]
                    },
                    attemptTwo: {
                        weight: "400kg",
                        status: "NO LIFT",
                        lights: [1,1,0]
                    },
                    attemptThree: {
                        weight: "600kg",
                        status: "NOT ATTEMPTED",
                        lights: [-1,-1,-1]
                    }
                }
            }
        },
        {
            id: 2, 
            name: "Paul",
            sex: "F",
            weightClass: "300kg",
            lifts: {
                squat: {
                    attemptOne: {
                        weight: "200kg",
                        status: "GOOD LIFT",
                        lights: [1,1,1]
                    },
                    attemptTwo: {
                        weight: "400kg",
                        status: "NO LIFT",
                        lights: [1,1,0]
                    },
                    attemptThree: {
                        weight: "600kg",
                        status: "NOT ATTEMPTED",
                        lights: [-1,-1,-1]
                    }
                },

                bench: {
                    attemptOne: {
                        weight: "200kg",
                        status: "GOOD LIFT",
                        lights: [1,1,1]
                    },
                    attemptTwo: {
                        weight: "400kg",
                        status: "NO LIFT",
                        lights: [1,1,0]
                    },
                    attemptThree: {
                        weight: "600kg",
                        status: "NOT ATTEMPTED",
                        lights: [-1,-1,-1]
                    }
                },

                deadlift: {
                    attemptOne: {
                        weight: "200kg",
                        status: "GOOD LIFT",
                        lights: [1,1,1]
                    },
                    attemptTwo: {
                        weight: "400kg",
                        status: "NO LIFT",
                        lights: [1,1,0]
                    },
                    attemptThree: {
                        weight: "600kg",
                        status: "NOT ATTEMPTED",
                        lights: [-1,-1,-1]
                    }
                }
            }
        },
        {
            name: "Omar",
            id: 3, 
            sex: "M",
            weightClass: "-1kg",
            lifts: {
                squat: {
                    attemptOne: {
                        weight: "2kg",
                        status: "GOOD LIFT",
                        lights: [1,1,1]
                    },
                    attemptTwo: {
                        weight: "4kg",
                        status: "NO LIFT",
                        lights: [1,1,0]
                    },
                    attemptThree: {
                        weight: "6kg",
                        status: "NOT ATTEMPTED",
                        lights: [-1,-1,-1]
                    }
                },

                bench: {
                    attemptOne: {
                        weight: "2kg",
                        status: "GOOD LIFT",
                        lights: [1,1,1]
                    },
                    attemptTwo: {
                        weight: "4kg",
                        status: "NO LIFT",
                        lights: [1,1,0]
                    },
                    attemptThree: {
                        weight: "6kg",
                        status: "NOT ATTEMPTED",
                        lights: [-1,-1,-1]
                    }
                },

                deadlift: {
                    attemptOne: {
                        weight: "2kg",
                        status: "GOOD LIFT",
                        lights: [1,1,1]
                    },
                    attemptTwo: {
                        weight: "4kg",
                        status: "NO LIFT",
                        lights: [1,1,0]
                    },
                    attemptThree: {
                        weight: "6kg",
                        status: "NOT ATTEMPTED",
                        lights: [-1,-1,-1]
                    }
                }
            }
        }
    ],
    competitionDetails: {
        location: "California",
        competition_id: 10,
        status: "Complete"
    },
    weightInfo:  {
        unit: "KG",
        barAndClipsWeight: 20,
        platesAvailable: {
            25: 10,
            20: 10,
            15: 10,
            10: 10,
            5: 10,
            2.5: 10,
            1: 10,
            0.75: 10,
            0.5: 10,
            0.25: 10,
            0.125: 10
        }
    }    
}

const platesAvailableTemplateKG = {
    unit: "KG",
    barAndClipsWeight: 20,
    platesAvailable: {
        25: 10,
        20: 10,
        15: 10,
        10: 10,
        5: 10,
        2.5: 10,
        1: 10,
        0.75: 10,
        0.5: 10,
        0.25: 10,
        0.125: 10
    }
}



export {TESTING_TABLE_DATA, BLANK_LIFTER}