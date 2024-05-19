import axios from 'axios';

const API_URL = 'http://localhost:9000/auth';

// Função para login
export const login = async (nome: string, senha: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { nome, senha });
        const { token, user } = response.data; 
        setAuthToken(token); 
        localStorage.setItem('user', JSON.stringify(user)); 
        return { token, user };
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

// // Função para salvar o nome do usuario no localStorage após o login
// export const setUserNome = (nome: string) => {
//     localStorage.setItem('nome', nome);
// };

// Função para logout
const logout = () => {
    setAuthToken(null);
};

// Função para fazer requisições autenticadas
const getProtectedData = async () => {
    try {
        const token = localStorage.getItem('token'); 
        if (!token) {
            throw new Error('Token not found');
        }
        setAuthToken(token); 
        const response = await api.get('/dashboard');
        return response.data;
    } catch (error) {
        console.error('Protected route error:', error);
        throw error;
    }
};

export { logout, getProtectedData, setAuthToken, api };
