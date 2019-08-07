const { Schema, model } = require('mongoose'); // Forma de utilizar as dependencias sem ter que atribuir a uma variável.

const DevSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        require:true,
    },
    likes: [{ //likes é do tipo array (pode ter vários elementos)
        type: Schema.Types.ObjectId, // Faz referencia ao tipo de dados de uma coluna
        ref: 'Dev' // Referencia a uma tabela estrangeira (neste caso, auto-referência)
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
}, {
    timestamps: true //Criar uma coluna de forma automática de createdAt, e updatedAt
});

module.exports = model('Dev', DevSchema); //Exporta modelo criado