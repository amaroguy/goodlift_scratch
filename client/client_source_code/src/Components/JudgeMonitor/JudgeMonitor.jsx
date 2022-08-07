import React, {useEffect, useState} from 'react'
import { io, Socket } from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { TABLE_HEADINGS, HEADING_SPANS, REF_SIDE_LEFT, REF_MIDDLE, REF_SIDE_RIGHT, SOCKET_URL } from '../../util'
import JudgeMonitorTable from './JudgeMonitorTable'
import JudgeMonitorCurrentLifter from './JudgeMonitorCurrentLifter'
import './JudgeMonitor.css'
import JudgeMonitorLights from './JudgeMonitorLights'
import JudgeMonitorPlateLoading from './JudgeMonitorPlateLoading'

export default function JudgeMonitor() {
//be able to connect to the judge lights,
//be able to connect to management table, both can be connected to from one socket
//args will be passed in through qstring urls

    const [compData, setCompData] = useState("")
    const [judgeLights, setJudgeLights] = useState("")

    let {resultsStreamingID} = useParams()

    useEffect(() => {
        console.log('foo')
        const lightsSocket = io.connect(SOCKET_URL)
        const tableSocket = io.connect(SOCKET_URL)


        lightsSocket.emit("joinJudgeRoom", {username: 'SPECTATOR', judgeRole: "SPECTATOR", resultsStreamingID})

        tableSocket.emit("joinResultsStreamingRoom", resultsStreamingID, (compData) => {
            console.log('fetched data:', compData)
            setCompData(compData.tableData)
        })

        tableSocket.on('tableDataUpdated', (newTableData) => {
            console.log('received table data:', newTableData)
            console.log('Setting compdata to:', newTableData.newTableData)
            setCompData(newTableData.newTableData)
        } )

        lightsSocket.on('syncLights', ({lights}) => {
            console.log('bar', lights)
            setJudgeLights(lights)})

        lightsSocket.emit('fetchLights', resultsStreamingID, (lights) => setJudgeLights(lights))

        lightsSocket.on('hostDisconnect', ({msg}) => {
            console.log(msg)
        })

    }, [])

    if(!(compData && judgeLights)){
        return "Loading..."
    }

    console.log(compData)

    return (
        <div className = "jm-container">  
            <div className = "jm-lifter-info">
                { compData ? <JudgeMonitorCurrentLifter tableData = {compData}/> : ""}
            </div>
            <div className = "jm-plate-loading"><JudgeMonitorPlateLoading weightsInfo = {compData.weightInfo} currentLiftWeight = {compData.displayedLift.attemptDetails.weight}/></div>
            <div className = "jm-lights-container"><JudgeMonitorLights lights = {judgeLights}/></div>
            <div className = "jm-table">
                { compData ? <JudgeMonitorTable tableData = {compData}/> : ""}
            </div>
        </div>
    )

}