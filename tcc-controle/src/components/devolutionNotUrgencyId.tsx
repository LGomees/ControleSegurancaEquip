import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import "../assets/index.css"
import "../assets/devolutionUrgency.css"
import api from '../services/api'


export function DevolutionNotUrgencyId() {
    const [movement, setMovement] = useState<any[]>([]);
    const [objectDetected, setObjectDetected] = useState('')
    const [successDetec, setSuccessDetec] = useState(false)
    const [startDetection, setStartDetection] = useState(false)
    const [sameEquip, setSameEquip] = useState(true)
    const [alreadyUpdated, setAlreadyUpdated] = useState(false)

    const { _id } = useParams(); 
    
    const today = new Date();
    let dateHourDevolution = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' ' + (today.getHours()<10?'0':'') + today.getHours() + ':' + (today.getMinutes()<10?'0':'') + today.getMinutes();

    useEffect(() => {   
        async function loadDevolutionsNotUrgency() {
            const response = await api.get('/movimentacao/devolucaoNaoUrgenteId/', {
                headers: { _id: _id } 
            });
            setMovement(response.data);
        }

        loadDevolutionsNotUrgency();

    }, [])

    async function updateDevolution() {

        const user_name = localStorage.getItem('name');

        const response = await api.put('/movimentacao/finalizaDevolucaoNaoUrgente', {
            dateHourDevolution,
            resposibleDevolution: user_name
        },
        { 
            headers: { _id, user_name  } 
        });

        navigate("/finalizado");
    }

    const navigate = useNavigate();

    function finishDevolution() {
        setAlreadyUpdated(false)
        navigate("/");
    }


    useEffect(() => {
        document.addEventListener('keydown', detectKeyPress, true);
    }, []);

    const detectKeyPress = (e) => {
        if (e.key === "e" || e.key === "E") {
            executeObjRec()
            setStartDetection(true)
        }
        if (e.key === "q" || e.key === "Q" ) {
            setSuccessDetec(true)
        }
    };

    const executeObjRec = async () => {
        const response = await api.post('/objectDetection');
        const equipamentName = movement.equipament
        if (response.data == 'MUG' && 'Caneca' == equipamentName) {
            const obj = 'Caneca'
            setObjectDetected(obj);
        } else if (response.data == 'GLASSES' && 'Óculos' == equipamentName) {
            const obj = 'Óculos'
            setObjectDetected(obj);
        } else if (response.data == 'HEADSET' && 'Fone de Ouvido'== equipamentName){
            const obj = 'Fones de Ouvido'
            setObjectDetected(obj);
        } else {
            setSameEquip(false);
        }
    };

    return (
        <div className='container'>
            {alreadyUpdated ? (
                    <>
                        <p id='textDevolution'>Detalhes da retirada:</p>
                        <div className='content' id='content-list'>
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
                    </>
                    ) : (
                    <div>
                        {startDetection ? (
                            <div>
                                {successDetec ? (  
                                    <div className='content'>
                                        {sameEquip ? ( 
                                            <>
                                                    <p id='textDevolution'>Detalhes da retirada:</p>
                                                    <div className='content' id='content-list'>
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
                                            </>  ) : ( 
                                                    <>
                                                        <div className='content' style={{ width: '90%' }}>
                                                            <p id="textDevolution">Equipamento {objectDetected} não é o mesmo da retirada. Favor reiniciar a movimentação.</p>   
                                                        </div>
                                                        <button className='btn' id='btnDevolutionFinal' style={{ backgroundColor: movement.responsibleDevolution ? '#35ad47' : '#2B676F'  }} onClick={finishDevolution}>
                                                                Finalizar Devolução
                                                        </button>
                                                    </>
                                                )}
                                    </div> ) : ( 
                                            <div id="divRunning">
                                                <p id="textGuide">Posicione o equipamento na câmera. Após a leitura, pressione a tecla 'Q' para continuar</p>   
                                            </div>
                                )}

                            </div>

                            ) : (
                                <p id="textoWebcam">Pressione 'E' para começar a verificação do equipamento.</p>   
                            )}  
                    </div>     
                )}
        </div>
    );
}