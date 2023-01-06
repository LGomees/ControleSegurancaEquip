import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import "../assets/index.css"
import "../assets/devolutionUrgency.css"
import api from '../services/api'


export function DevolutionUrgencyId() {
    const [movement, setMovement] = useState<any[]>([]);

    const [patrimony, setPatrimony] = useState('');
    
    const { _id } = useParams();
    const user_name = localStorage.getItem('name'); 
    
    const today = new Date();
    let dateHourDevolution = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' ' + (today.getHours()<10?'0':'') + today.getHours() + ':' + (today.getMinutes()<10?'0':'') + today.getMinutes();
    
    useEffect(() => {   
        async function loadDevolutionsUrgency() {
            const response = await api.get('/movimentacao/devolucaoUrgenteId/', {
                headers: { _id: _id }
            });
            setMovement(response.data);
        }

        loadDevolutionsUrgency();

    }, [])

    async function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();
        
        //FAZER VERIFICAÇÃO COM O OBJETO QUE ESTA NO MOVEMENT.EQUIPAMENT
        // const equipament = "Caneca";   
        //CRIAR FUNÇÃO PARA PEGAR O NOME DA IDENTIFICAÇÃO DO OBJETO E ADICIONAR NA VARIÁVEL
        
        const response = await api.put('/movimentacao/finalizaDevolucaoUrgente', {
            dateHourDevolution,
            patrimony
        },
        { 
            headers: { _id, user_name  } 
        });
        
        window.location.reload(false);

    }

    const navigate = useNavigate();
    function finishDevolution() {
        navigate("/");
    }

    return (
        <div className='container'>
            {movement.responsibleDevolution ? 
                <p></p>
                :
                <p id='textAsk'>Digite o patrimonio do equipamento que está sendo retirado</p>
            }

            <div className='content' id='content-list'>
            {movement.responsibleDevolution ? 
                <p></p>
                :
                <>
                    <form onSubmit={handleSubmit}>
                            <input 
                                id='patrimony' 
                                placeholder='Patrimônio *'
                                value={patrimony}
                                onChange={event => setPatrimony(event?.target.value)}
                                ></input>
                            <button className='btn'>Finalizar Devolução</button>
                    </form> 
                    <p style={{color: '#2a2a2a'}}>____________________________________________</p>
                </>
            }
                <p id='textDevolution' >Detalhes da retirada:</p>
                <ul className='movementUrgency-list'>
                    <li>
                        <strong>Responsável pela Retirada: </strong><span>{movement.responsibleWithDraw}</span>
                        <strong>Data/Hora da Retirada: </strong><span>{movement.dateHourWithdraw}</span>
                        <strong>Equipamento: </strong><span>{movement.equipament}</span>
                        <strong>Urgência: </strong><span>{movement.emergency}</span>
                        <strong>Patrimônio: </strong><span>{movement.patrimony}</span>
                        <strong>Responsável pela Devolução: </strong><span style={{ color: movement.responsibleDevolution ? '#2a2a2a' : 'red' }}>{movement.responsibleDevolution ? movement.responsibleDevolution : 'AGUARDANDO DEVOLUÇÃO'}</span>
                        <strong>Data/Hora da Retirada:  </strong><span style={{ color: movement.dateHourDevolution ? '#2a2a2a' : 'red' }}>{movement.dateHourDevolution ? movement.dateHourDevolution : 'AGUARDANDO DEVOLUÇÃO'}</span>
                    </li>
                    {movement.responsibleDevolution ? 
                        <button className='btn' id='btnDevolutionFinalUrgente' style={{ backgroundColor: movement.responsibleDevolution ? '#35ad47' : '#2B676F'  }} onClick={finishDevolution}>
                            Finalizar Devolução
                        </button>
                            :
                            <p>.</p>
                    }
                </ul>
            </div>
        </div>
    );
}