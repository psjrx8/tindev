import React, { useState } from 'react';

import './Login.css'

import api from '../services/api';

import logo from '../images/logo.svg'; //Import da logo

// Exporta componente para uso
export default function Login ( { history } ){ // Componentes do tipo rota, herdam o componente history
    // Conceito de estado
    // useState vai retornar um vetor de duas posições, usando desestruturação, atribuimos ao conteúdo de userneame e setUsername
    const [ username, setUsername ] = useState('');

    // Propriedade de submit do formulário
    async function handleSubmit(e) { // Submit recebe um evento
        e.preventDefault(); // Previne o comportamento default de direcionar para outra página
        
        const response = await api.post( '/devs', { username } ); // username poderia ser passado da seguinte forma => "username": username, nas como tem o mesmo nome, utiliza-se short sintaxe

        // console.log(response);

        const { _id } = response.data; // Recupera id da resposta da api

        history.push('/dev/' + _id); // Utiliza a propriedade history para o redirecionamento de página passando o parâmetro de id
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} >
                <img src={logo} alt="Tindev"/>
                <input 
                    placeholder="Digite seu usuário no GitHub" 
                    value={username} 
                    onChange={ e => setUsername(e.target.value) /* Função que vai receber um evento e alterar o username */} 
                />
                <button type="submit">Enviar</button>
            </form>
                
        </div>
    )
}