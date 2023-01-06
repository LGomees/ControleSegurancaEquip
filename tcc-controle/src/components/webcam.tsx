import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Webcam from 'react-webcam';
import styled from "styled-components";

import marcacaoRosto from '../marcacaoRosto.png'
import ".././assets/webcam.css"

const WebcamComponent = () => <Webcam />;

export function WebcamCapture() {

    const [playing, setPlaying] = useState(false);

    const startVideo = () => {
        setPlaying(true)
    };

    const tryAgainVideo = () => {
        setPlaying(false)
    };

    const navigate = useNavigate();
    function nextStep() {
        navigate("/movimentacao");
    }

    const Button = styled.button`
        background-color: #2B676F;
        color: white;
        font-size: 20px;
        padding: 10px 60px;
        border-radius: 12px;
        border: none;
        margin: 10px 0px;
        cursor: pointer;

        &:hover {
            background-color: #317079;
            opacity: 0.9;
            cursor: pointer;
    `;

    useEffect(() => {
        document.addEventListener('keydown',detectKeyPress, true)
    }, [])

    const detectKeyPress = (e: { key: any; }) => {
        if (e.key === "Enter") {
            startVideo()
        }
    }

    return (
        <div className="webcamSpace">
                {playing ? (
                    <div>
                        <div className="webcamContainer">
                            <div id="screenWebcam">
                                <Webcam />
                            </div>
                            <div id="marcacaoRostoimg">
                                <img src={marcacaoRosto}/>
                            </div>
                        </div>
                        <div className="webcamButton">
                            {playing ? (
                                <div id="divRunning">
                                    <p id="textGuide">Posicione seu rosto na marcação</p>
                                    <Button onClick={tryAgainVideo}>    
                                        Tentar Novamente
                                    </Button>   
                                    <Button onClick={nextStep}>
                                        Próxima Página
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <Button onClick={tryAgainVideo}>
                                        Tentar Novamente
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p id="textoWebcam">Pressione ENTER para começar a verificação.</p>
                    
                )}  
            
        </div>
    );
}
