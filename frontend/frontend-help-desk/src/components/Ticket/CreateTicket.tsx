import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addChamado } from '../../api/chamado';

const CreateTicket: React.FC = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('BAIXA');
    // const [patrimonioId, setPatrimonioId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); 

        try {
            const response = await addChamado(token!, {
                titulo,
                descricao,
                prioridade,
                // patrimonioModel: { id: patrimonioId }
            });
            console.log(response.data);
            // Redireciona para a página de detalhes do chamado
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título</label>
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            </div>
            <div>
                <label>Descrição</label>
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required></textarea>
            </div>
            <div>
                <label>Prioridade</label>
                <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                    <option value="BAIXA">Baixa</option>
                    <option value="MEDIA">Média</option>
                    <option value="ALTA">Alta</option>
                </select>
            </div>
            
            <button type="submit">Criar Chamado</button>
        </form>
    );
};

export default CreateTicket;