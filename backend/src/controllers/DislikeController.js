const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        // console.log(req.params.devId);
        // console.log(req.headers.user);

        const { devId } = req.params; // Recupera parâmetros enviados via url (:devId)
        const { user } = req.headers; // Recupera valor definido no header

        // Busca o usuário no banco pelo id
        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        // Verifica se a ação é para um usuário existente
        if (!targetDev){
            return res.status(400).json('Dev not exists.');
        }

        loggedDev.dislikes.push(targetDev._id); // Inclui o dislike no array de dislikes do usuário logado 

        await loggedDev.save(); // Salva a informação no banco (persist)

        return res.json(loggedDev)
    }
};