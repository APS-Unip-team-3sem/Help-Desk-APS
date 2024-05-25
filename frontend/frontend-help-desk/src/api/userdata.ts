import axios from 'axios';

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

export { getAllUsers, getUserByName };