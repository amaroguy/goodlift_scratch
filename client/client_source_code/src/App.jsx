import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//import './App.css'

import LifterTable from './Components/LifterTable'
import AddLifterButton from './Components/AddLifterButton.jsx'
import DownloadDataButton from './Components/DownloadDataButton.jsx'


import Foo from './Foo'
import HomePage from './Components/HomePage/HomePage'
import RefLights from './Components/RefLights/RefLights'
import RefConnectForm from './Components/RefLights/RefConnectForm'
import Bar from './Bar'
import LifterTableSpectatorMode from './Components/LifterTableSpectatorMode'
import JudgeMonitor from './Components/JudgeMonitor/JudgeMonitor'
import NewLights from './Components/RefLights/NewLightsForJudges'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="manage" element = {<LifterTable/>} />
        <Route path="judge" element = {<RefConnectForm/>} /> 
        <Route path = "judge/join" element = {<NewLights/>}/>
        <Route path = "debug" element = {<h2>This used to be bar</h2>}/>
        <Route path = "spectate/:resultsStreamingID" element = {<LifterTableSpectatorMode/>} />
        <Route path = "judgemonitor/:resultsStreamingID" element = {<JudgeMonitor/>} /> 
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
