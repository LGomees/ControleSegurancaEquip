import { useNavigate } from 'react-router-dom'
import styled from "styled-components";

import "../assets/index.css"
import "../assets/askWorD.css"

export function  WithdrawUrgency() {


    const Button = styled.button`
        background-color: #2B676F;
        color: white;
        font-size: 20px;
        padding: 10px 60px;
        border-radius: 25px;
        border: none;
        margin: 10px 0px;
        cursor: pointer;

        &:hover {
            background-color: #31727a;
            opacity: 0.9;
            cursor: pointer;
    `;

    return (
        <div className='container'>
            <div className='content'>
            <p id='textAsk'>CHAMAR COMPONENTE DE OBJECT DETECTION e depois já enviar os dados urgentes para o banco</p>
            </div>
        </div>
    );
}