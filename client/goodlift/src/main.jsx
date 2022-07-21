import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import RefLights from './Components/RefLights/RefLights'
import RefUI from './Components/RefLights/RefUI'
import './index.css'

import {LifterContextProvider} from './Components/LifterContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LifterContextProvider>
      {/* <App /> loads table rn*/}
      <RefUI/>
    </LifterContextProvider>
  </React.StrictMode>
)
