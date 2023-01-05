import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import "../assets/index.css"
import "../assets/devolutionUrgency.css"
import api from '../services/api'


export function DevolutionUrgencyId() {
    const [movement, setMovement] = useState<any[]>([]);

    useEffect(() => {   
        async function loadDevolutionsUrgency() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/movimentacao/devolucaoUrgente', {
                headers: { user_id }
            });

            setMovement(response.data);
        }

        loadDevolutionsUrgency();

    }, [])

    return (
        <div className='container'>
            <p id='textDevolution'>Selecione o equipamento que deseja devolver</p>
            <div className='content' id='content-list'>
                <ul className='movementUrgency-list'>
                {movement.map(movement => (
                    <li key={movement._id}>
                        <strong>Responsável pela Retirada: </strong><span>{movement.responsibleWithDraw}</span>
                        <strong>Data/Hora da Retirada: </strong><span>{movement.dateHourWithdraw}</span>
                        <strong>Equipamento: </strong><span>{movement.equipament}</span>
                        <strong>Urgência: </strong><span>{movement.emergency}</span>
                        <strong>Patrimônio: </strong><span>{movement.patrimony}</span>
                        <strong>Responsável pela Devolução: </strong><span style={{ color: movement.responsibleDevolution ? '#2a2a2a' : 'red' }}>{movement.responsibleDevolution ? movement.responsibleDevolution : 'AGUARDANDO DEVOLUÇÃO'}</span>
                        <strong>Data/Hora da Retirada:  </strong><span style={{ color: movement.responsibleDevolution ? '#2a2a2a' : 'red' }}>{movement.dateHourDevolution ? movement.responsibleDevolution : 'AGUARDANDO DEVOLUÇÃO'}</span>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}