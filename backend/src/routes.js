const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router(); // Função específica para rotas


// Metodos HTTP - Principais
// GET: Buscar informação
// POST: Criar registro ou entidade
// PUT: Editar registro ou entidade (Não é padrão HTML)
// DELETE: Excluir registro ou entidade (Não é padrão HTML)

// routes.get('/', (req, res) => { //Conceito de arrow function (parâmetros: requisição e resposta)
//     var nome = req.query.name; //Recuperar parâmetros da url. Ex.: url:port\?variavel=Texto => req.query.variavel => Texto
//     // return res.send(`Hello World ${nome}`);
//     return res.json({ message: `Hello World ${nome}`}); // Para utilizar o json é necessário passar o conteúdo em formato de objeto
// }); //Endereço que será ouvido inicialmente. Ao atribuir apenas / indica endereço raiz

// routes.post('/devs', (req, res) => {
//     console.log(req.body); //Objeto que recebe o conteúdo das requisições do tipo post
//     return res.json(req.body);
// })

routes.get('/devs', DevController.index );
routes.post('/devs', DevController.store );

routes.post('/devs/:devId/likes', LikeController.store );
routes.post('/devs/:devId/dislikes', DislikeController.store );

module.exports = routes; //Exporta para outros arquivos