import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from './components/login';
import { SignUp } from './components/signup';
import { DevolutionUrgency } from './components/devolutionUrgency';

export function RoutesFront() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}></Route>
                <Route path='/cadastrar' element={<SignUp/>}></Route>
                <Route path='/movimentacao/devolucaoUrgente' element={<DevolutionUrgency/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}