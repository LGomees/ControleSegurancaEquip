import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import "../assets/index.css"
import "../assets/devolutionUrgency.css"
import api from '../services/api'


export function DevolutionUrgencyId() {
    const [movement, setMovement] = useState<any[]>([]);
    const [objectDetected, setObjectDetected] = useState('')
    const [successDetec, setSuccessDetec] = useState(false)
    const [startDetection, setStartDetection] = useState(false)
    const [sameEquip, setSameEquip] = useState(true)
    const [alreadyUpdated, setAlreadyUpdated] = useState(false)

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
        
        const user_name = localStorage.getItem('name');
        
        const response = await api.put('/movimentacao/finalizaDevolucaoUrgente', {
            dateHourDevolution,
            patrimony,
            resposibleDevolution: user_name
        },
        { 
            headers: { _id, user_name  } 
        });
        
        setAlreadyUpdated(true)
        window.location.reload(false);
    }

    const navigate = useNavigate();

    function finishDevolution() {
        navigate("/");
    }


    useEffect(() => {
        document.addEventListener('keydown', detectKeyPress, true);
    }, []);

    const detectKeyPress = (e) => {
        if (e.key === "Enter") {
            executeObjRec()
            setStartDetection(true)
        }
        if (e.key === "q" || e.key === "Q" ) {
            setSuccessDetec(true)
        }
    };


    const executeObjRec = async () => {
        const response = await api.post('/objectDetection');
        if (response.data == 'MUG' && 'Caneca' == movement.equipament) {
            const obj = 'Caneca'
            setObjectDetected(obj);
        } else if (response.data == 'GLASSES' && 'Óculos' == movement.equipament) {
            const obj = 'Óculos'
            setObjectDetected(obj);
        } else if (response.data == 'HEADSET' && 'Fone de Ouvido'== movement.equipament){
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
                    <div>
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
                </>
                ) : (
                    <div>
                        {startDetection ? (
                            <div>
                                {successDetec ? (  
                                    <div className='content'>
                                        {sameEquip ? ( 
                                            <>
                                                {movement.responsibleDevolution ? 
                                                    <p></p>
                                                    :
                                                    <p id='textAsk'>Digite o patrimonio do equipamento que está sendo retirado</p>
                                                }
                            
                                                <div className='content' id='content-list'>
                                                {movement.responsibleDevolution ? (
                                                    <p></p>
                            
                                                ) : (
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
                                                )}
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
                                            </>
                                            ) : (
                                                <>
                                                    <div className='content' style={{ width: '90%' }}>
                                                        <p id="textDevolution">Equipamento {objectDetected} não é o mesmo da retirada. Favor reiniciar a movimentação.</p>   
                                                    </div>
                                                    <button className='btn' id='btnDevolutionFinal' style={{ backgroundColor: movement.responsibleDevolution ? '#35ad47' : '#2B676F'  }} onClick={finishDevolution}>
                                                            Finalizar Devolução
                                                    </button>
                                                </>

                                            )}
                                    </div>
                                ) : (
                                    <div id="divRunning">
                                        <p id="textGuide">Posicione o equipamento na câmera. Após a leitura, pressione 'q' para continuar</p>   
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p id="textoWebcam">Pressione ENTER para começar a verificação do equipamento.</p>   
                        )}
                    </div>
                )}
        </div>
    );
}