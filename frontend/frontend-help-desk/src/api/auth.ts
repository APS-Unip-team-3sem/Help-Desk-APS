import axios from 'axios';

interface LoginResponse {
    token: string;
    nome: string;
    tipo: string;
    
}

export const login = async (nome: string, senha: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post('http://localhost:9000/auth/login', {
            nome: nome,
            senha: senha
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao fazer login');
    }
};

interface RegisterResponse {
    token: string;
    nome: string;
    tipo: string;
    
}

export const register = async (nome: string, senha: string, tipo: string): Promise<RegisterResponse> => {
    try {
        const response = await axios.post('http://localhost:9000/auth/register', {
            username: nome,
            password: senha,
            userType: tipo
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao criar conta');
    }
};