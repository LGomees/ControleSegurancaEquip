import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam';
import ".././assets/webcam.css"


export function Finish() {

    const navigate = useNavigate();
    const [count, setCount] = useState(5); // Defina o valor inicial do countdown
  
    useEffect(() => {
      const countdown = setInterval(() => {
        setCount((prevCount) => prevCount - 1); // Decrementa o valor do countdown a cada segundo
      }, 1000);
  
      // Limpa o intervalo quando o componente for desmontado e redireciona para a página "/"
      if (count === 0) {
        clearInterval(countdown);
        navigate("/");
      }
  
      return () => clearInterval(countdown);
    }, [count, history]);

    return (
        <div>
            <p id="textoWebcam">Movimentação Finalizada!</p>
        </div>
    );
}