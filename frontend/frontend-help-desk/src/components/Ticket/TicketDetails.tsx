import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChamadoById } from '../../api/chamado';

interface Chamado {
    id: string;
    titulo: string;
    descricao: string;
    prioridade: string;
    statusChamado: string;
    patrimonioModel: { id: string };
    usuarioModel: { id: string; nome: string };
    // Adicione outros campos conforme necessário
}

const TicketDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [chamado, setChamado] = useState<Chamado | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChamado = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token não encontrado');
                return;
            }

            try {
                const response = await getChamadoById(token, id!);
                setChamado(response.data);
            } catch (error) {
                setError('Erro ao carregar os detalhes do chamado');
            } finally {
                setLoading(false);
            }
        };

        fetchChamado();
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Detalhes do Chamado</h1>
            {chamado ? (
                <div>
                    <h2>{chamado.titulo}</h2>
                    <p>{chamado.descricao}</p>
                    <p>Prioridade: {chamado.prioridade}</p>
                    <p>Status: {chamado.statusChamado}</p>
                    <p>Patrimônio ID: {chamado.patrimonioModel.id}</p>
                    <p>Usuário: {chamado.usuarioModel.nome}</p>
                    {/* Adicione outros detalhes conforme necessário */}
                </div>
            ) : (
                <p>Chamado não encontrado</p>
            )}
        </div>
    );
};

export default TicketDetails;