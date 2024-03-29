import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";

import "../assets/index.css"
import "../assets/askWorD.css"
import api from '../services/api'


export function  WithdrawNotUrgency() {

    const [patrimony, setPatrimony] = useState('');
    const [objectDetected, setObjectDetected] = useState('')
    const [successDetec, setSuccessDetec] = useState(false)
    const [startDetection, setStartDetection] = useState(false)


    const navigate = useNavigate();

    async function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();
        
        const user_id = localStorage.getItem('user');
        const user_name = localStorage.getItem('name'); 
        const equipament = objectDetected;  //CRIAR FUNÇÃO PARA PEGAR O NOME DA IDENTIFICAÇÃO DO OBJETO E ADICIONAR NA VARIÁVEL
        const responsibleDevolution = "";
        const dateHourDevolution = "";

        const today = new Date();
        let dateHourWithdraw = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' ' + (today.getHours()<10?'0':'') + today.getHours() + ':' + (today.getMinutes()<10?'0':'') + today.getMinutes();

        const response = await api.post('/movimentacao/retiradaNaoUrgente', { 
              equipament,
              dateHourWithdraw,
              patrimony,
              responsibleDevolution,
              dateHourDevolution,
          }, {   
            headers: { user_id, user_name }
        });

      navigate("/finalizado"); // Quando registrar a retirada, redireciona para a página de FINALIZAÇÃO.

    }

    const executeObjRec = async () => {
        const response = await api.post('/objectDetection');
        if (response.data == 'MUG') {
            const obj = 'Caneca'
            setObjectDetected(obj);
        } else if (response.data == 'GLASSES') {
            const obj = 'Óculos'
            setObjectDetected(obj);
        } else if (response.data == 'HEADPHONES'){
            const obj = 'Fones de Ouvido'
            setObjectDetected(obj);
        } else {
            setObjectDetected(response.data);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', detectKeyPress, true);
    }, []);

    const detectKeyPress = (e) => {
        if (e.key === "e" || e.key === "E" ) {
            executeObjRec()
            setStartDetection(true)
        }
        if (e.key === "q" || e.key === "Q" ) {
            setSuccessDetec(true)
        }
    };
    
    return (
        <div className='container'>
            {startDetection ? (
                <div>
                    <div className="webcamButton">
                                {successDetec ? (                         
                                    <div className='content'>
                                        <p id='textAsk'>Digite o patrimonio do equipamento que está sendo retirado:</p>
                                        <form onSubmit={handleSubmit}>
                                                <input 
                                                    id='patrimony' 
                                                    placeholder='Patrimônio *'
                                                    value={patrimony}
                                                    onChange={event => setPatrimony(event?.target.value)}
                                                    ></input>
                                                <button className='btn'>Finalizar Retirada Não Urgente</button>
                                        </form>
                                    </div>
                                ) : (
                                    <div id="divRunning">
                                        <p id="textGuide">Posicione o equipamento na câmera. Após a leitura, pressione a tecla 'Q' para continuar</p>   
                                    </div>
                                )}
                    </div>
                </div>  
                ) : (
                <p id="textoWebcam">Pressione 'E' para começar a verificação do equipamento.</p>   
            )}  
        </div>
    );
}