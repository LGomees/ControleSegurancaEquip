import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import "../assets/index.css"
import api from '../services/api'

export function SignUp() {

    const [name, setName] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event: { preventDefault: () => void }) {
      event.preventDefault();
      
      const response = await api.post('/sessions', { name })
  
      const { _id } = response.data;
  
      localStorage.setItem('user', _id);

      console.log(name);

      navigate("/"); // Quando cadastrar o funcionário, redireciona para a página X.

    }

    return (
        <div className='container'>
            <div className='content'>
                <p>Insira o nome da pessoa a ser analisada</p>
                <form onSubmit={handleSubmit}>
                    <input 
                    id='name' 
                    placeholder='Nome'
                    value={name}
                    onChange={event => setName(event?.target.value)}
                    ></input>
                    <button className='btn'>Criar</button>
                </form>
            </div>
        </div>
        
    );
}