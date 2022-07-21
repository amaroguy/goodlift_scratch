import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {LifterContextProvider} from './Components/LifterContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <LifterContextProvider>
      <App/>
    </LifterContextProvider>
  // </React.StrictMode>
)
