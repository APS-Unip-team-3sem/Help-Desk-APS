import axios from 'axios';

const API_URL = 'http://localhost:9000/';

// export const login = async (nome: string, senha: string) => {
//     try {
//         const response = await axios.post(`${API_URL}/auth/login`, { nome, senha });
//         return response.data;
//     } catch (error) {
//         console.error("Erro ao fazer login", error);
//         throw error;
//     }
// };

export const login = async (nome: string, senha: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { nome, senha });
        return response.data; // Retorna a data diretamente
    } catch (error) {
        console.error("Erro ao fazer login", error);
        throw error;
    }
};

export const register = async (nome: string, senha: string, tipo: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, { nome, senha, tipo });
        return response.data;
    } catch (error) {
        console.error("Erro ao fazer registro", error);
        throw error;
    }
};