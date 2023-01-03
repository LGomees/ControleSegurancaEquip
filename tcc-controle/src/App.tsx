import { useState } from 'react'
import reactLogo from './assets/react.svg'
import "./assets/index.css"
import { Header } from './components/header'
import { WebcamCapture } from './components/webcam'

function App() {

  return ( 
    <body>
      <Header></Header>
      {/* <WebcamCapture></WebcamCapture> */}
      <div className='container'>
        <div className='content'>
          <p>Insira o nome da pessoa a ser analisada</p>
          <form>
            <input 
              id='name' 
              placeholder='Nome' ></input>
            <button className='btn' type='submit'>Criar</button>
          </form>
        </div>
      </div>
    </body>
    
  )
}

export default App
