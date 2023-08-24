import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import ".././assets/webcam.css";
import api from "../services/api.js";

export function WebcamCapture() {
    const [playing, setPlaying] = useState(false);
    const [userFacial, setUserFacial] = useState('');
    const [notSignUp, setNotSignUp] = useState(true);
    
    const navigate = useNavigate();

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
        }
    `;

    const startVideo = () => {
        setPlaying(true);
    };

    const goAheadLogged = () => {
        setNotSignUp(false);
    };

    const executeFacialRec = async () => {
        const response = await api.post('/facialDetection');
        if (response.data == 'JULIE') {
            const name = 'Julie Delchova'
            setUserFacial(name);
            localStorage.setItem('name', name);
        } else if (response.data == 'LUCAS') {
            const name = 'Lucas Gomes'
            setUserFacial(name);
            localStorage.setItem('name', name);
        } else {
            setUserFacial(response.data);
            localStorage.setItem('name', response.data);
        }
    };

    const loginWithFacialRecognition = async () => {
        const response = await api.post('/sessions', { name: userFacial });
        const { _id } = response.data;

        localStorage.setItem('user', _id);
        localStorage.setItem('name', userFacial);
        console.log('----- ESSE NOME FOI ARMAZENADO');

        navigate("/movimentacao"); // Quando cadastrar o funcionário, redireciona para a página MOVIMENTACAO.
    };

    useEffect(() => {
        document.addEventListener('keydown', detectKeyPress, true);
    }, []);

    const detectKeyPress = (e) => {
        if (e.key === "Enter") {
            startVideo();
            executeFacialRec();
        }
        if (e.key === "q" || e.key === "Q" ) {
            goAheadLogged();
        }
    };

    return (
        <div className="webcamSpace">
            {playing ? (
                <div>
                    <div className="webcamButton">
                        {notSignUp ? (
                            <div id="divRunning">
                                <p id="textGuide">Posicione seu rosto na marcação. Após a leitura, pressione a tecla 'Q' para continuar</p>   
                            </div>
                        ) : (
                            <div>
                                <Button onClick={loginWithFacialRecognition}>
                                    Continuar
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
