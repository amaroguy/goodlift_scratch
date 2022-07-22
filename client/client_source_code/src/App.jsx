import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css'

import LifterTable from './Components/LifterTable'
import AddLifterButton from './Components/AddLifterButton.jsx'
import DownloadDataButton from './Components/DownloadDataButton.jsx'


import Foo from './Foo'
import HomePage from './Components/HomePage/HomePage'
import MeetManager from './Components/MeetManager/MeetManager'
import RefLights from './Components/RefLights/RefLights'
import RefConnectForm from './Components/RefLights/RefConnectForm'
import Bar from './Bar'
import LifterTableSpectatorMode from './Components/LifterTableSpectatorMode'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="manage" element = {<MeetManager/>} />
        <Route path="judge" element = {<RefConnectForm/>} /> 
        <Route path = "judge/join" element = {<RefLights/>}/>
        <Route path = "debug" element = {<Bar/>}/>
        <Route path = "spectate/:id" element = {<LifterTableSpectatorMode/>} />
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
