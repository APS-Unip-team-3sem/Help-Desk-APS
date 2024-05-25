import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChamadoById, closeChamado, initChamado } from '../../api/chamado';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

moment.tz.setDefault('America/Sao_Paulo');

const TicketDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [chamado, setChamado] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<moment.Moment | null>(null);
    const [currentTime, setCurrentTime] = useState<moment.Moment>(moment());
    const [newComment, setNewComment] = useState<string>('');
    const [comments, setComments] = useState<string[]>([]);
    const [assinado, setAssinado] = useState<boolean>(false);
    const [assinadoPor, setAssinadoPor] = useState<string>('');

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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const calculateElapsedTime = (startTime: moment.Moment, currentTime: moment.Moment): number => {
        return currentTime.diff(startTime);
    };

    const formatElapsedTime = (elapsedTime: number): string => {
        const totalSeconds = Math.floor(elapsedTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const elapsedTime = startTime ? calculateElapsedTime(startTime, currentTime) : 0;
    const formattedElapsedTime = formatElapsedTime(elapsedTime);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    const handleFecharChamado = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        try {
            const response = await closeChamado(token, id!);
            setChamado(response.data);
        } catch (error) {
            console.error('Erro ao fechar o chamado:', error);
        }
    };

    const handleAssinar = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        try {
            const response = await initChamado(token, id!);
            setAssinado(true);
            setAssinadoPor(response.data.usuarioModelResponsavel ? response.data.usuarioModelResponsavel.nome : ''); // response.data.usuarioModelResponsavel.nome
        } catch (error) {
            console.error('Erro ao assinar o chamado:', error);
        }
    };

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
            case 'em andamento':
                return 'bg-yellow-200 text-yellow-800';
            default:
                return '';
        }
    };

    const getPrioridadeColorClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'baixa':
                return 'bg-green-200 text-green-800';
            case 'alta':
                return 'bg-red-200 text-red-800';
            case 'media':
                return 'bg-yellow-200 text-yellow-800';
            default:
                return '';
        }
    };

    return (
        <>
            <section className="mb-22 lg:text-left">
                <div className="relative overflow-hidden h-[300px] bg-indigo-500">
                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden">
                        <div className="flex h-full items-center justify-center">
                            <div className="max-w-[800px] px-6 py-6 text-center text-white md:py-0 md:px-12">
                                <h2 className="mb-4 text-2xl text-center font-bold leading-tight tracking-tight md:text-4xl xl:text-5xl">
                                    <FontAwesomeIcon icon={faGlobe} className="mr-2" />{chamado.titulo} 
                                </h2>
                                <span className="text-md text-slate-300">#{id}</span>
                                <p className="text-md">
                                    {moment(chamado.abertura).add(3, 'hours').format('DD/MM/YYYY HH:mm')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container w-sm mx-auto grid grid-cols-3 gap-4 bg-white rounded-lg">
                <div className="col-span-2 p-8">
                    <h2 className="text-lg font-semibold mb-4">
                        {chamado.usuarioModel.nome}
                        <span className="ml-3">{chamado.abertura}</span>
                    </h2>
                    <div className="space-y-4">
                        <p className="mt-1 text-md text-gray-900 text-justify">{chamado.descricao}</p>
                    </div>
                    <div className="p-8">
                        <h2 className="text-xl font-semibold mb-4"></h2>
                        {comments.map((comment, index) => (
                            <div key={index} className="flex items-start gap-2.5 mb-4 bg-slate-100 rounded-md">
                                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{chamado.usuarioModel.nome}</span>
                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                            {moment().format('HH:mm')}
                                        </span>
                                    </div>
                                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-8">
                        <h2 className="text-xl font-semibold mb-4"></h2>
                        <form className="space-y-4" onSubmit={handleCommentSubmit}>
                            <div>
                                <textarea
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                                    rows={6}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder='Clique aqui para escrever um comentário'
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Responder
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-span-1 bg-slate-100 rounded-lg">
                    <div className="p-8">
                        <h2 className="text-xl font-semibold mb-4">
                            Detalhes do Ticket
                        </h2>
                        <label htmlFor="status" className="block font-semibold">Status:</label>
                        <span
                            className={`md:top-4 md:right-4 text-gray-500 text-xs px-4 py-1 rounded-full ${getStatusColorClass(chamado.statusChamado)}`}
                        >
                            {chamado.statusChamado}
                        </span>

                        <label htmlFor="status" className="block font-semibold mt-5">Prioridade:</label>
                        <span
                            className={`md:top-4 md:right-4 text-gray-500 text-xs px-4 py-1 rounded-full ${getPrioridadeColorClass(chamado.prioridadeChamado)}`}
                        >
                            {chamado.prioridadeChamado}
                        </span>

                        <label htmlFor="tecnico" className="block font-semibold mt-5">Assinado por:</label>
                        <span className="text-sm text-gray-500">{chamado.usuarioModelResponsavel ? chamado.usuarioModelResponsavel.nome : ''}</span>

                        <div className="px-8 py-4 bg-gray-200 text-center">
                            <button
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                onClick={handleAssinar}
                            >
                                Assinar Ticket
                            </button>
                        </div>
                        <div className="px-8 py-4 bg-gray-200 text-center">
                            <button
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                onClick={handleFecharChamado}
                            >
                                Fechar Problema
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TicketDetails;