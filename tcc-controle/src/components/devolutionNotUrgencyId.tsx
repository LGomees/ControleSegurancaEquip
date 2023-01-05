import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import "../assets/index.css"
import "../assets/devolutionUrgency.css"
import api from '../services/api'


export function DevolutionNotUrgencyId() {
    const [movement, setMovement] = useState<any[]>([]);

    const { _id } = useParams();
    const user_name = localStorage.getItem('name'); 
    
    const today = new Date();
    let dateHourDevolution = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' ' + (today.getHours()<10?'0':'') + today.getHours() + ':' + (today.getMinutes()<10?'0':'') + today.getMinutes();

    useEffect(() => {   
        async function loadDevolutionsNotUrgency() {
            const response = await api.get('/movimentacao/devolucaoNaoUrgenteId/', {
                headers: { _id: _id } 
            });
            setMovement(response.data);
            console.log(movement)
        }

        loadDevolutionsNotUrgency();

    }, [])

    async function updateDevolution() {
        const response = await api.put('/movimentacao/finalizaDevolucao', {
            dateHourDevolution
        },
        { headers: { _id, user_name  } 
        });

    }

    const navigate = useNavigate();
    function finishDevolution() {
        navigate("/");
    }


    return (
        <div className='container'>
            <p id='textDevolution'>Detalhes da retirada:</p>
            <div className='content' id='content-list'>
                {/* CHAMAR A FUNÇÃO DE OBJECT DETECTION E REALIZAR A IDENTIFICAÇÃO DO OBJETO. 
                FAZER COMPARAÇÃO DO TEXTO DO OBJETO COM O CAMPO MOVEMENT.EQUIPAMENT */}
                {/* Trocar listagem das informações para um campo onde irá preencher o nome do equipamento, fazer a verificação,
                e depois preencher automaticamente: 
                Responsável da Devolução = const user_name = localStorage.getItem('name');
                Data e Hora = Copiar código da Retirada. */}
            <ul className='movementUrgency-list'>
                    <li >
                        <strong>Responsável pela Retirada: </strong><span>{movement.responsibleWithDraw}</span>
                        <strong>Data/Hora da Retirada: </strong><span>{movement.dateHourWithdraw}</span>
                        <strong>Equipamento: </strong><span>{movement.equipament}</span>
                        <strong>Urgência: </strong><span>{movement.emergency}</span>
                        <strong>Patrimônio: </strong><span>{movement.patrimony}</span>
                        <strong>Responsável pela Devolução: </strong><span style={{ color: movement.responsibleDevolution ? '#2a2a2a' : 'red' }}>{movement.responsibleDevolution ? movement.responsibleDevolution : 'AGUARDANDO DEVOLUÇÃO'}</span>
                        <strong>Data/Hora da Retirada:  </strong><span style={{ color: movement.dateHourDevolution ? '#2a2a2a' : 'red' }}>{movement.dateHourDevolution ? movement.dateHourDevolution : 'AGUARDANDO DEVOLUÇÃO'}</span>
                    </li>
                </ul>
                {movement.responsibleDevolution ? 
                    <button className='btn' id='btnDevolutionFinal' style={{ backgroundColor: movement.responsibleDevolution ? '#35ad47' : '#2B676F'  }} onClick={finishDevolution}>
                        Finalizar Devolução
                    </button>
                        :
                    <button className='btn' id='btnDevolutionFinal' onClick={updateDevolution}>
                        Realizar Devolução
                    </button>
                }
            </div>
        </div>
    );
}