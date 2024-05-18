import axios from 'axios';

const API_URL = 'http://localhost:9000/auth';

// Função para login
export const login = async (nome: string, senha: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { nome, senha });
        return response.data; // Retorna a data diretamente
    } catch (error) {
        console.error('Erro de login:', error);
        throw error;
    }
};

// Função para registro
export const register = async (nome: string, senha: string, tipo: string) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { nome, senha, tipo });
        return response.data;
    } catch (error) {
        console.error('Erro de registro:', error);
        throw error;
    }
};

// Configuração básica do Axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Função para setar o token no header
const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token); // Salva o token no localStorage
    } else {
        delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('token'); // Remove o token do localStorage
    }
};

// Função para logout
const logout = () => {
    setAuthToken(null);
};

// Função para fazer requisições autenticadas
const getProtectedData = async () => {
    try {
        const response = await api.get('/protected'); // Altere para a rota protegida que deseja acessar
        return response.data;
    } catch (error) {
        console.error('Protected route error:', error);
        throw error;
    }
};

export { logout, getProtectedData, setAuthToken, api };














// const login = async (nome: string, senha: string) => {
//     try {
//         const response = await fetch('http://localhost:9000/auth/login', {
//             method: 'POST',
//             mode: 'cors',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ nome, senha }),
//         });
        
//         if (!response.ok) {
//             throw new Error('Erro ao fazer login: ' + response.statusText);
//         }
        
//         const data = await response.json();
//         console.log(data);
//         return data;
//     } catch (error) {
//         // Tratamento de erro (pode incluir exibição de mensagem de erro)
//         console.error(error);
//         throw error;
//     }
// };

// export { login };














// import axios from 'axios';

// const API_URL = 'http://localhost:9000';

// // export const login = async (nome: string, senha: string) => {
// //     try {
// //         const response = await axios.post(`${API_URL}/auth/login`, { nome, senha });
// //         return response.data;
// //     } catch (error) {
// //         console.error("Erro ao fazer login", error);
// //         throw error;
// //     }
// // };

// export const login = async (nome: string, senha: string) => {
//     try {
//         const response = await axios.post(`${API_URL}/auth/login`, { nome, senha });
//         return response.data; // Retorna a data diretamente
//     } catch (error) {
//         console.error("Erro ao fazer login", error);
//         throw error;
//     }
// };

// export const register = async (nome: string, senha: string, tipo: string) => {
//     try {
//         const response = await axios.post(`${API_URL}/auth/register`, { nome, senha, tipo });
//         return response.data;
//     } catch (error) {
//         console.error("Erro ao fazer registro", error);
//         throw error;
//     }
// };












// const api = axios.create({
//     baseURL: 'http://localhost:9000/auth',
// });

// export const login = (nome: string, senha: string) =>
//     api.post('/login', { nome, senha });

// export const register = (nome: string, senha: string, tipo: string) =>
//     api.post('/register', { nome, senha, tipo });




