import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000',
});

export const addChamado = (token: string, chamadoData: any) =>
    api.post('/chamado/add', chamadoData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const updateChamado = (token: string, chamadoId: string, chamadoData: any) =>
    api.put(`/chamado/put/${chamadoId}`, chamadoData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const getChamadoByUser = (token: string) =>
    api.get('/chamado/getby', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });