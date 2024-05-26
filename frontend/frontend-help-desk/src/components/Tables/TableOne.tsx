import React, { useEffect, useState } from 'react';
import { getAllChamados } from '../../api/chamado'; // Importe a função para buscar os chamados da sua API aqui

const TableOne = () => {
    const [chamados, setChamados] = useState([]);

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
            }
        };

        fetchChamados();
    }, []);

    return (
        <div className="rounded-xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex flex-col gap-4">
                <h5 className="text-xl font-semibold text-black dark:text-white">Tickets</h5>
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="status" className="block font-semibold">Status:</label>
                        <select id="status" className="border rounded px-2 py-1">
                            <option value="all">Todos os Tickets</option>
                            <option value="ABERTO">Abertos ou Pendentes</option>
                            <option value="FECHADO">Resolvidos ou Fechados</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date" className="block font-semibold">Filtrar por Data:</label>
                        <select id="date" className="border rounded px-2 py-1">
                            <option value="creation">Data de Criação</option>
                            <option value="modification">Última Modificação</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="priority" className="block font-semibold">Prioridade:</label>
                        <select id="priority" className="border rounded px-2 py-1">
                            <option value="all">Todas as Prioridades</option>
                            <option value="low">Baixa</option>
                            <option value="medium">Média</option>
                            <option value="high">Alta</option>
                        </select>
                    </div>
                </div>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">Título</th>
                            <th className="text-left">Descrição</th>
                            <th className="text-left">Status</th>
                            <th className="text-left">Prioridade</th>
                            <th className="text-left">Data de Criação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chamados.map(chamado => (
                            <tr key={chamado?.id}>
                                <td>{chamado.titulo}</td>
                                <td>{chamado.descricao}</td>
                                <td>{chamado.statusChamado}</td>
                                <td>{chamado.prioridadeChamado}</td>
                                <td>{chamado.abertura}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableOne;