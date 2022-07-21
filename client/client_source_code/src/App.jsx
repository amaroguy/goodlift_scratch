import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import LifterTable from './Components/LifterTable'
import AddLifterButton from './Components/AddLifterButton.jsx'
import DownloadDataButton from './Components/DownloadDataButton.jsx'

function App() {

  return (
    <>
      <LifterTable/>
      <AddLifterButton/>
      <DownloadDataButton/>
    </>
  )
  
}

export default App
