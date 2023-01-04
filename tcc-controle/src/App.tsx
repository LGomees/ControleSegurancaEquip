import "./assets/index.css"

import { Header } from './components/header'
import { WebcamCapture } from './components/webcam'
import  { RoutesFront }  from './routes'


function App() {

  return ( 
    <body>
      <Header></Header>
      {/* <WebcamCapture></WebcamCapture> */}
      <RoutesFront></RoutesFront>
    </body>
    
  )
}

export default App
