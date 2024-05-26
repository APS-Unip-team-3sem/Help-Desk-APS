import React, { useState, useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import TicketList from './TicketList';
import { Ticket } from '../types/ticket';
import { exportToExcel } from '../utils/exportUtils'; 
import { getChamadoByUser } from '../api/chamado';

const TicketDetails = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedDateFilter, setSelectedDateFilter] = useState<string>('creation');

    // Carregar os tickets criados pelo usuario logado ao montar o componente:

    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado');
                return;
            }

            try {
                const response = await getChamadoByUser(token!);
                if (response.data) {
                    setTickets(response.data);
                    setFilteredTickets(response.data);
                } else {
                    console.error('Erro ao carregar os tickets');
                }
            } catch (error) {
                console.error('Erro ao carregar os tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    // Função para filtrar os tickets com base no status selecionado
    const filterTicketsByStatus = (status: string) => {
        if (status === 'all') {
            setFilteredTickets(tickets);
        } else {
            const filtered = tickets.filter(ticket => ticket.status === status);
            setFilteredTickets(filtered);
        }
    };

    // Função para filtrar os tickets com base na data selecionada
    const filterTicketsByDate = () => {
        let filtered: Ticket[] = [];
        if (selectedDateFilter === 'creation') {
            filtered = tickets.filter(ticket => ticket.created_at.toDateString() === new Date().toDateString());
        } else if (selectedDateFilter === 'modification') {
            filtered = tickets.filter(ticket => ticket.updated_at.toDateString() === new Date().toDateString());
        } else if (selectedDateFilter === 'status') {
            filtered = tickets.filter(ticket => ticket.status === selectedStatus);
        }
        setFilteredTickets(filtered);
    };

    // Manipulador de evento para o botão de exportação
    const handleExportButtonClick = () => {
        // Filtrar os tickets antes de exportar
        filterTicketsByStatus(selectedStatus);
        filterTicketsByDate();
        
        // Exportar os tickets filtrados
        exportToExcel(filteredTickets);
    };

    return (
        <DefaultLayout>
            <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                {/* Espaço para exibir os tickets */}
                <div className="col-span-9">
                    {/* Componente para listar os tickets */}
                    <TicketList tickets={filteredTickets} />
                </div>
                
                {/* Coluna à direita com botões de exportação e filtros */}
                <div className="col-span-3">
                    <div className="flex flex-col gap-4">
                        {/* Botão de exportar tickets */}
                        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg" onClick={handleExportButtonClick}>Exportar Tickets</button>
                        
                        {/* Dropdown para seleção de status */}
                        <div>
                            <label htmlFor="status" className="block font-semibold">Status:</label>
                            <select id="status" className="border rounded px-2 py-1" value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value); filterTicketsByStatus(e.target.value); }}>
                                <option value="all">Todos os Tickets</option>
                                <option value="ABERTO">Abertos ou Pendentes</option>
                                <option value="FECHADO">Resolvidos ou Fechados</option>
                            </select>
                        </div>
                        
                        {/* Dropdown para filtrar por data */}
                        <div>
                            <label htmlFor="date" className="block font-semibold">Filtrar por Data:</label>
                            <select id="date" className="border rounded px-2 py-1" value={selectedDateFilter} onChange={(e) => { setSelectedDateFilter(e.target.value); filterTicketsByDate(); }}>
                                <option value="creation">Data de Criação</option>
                                <option value="modification">Última Modificação</option>
                                <option value="status">Status</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default TicketDetails;