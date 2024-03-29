import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import "../assets/index.css"
import "../assets/devolutionUrgency.css"
import api from '../services/api'


export function DevolutionUrgency() {
    const [movement, setMovement] = useState<any[]>([]);

    const navigate = useNavigate();
    function redirectToDetails(param: any) {
        navigate(`/movimentacao/devolucaoUrgente/${param}`);
    }

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

    const saveEquipament = (equip: string) => {
        localStorage.setItem('equip', equip);
    };

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
                        <Link to={`/movimentacao/devolucaoUrgente/${movement._id}`}><button className='btn' id='btnDevolution' onClick={() => saveEquipament(movement.equipament)}>Realizar Devolução</button></Link>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}