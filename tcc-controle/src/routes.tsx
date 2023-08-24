import React, {lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Roda funcionamento Webcam
import { Home } from './components/home';

//Conectar identificação do rosto com pessoa cadastrada (ATUALMENTE)
import { SignUp } from './components/signup';

//Pergunta se é RETIRADA ou DEVOLUÇÃO
import { AskWorD } from './components/askWorD';

//Retirada
import { AskWithdrawUrg } from './components/askWithdrawUrg';
import { WithdrawUrgency } from './components/withdrawUrgency';
import { WithdrawNotUrgency } from './components/withdrawNotUrgency';

//Devolução
import { AskDevolutionUrg } from './components/askDevolutionUrg';
import { DevolutionUrgency } from './components/devolutionUrgency';
import { DevolutionUrgencyId } from './components/devolutionUrgencyId';
import { DevolutionNotUrgency } from './components/devolutionNotUrgency';
import { DevolutionNotUrgencyId } from './components/devolutionNotUrgencyId';

//Finalização
import { Finish } from './components/finish';

export function RoutesFront() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/cadastrar' element={<SignUp/>}></Route>
                <Route path='/movimentacao' element={<AskWorD/>}></Route>
                <Route path='/movimentacao/retirada' element={<AskWithdrawUrg/>}></Route>
                <Route path='/movimentacao/retiradaUrgente' element={<WithdrawUrgency/>}></Route>
                <Route path='/movimentacao/retiradaNaoUrgente' element={<WithdrawNotUrgency/>}></Route>
                <Route path='/movimentacao/devolucao' element={<AskDevolutionUrg/>}></Route>
                <Route path='/movimentacao/devolucaoUrgente' element={<DevolutionUrgency/>}></Route>
                <Route path='/movimentacao/devolucaoUrgente/:_id' element={<DevolutionUrgencyId/>}></Route>
                <Route path='/movimentacao/devolucaoNaoUrgente' element={<DevolutionNotUrgency/>}></Route>
                <Route path='/movimentacao/devolucaoNaoUrgente/:_id' element={<DevolutionNotUrgencyId/>}></Route>
                <Route path='/finalizado' element={<Finish/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}