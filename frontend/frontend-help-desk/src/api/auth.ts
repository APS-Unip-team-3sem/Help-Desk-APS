import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000/auth',
});

export const login = (nome: string, senha: string) =>
    api.post('/login', { nome, senha });

export const register = (nome: string, senha: string, tipo: string) =>
    api.post('/register', { nome, senha, tipo });