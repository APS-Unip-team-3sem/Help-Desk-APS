import React from 'react';
import TicketCard from './TicketCard';

const TicketList = ({ tickets }) => {
    return (
        <div>
            {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </div>
    );
}

export default TicketList;