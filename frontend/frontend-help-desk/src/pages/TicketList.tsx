import react from 'react';
import type { Ticket } from '../types/ticket';
import TicketCard from './TicketCard';


interface TicketListProps {
    tickets: Ticket[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </div>
    );
};

export default TicketList;
