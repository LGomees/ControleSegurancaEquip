import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import "../assets/index.css"
import "../assets/devolutionUrgency.css"
import api from '../services/api'


export function DevolutionNotUrgency() {
    const [movement, setMovement] = useState<any[]>([]);

    const navigate = useNavigate();
    function redirectToDetails(param: any) {
        navigate(`/movimentacao/devolucaoNaoUrgente/${param}`);
    }

    useEffect(() => {   
        async function loadDevolutionsNotUrgency() {
            const response = await api.get('/movimentacao/devolucaoNaoUrgente');

            setMovement(response.data);
        }

        loadDevolutionsNotUrgency();

    }, [])

    return (
        <div className='container'>
            <p id='textDevolution'>Selecione o equipamento que deseja devolver:</p>
            <div className='content' id='content-list'>
                <ul className='movementUrgency-list'>
                {movement.map(movement => (
                    <li key={movement._id} id="liDevolution">
                        <strong>Equipamento: </strong><span>{movement.equipament}</span>
                        <strong>Responsável pela Retirada: </strong><span>{movement.responsibleWithDraw}</span>
                        <strong>Data/Hora da Retirada: </strong><span>{movement.dateHourWithdraw}</span>
                        <strong>Urgência: </strong><span>{movement.emergency}</span>
                        <strong>Patrimônio: </strong><span>{movement.patrimony}</span>
                        <strong>Responsável pela Devolução: </strong><span style={{ color: movement.responsibleDevolution ? '#2a2a2a' : 'red' }}>{movement.responsibleDevolution ? movement.responsibleDevolution : 'AGUARDANDO DEVOLUÇÃO'}</span>
                        <strong>Data/Hora da Retirada:  </strong><span style={{ color: movement.responsibleDevolution ? '#2a2a2a' : 'red' }}>{movement.dateHourDevolution ? movement.responsibleDevolution : 'AGUARDANDO DEVOLUÇÃO'}</span>
                        <Link to={`/movimentacao/devolucaoNaoUrgente/${movement._id}`}><button className='btn' id='btnDevolution'>Realizar Devolução</button></Link>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}