import React from 'react';
import { Ticket } from '../types/ticket';
import { Link } from 'react-router-dom';

interface TicketCardProps {
    ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
    // Formatando as datas para uma string formatada
    const createdAt = ticket.created_at.toLocaleDateString();
    const updatedAt = ticket.updated_at.toLocaleDateString();

    return (
        <Link to={`/ticket/${ticket.id}`}>
            <div className="bg-white p-4 rounded border border-gray-200">
                <h3 className="text-lg font-semibold">{ticket.title} #{ticket.id}</h3>
                <span className="text-sm text-gray-500">{ticket.status}</span>
                {/* Renderizando as datas formatadas */}
                <span className="text-sm text-gray-500">Criado em: {createdAt}</span>
                <span className="text-sm text-gray-500">Atualizado em: {updatedAt}</span>
            </div>
        </Link>
    );
};

export default TicketCard;