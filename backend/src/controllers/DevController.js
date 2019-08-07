const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res){
        const { user } = req.headers; // Recupera valor definido no header

        const loggedDev = await Dev.findById( user );

        // Realiza consulta no banco de dados com as condições abaixo
        const users = await Dev.find({
            $and: [ // Determina um and entre as condições
                { _id: { $ne: user } }, // Not equal ao id (user)
                { _id: { $nin: loggedDev.likes } }, // Not in array de id's (likes)
                { _id: { $nin: loggedDev.dislikes} } // Not in array de id's (dislikes)
            ]
        })

        return res.json(users);
    },
    async store(req, res) { // O async é obrigatório por causa da função assíncrona
        //console.log(req.body.username);
        const { username } = req.body; //Pega só o username do corpo enviado no post

        const userExists = await Dev.findOne({ user: username });

        if (userExists){
            return res.json(userExists);
        }

        // O axios.get é assíncrono, por este motivo o retorno não acontece acompanhando o tempo de escução
        // Utiliza-se o await para informar que o método é assíncrono e precisa declarar o "async" antes da store
        const response = await axios.get('https://api.github.com/users/' + username); //Retorna os dados da API do github

        // Atribui às constantes name, bio e avatar seues respectivos valores.
        const { name, bio, avatar_url: avatar } = response.data

        // Cria um dev conforme model definido previamente.
        const dev = await Dev.create ({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev);
    }
};

// Segundo as boas práticas, não se deve ter mais do que os 5 métodos fundamentais em um controller
// Index: Lista
// Show: Apresentar
// Store: Guardar
// Update: Atualizar
// Delete: Excluir 