import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addChamado } from '../../api/chamado';

const CreateTicket: React.FC = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('BAIXA');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); 

        try {
            const response = await addChamado(token!, {
                titulo,
                descricao,
                prioridade,
            });
            console.log(response.data);
            if (response.data && response.data.id) {
                console.error('Chamado criado com sucesso: ', response.data);
                navigate(`/ticket/${response.data.id}`);
            } else {
                console.error('ID do chamado não encontrado na resposta:', response.data);
            }

        } catch (error) {
            console.error('Erro ao criar chamado:', error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-8 bg-white rounded-lg overflow-hidden shadow-md">
            <div className="p-8">
                <h2 className="text-xl font-semibold mb-4">Abrir um novo Ticket</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="titulo" className="block text-lg font-medium text-gray-700">Título</label>
                        <input
                            id="titulo"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="descricao" className="block text-lg font-medium text-gray-700">Descrição</label>
                        <textarea
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                            rows={6}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="prioridade" className="block text-lg font-medium text-gray-700">Prioridade</label>
                        <select
                            id="prioridade"
                            value={prioridade}
                            onChange={(e) => setPrioridade(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                        >
                            <option value="BAIXA">Baixa</option>
                            <option value="MEDIA">Média</option>
                            <option value="ALTA">Alta</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Abrir Chamado
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTicket;