
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
    id: -1,
    name: "",
    weightClass: "",
    lifts: {
        squat: {
            attemptOne: {
                weight: "",
                status: "",
                lights: [-1,-1,-1]
            },
            attemptTwo: {
                weight: "",
                status: "",
                lights: [-1,-1,-1]
            },
            attemptThree: {
                weight: "",
                status: "",
                lights: [-1,-1,-1]
            }
        },
        bench: {
            attemptOne: {
                weight: "",
                status: "",
                lights: [-1,-1,-1]
            },
            attemptTwo: {
                weight: "",
                status: "",
                lights: [-1,-1,-1]
            },
            attemptThree: {
                weight: "",
                status: "",
                lights: [-1,-1,-1]
            }
        },
        deadlift: {
            attemptOne: {
                weight: "",
                status: "",
                lights: [-1,-1,-1]
            },
            attemptTwo: {
                weight: "",
                status: "",
                lights: [-1,-1,-1]
            },
            attemptThree: {
                weight: "",
                status: "",
                lights: [-1,-1,-1]
            }
        }
    }
}

const TESTING_TABLE_DATA = {
    lifters: [
        {
            id: 1,
            name: "Erick",
            weightClass: "100kg",
            lifts: {
                squat: {
                    attemptOne: {
                        weight: "20kg",
                        status: "GOOD LIFT",
                        lights: [1,1,1]
                    },
                    attemptTwo: {
                        weight: "40kg",
                        status: "BAD LIFT",
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
                        status: "BAD LIFT",
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
                        status: "BAD LIFT",
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
                        status: "BAD LIFT",
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
                        status: "BAD LIFT",
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
                        status: "BAD LIFT",
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
                        status: "BAD LIFT",
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
                        status: "BAD LIFT",
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
                        status: "BAD LIFT",
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
    }
}

export {TESTING_TABLE_DATA, BLANK_LIFTER}