const express = require('express'); //Função que quando chamada cria novos servidores.
const mongoose = require('mongoose'); //Facilitador do uso de comandos no banco de dados.
const cors = require('cors'); // Permite que a aplicação seja acessada por qualquer endereço.

const routes = require('./routes'); //Importa as rotas de arquivo próprio [routes.js] dentro da mesma pasta (./)

const server = express(); //Cria servidor

mongoose.connect('mongodb+srv://oministack:oministack@cluster0-qshet.mongodb.net/oministack8?retryWrites=true&w=majority', {
    useNewUrlParser: true //O mongoose aceita varios formatos de url. Neste parâmetro indicamos que estamos usando o novo formato.
});

server.use(cors());
server.use(express.json()); //Indica que o retorno das requisições será efetuado em JSON
server.use(routes); //Configuração dentro de outro arquivo/módulo

server.listen(3333); //Atribui a porta do servidor

