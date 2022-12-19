import React, { useState, useEffect } from "react";
import Webcam from 'react-webcam';
import styled from "styled-components";

const WebcamComponent = () => <Webcam />;

import ".././assets/webcam.css"

export function WebcamCapture() {

    

    const [playing, setPlaying] = useState(false);

    const startVideo = () => {
        setPlaying(true)
    };

    const tryAgainVideo = () => {
        setPlaying(false)
    };

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
                            <Webcam />
                        </div>
                        <div className="webcamButton">
                            {playing ? (
                                <div id="divRunning">
                                    <p id="textGuide">Posicione seu rosto na marcação</p>
                                    <Button onClick={tryAgainVideo}>
                                        Tentar Novamente
                                    </Button>   
                                </div>
                            ) : (
                                <Button onClick={tryAgainVideo}>
                                    Tentar Novamente
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <p id="textoWebcam">Pressione ENTER para começar a verificação.</p>
                    
                )}  
            
        </div>
    );
}
