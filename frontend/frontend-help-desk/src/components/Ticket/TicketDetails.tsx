import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChamadoById } from '../../api/chamado';
import moment from 'moment-timezone';

moment.tz.setDefault('America/Sao_Paulo');

const TicketDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [chamado, setChamado] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<moment.Moment | null>(null);
    const [currentTime, setCurrentTime] = useState<moment.Moment>(moment());

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
                // Definindo o tempo de início e subtraindo 3 horas
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
        // Atualiza o tempo atual a cada segundo
        const interval = setInterval(() => {
            setCurrentTime(moment());
        }, 1000);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, []);

    // Função para calcular o tempo decorrido em milissegundos
    const calculateElapsedTime = (startTime: moment.Moment, currentTime: moment.Moment): number => {
        return currentTime.diff(startTime);
    };

    // Função para formatar o tempo decorrido em formato legível
    const formatElapsedTime = (elapsedTime: number): string => {
        const totalSeconds = Math.floor(elapsedTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Calcular e formatar o tempo decorrido
    const elapsedTime = startTime ? calculateElapsedTime(startTime, currentTime) : 0;
    const formattedElapsedTime = formatElapsedTime(elapsedTime);

    if (loading) {
        return <div className="text-center mt-8">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    }

    return (
        <>
            <section className="mb-22 lg:text-left">
                <div className="relative overflow-hidden h-[300px] bg-indigo-500">
                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden">
                        <div className="flex h-full items-center justify-center">
                            <div className="max-w-[800px] px-6 py-6 text-center text-white md:py-0 md:px-12">
                                <h2 className="mb-4 text-2xl text-center font-bold leading-tight tracking-tight md:text-4xl xl:text-5xl">
                                    {chamado.titulo} 
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
            <div className="max-w-xxl mx-auto mt-8 bg-white rounded-lg overflow-hidden shadow-md md:mx-40 xl:mx-80">
                <div className="p-8">
                    <h2 className="text-xl font-semibold mb-4">Detalhes do Ticket</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Descrição</label>
                            <p className="mt-1 text-lg text-gray-900">{chamado.descricao}</p>
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Prioridade</label>
                            <p className="mt-1 text-lg text-gray-900">{chamado.prioridadeChamado}</p>
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Status</label>
                            <p className="mt-1 text-lg text-gray-900">{chamado.statusChamado}</p>
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Tempo decorrido</label>
                            <p className="mt-1 text-lg text-gray-900">{formattedElapsedTime} horas</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TicketDetails;