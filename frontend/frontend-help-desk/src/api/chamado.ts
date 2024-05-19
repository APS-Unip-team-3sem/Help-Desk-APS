import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000',
});

export const addChamado = (token: string, chamadoData: any) =>
    api.post('/chamado', chamadoData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const updateChamado = (token: string, chamadoId: string, chamadoData: any) =>
    api.put(`/chamado/${chamadoId}`, chamadoData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const getChamadoById = (token: string, chamadoId: string) =>
    api.get(`/chamado/${chamadoId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const getChamadoByUser = (token: string) =>
    api.get('/chamado', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const getChamado = (token: string, chamadoId: string) =>
    api.get(`/chamado/${chamadoId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const deleteChamado = (token: string, chamadoId: string) =>
    api.delete(`/chamado/${chamadoId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const initChamado = (token: string, chamadoId: string) =>
    api.put(`/chamado/i/${chamadoId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const closeChamado = (token: string, chamadoId: string) =>
    api.put(`/chamado/e/${chamadoId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });