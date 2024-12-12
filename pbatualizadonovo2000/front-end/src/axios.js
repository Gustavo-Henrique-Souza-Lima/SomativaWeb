// SRC/AXIOS.JS
import axios from 'axios';

// CRIAÇAO DE UMA INSTANCIA DO AXIOS COM A CONFIGURAÇAO BASE
const api = axios.create({
    baseURL: 'http://localhost:5000/api', //URL BASE DO BACK-END
});

// INTERCEPTOR PARA ADICIONAR O TOKEN JWT EM TODAS AS REQUISIÇOES
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;