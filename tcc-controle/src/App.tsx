import { useState } from 'react'
import reactLogo from './assets/react.svg'
import "./assets/index.css"
import { Header } from './components/header'
import { WebcamCapture } from './components/webcam'

function App() {

  return ( 
    <body>
      <Header></Header>
      <WebcamCapture></WebcamCapture>
    </body>
    
  )
}

export default App
