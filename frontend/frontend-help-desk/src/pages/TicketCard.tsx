import React, { useEffect, useState } from 'react';
import { Ticket } from '../types/ticket';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { getChamadoById } from '../api/chamado';
import moment from 'moment';

// interface TicketCardProps {
//     ticket: Ticket;
// }

const TicketCard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [chamado, setChamado] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<moment.Moment | null>(null);
    const [currentTime, setCurrentTime] = useState<moment.Moment>(moment());
    // const [newComment, setNewComment] = useState<string>('');
    // const [comments, setComments] = useState<string[]>([]);

    // Formatando as datas para uma string formatada
    // const createdAt = ticket.created_at.toLocaleDateString();
    // const updatedAt = ticket.updated_at.toLocaleDateString();

    // Função para truncar o ID do ticket
    const truncateId = (id: string) => {
        return id.length > 5 ? `${id.substring(0, 5)}...` : id;
    };

    // Função para retornar a classe de cor com base no status
    const getStatusColorClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'aberto':
                return 'bg-green-200 text-green-800';
            case 'fechado':
                return 'bg-red-200 text-red-800';
            case 'em andamento':
                return 'bg-yellow-200 text-yellow-800';
            default:
                return '';
        }
    };

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
                setStartTime(moment(response.data.abertura).subtract(3, 'hours')); 
            } catch (error) {
                setError('Erro ao carregar os detalhes do chamado');
            } finally {
                setLoading(false);
            }
        };

        fetchChamado();
    }, [id]);

    return (
        <Link to={`/ticket/${id}`} className="block md:inline-block">
            {chamado && (
                <div className="bg-white p-4 rounded border border-gray-200 relative md:flex md:justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">
                        <FontAwesomeIcon icon={faGlobe} className="mr-2" /> {chamado.titulo}  
                        </h3>
                        <div className="text-sm text-gray-500 mb-2">Criado em: {moment(chamado.abertura).add(3, 'hours').format('DD/MM/YYYY HH:mm')}</div>
                        <div className="text-sm text-gray-500 mb-4">Atualizado em: {moment(chamado.abertura).add(3, 'hours').format('DD/MM/YYYY HH:mm')}</div>
                    </div>
                    <span
                        className={`md:absolute md:top-4 md:right-4 text-gray-500 text-xs px-4 py-1 rounded-full ${getStatusColorClass(chamado.statusChamado)}`}
                    >
                        {chamado.statusChamado}
                    </span>
                </div>
            )}
        </Link>
    );
};

export default TicketCard;