import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000',
});
// Endpoint para buscar todos os usuários

const getAllUsers = async () => {
    try {
        const response = await axios.get('http://localhost:9000/usuario/getall');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw error;
    }
};


// Endpoint para buscar usuário por nome e exibir Id

const getUserByName = async (nome: string) => {
    try {
        const response = await axios.get(`http://localhost:9000/usuario/${nome}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw error;
    }
};

// Para buscar informações de usuário por id:

export const getUserById = (token: string, id: string) =>
    api.get(`/usuario/g/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

// // Endpoint para buscar informações do usuário logado
// export const getLoggedUser = async (token: string) => {
//     api.get(`/usuario/u`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };

// Endpoint para buscar informações do usuário logado
export const getLoggedUser = async (token: string) => {
    try {
        const response = await api.get(`/usuario/u`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Erro ao buscar informações do usuário logado:', error);
        throw error;
    }
};

export { getAllUsers, getUserByName };