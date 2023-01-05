import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";

import "../assets/index.css"
import "../assets/askWorD.css"
import api from '../services/api'


export function  WithdrawNotUrgency() {

    const [patrimony, setPatrimony] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();
        
        const user_id = localStorage.getItem('user');
        const user_name = localStorage.getItem('name'); 
        const equipament = "Caneca";  //CRIAR FUNÇÃO PARA PEGAR O NOME DA IDENTIFICAÇÃO DO OBJETO E ADICIONAR NA VARIÁVEL
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
        console.log(response.data);
      navigate("/movimentacao/retiradaNaoUrgente"); // Quando registrar a retirada, redireciona para a página de FINALIZAÇÃO.

    }
    
    return (
        <div className='container'>
            <div className='content'>
                <p id='textAsk'>CHAMAR COMPONENTE DE OBJECT DETECTION e depois já enviar os dados urgentes para o banco</p>
                <p id='textAsk'>Digite o patrimonio do equipamento que está sendo retirado</p>
                <form onSubmit={handleSubmit}>
                        <input 
                            id='patrimony' 
                            placeholder='Patrimônio *'
                            value={patrimony}
                            onChange={event => setPatrimony(event?.target.value)}
                            ></input>
                        <button className='btn'>Finalizar Retirada</button>
                </form>
            </div>
        </div>
    );
}