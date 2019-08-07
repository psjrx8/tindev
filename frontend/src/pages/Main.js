import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css'

import api from '../services/api';

import logo from '../images/logo.svg'; //Import da logo
import like from '../images/like.svg'; //Import imagem de like
import dislike from '../images/dislike.svg'; //Import imagem de dislike

export default function Main( { match } ) { // Propriedade match recupera todos os parâmetros enviados na rota
    
    // Utilizar useState toda vez que a variável em tela for manipulavel
    const [ users, setUsers ] = useState([]);

    // Método para fazer a chamada a api assim que for chamado em tela
    // Recebe dois parâmetros, a função que quer executar e quando quer executar a função
    // Passando o segundo parâmetro como um array de variáveis, ele vai executar para toda alteração daquela variável.
    // Sem passar parâmetro, ele executa apenas uma vez.
    useEffect(() => {
        async function loadUsers(){ // Evita-se utilizar o async na useEffect
            const response = await api.get('/devs', { 
                headers: {
                    user: match.params.id,
                }
            })
            setUsers(response.data);
        }

        loadUsers();
    }, [match.params.id])
    
    async function handleLike(id){
        await api.post('/devs/' + id + '/likes', null , { 
            headers: {
                user: match.params.id,
            }
        })
        //users só pode ser alterado através da função setUsers.
        setUsers(users.filter( user => user._id !== id)); // Filtrando array de usuarios para não receber o mesmo usuário novamente.
    }

    async function handleDislike(id){
        await api.post('/devs/' + id + '/dislikes', null , { 
            headers: {
                user: match.params.id,
            }
        })
        //users só pode ser alterado através da função setUsers.
        setUsers(users.filter( user => user._id !== id)); // Filtrando array de usuarios para não receber o mesmo usuário novamente.
    }

    return(
        <div className="main-container">
            <Link to="/" > {/* Redireciona para tela principal */}
                <img src={logo} alt="Tindev"/>
            </Link>
            { users.length > 0 ? (
                <ul>
                    { users.map( user => ( //Usado para percorer o array users e preencher a variável user
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button type="button" onClick={() => handleLike(user._id) /* Colocando a função diretamente ela dispara assim que renderiza a página */ } id="like">
                                    <img src={like} alt="Like"/>
                                </button>
                                <button type="button"onClick={() => handleDislike(user._id)} id="dislike">
                                    <img src={dislike} alt="Dislike"/>
                                </button>
                            </div>
                        </li>
                    ))}
                    
                </ul>
            ): (
                <div className="empty">Acabou :( </div>
            )}
        </div>
    )
}