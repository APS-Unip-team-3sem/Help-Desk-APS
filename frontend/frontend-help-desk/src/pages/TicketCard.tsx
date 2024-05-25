import React from 'react';
import { Ticket } from '../types/ticket';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

interface TicketCardProps {
    ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
    // Formatando as datas para uma string formatada
    const createdAt = ticket.created_at.toLocaleDateString();
    const updatedAt = ticket.updated_at.toLocaleDateString();

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

    return (
        <Link to={`/ticket/${ticket.id}`} className="block md:inline-block">
            <div className="bg-white p-4 rounded border border-gray-200 relative md:flex md:justify-between">
                <div>
                    <h3 className="text-lg font-semibold mb-2">
                    <FontAwesomeIcon icon={faGlobe} className="mr-2" /> {ticket.title} #{truncateId(ticket.id.toString())} {/* Convertendo o ID para string */}
                    </h3>
                    <div className="text-sm text-gray-500 mb-2">Criado em: {createdAt}</div>
                    <div className="text-sm text-gray-500 mb-4">Atualizado em: {updatedAt}</div>
                </div>
                <span
                    className={`md:absolute md:top-4 md:right-4 text-gray-500 text-xs px-4 py-1 rounded-full ${getStatusColorClass(ticket.status)}`}
                >
                    {ticket.status}
                </span>
            </div>
        </Link>
    );
};

export default TicketCard;