import axios from 'axios';

// Realiza configuração da api
const api = axios.create({
    baseURL: "http://localhost:3333"

});

export default api;