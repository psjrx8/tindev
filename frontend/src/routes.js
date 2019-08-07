import React from 'react';
import { BrowserRouter, Route } from "react-router-dom"; // Rota separada por barra e a rota

import Login from './pages/Login';
import Main from './pages/Main';

// Por padrão, o react não verifica se o path é exatamente igual para isso devemos colocar o exact
export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} /> 
            <Route path="/dev/:id" component={Main} />
        </BrowserRouter>
    );
}