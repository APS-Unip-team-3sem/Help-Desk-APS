import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { getAllChamados } from '../api/chamado';
import moment from 'moment';

const TicketCard: React.FC = () => {
    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChamados = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado');
                return;
            }

            try {
                const response = await getAllChamados(token!);
                if (response.data) {
                    setChamados(response.data);
                } else {
                    console.error('Erro ao carregar os chamados');
                }
            } catch (error) {
                console.error('Erro ao carregar os chamados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChamados();
    }, []);

    if (loading) {
        return <div className="text-center mt-8">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    }

    const getStatusColorClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'aberto':
                return 'bg-green-200 text-green-800';
            case 'fechado':
                return 'bg-red-200 text-red-800';
            case 'andamento':
                return 'bg-yellow-200 text-yellow-800';
            default:
                return '';
        }
    };

    // Invertendo a ordem dos chamados para exibir os mais recentes primeiro
    const reversedChamados = [...chamados].reverse();

    return (
        <div>
            {reversedChamados.map(chamado => (
                <div key={chamado?.id} className="mb-4">
                    <Link to={`/ticket/${chamado?.id}`}>
                        <div className="bg-white p-4 rounded border border-gray-200 relative flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    <FontAwesomeIcon icon={faGlobe} className="mr-2" /> {chamado.titulo}
                                </h3>
                                <div className="text-sm text-gray-500 mb-2">Criado em: {moment(chamado.abertura).format('DD/MM/YYYY HH:mm')}</div>
                                {/* <div className="text-sm text-gray-500 mb-4">Atualizado em: {moment(chamado.atualizacao).format('DD/MM/YYYY HH:mm')}</div> */}
                            </div>
                            {/* ${getStatusColorClass(chamado.statusChamado)} */}
                            <span
                                className={`absolute top-4 right-4 text-gray-500 text-xs px-4 py-1 rounded-full ${getStatusColorClass(chamado.statusChamado)}`}
                            >
                                {chamado.statusChamado}
                            </span>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default TicketCard;