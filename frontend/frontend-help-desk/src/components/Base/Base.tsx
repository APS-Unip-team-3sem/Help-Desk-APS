import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { getUserById, getLoggedUser } from '../../api/userdata';

const Base: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // utilizando o getLoggedUser para buscar as informações do usuário logado pelo token:
    useEffect(() => {
        const fetchLoggedUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token não encontrado');
                return;
            }
            try {
                const userData = await getLoggedUser(token); // supondo que getLoggedUser retorna um objeto com as informações do usuário
                setUser(userData);
                console.log(userData);
                console.log(user);
                console.log(token);
                setLoading(false);
            } catch (error) {
                setError("Erro ao carregar informações do usuário");
                setLoading(false);
            }
        };

        fetchLoggedUser();

    }, []);

    if (loading) {
        return <div className="text-center mt-8">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    }

    return (
        <>
            <div className="py-20 bg-gray-50 radius-for-skewed">
                <div className="container mx-auto px-4">
                    <div className="mb-22 max-w-lg mx-auto text-center">
                        <span className="text-indigo-600 font-bold"></span>
                        <h2 className="text-4xl md:text-4xl font-bold text-white">Olá, <span className="bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-400 inline-block text-transparent bg-clip-text">{user?.nome.toUpperCase()}</span>! Como podemos te ajudar?</h2>
                    </div>
                    <div className="flex flex-wrap mx-6">
                        <div className="mb-12 lg:mb-0 w-full md:w-1/2 lg:w-1/3 px-4">
                            <span className="mb-4 md:mb-6 inline-block bg-indigo-100 p-3 text-indigo-500 rounded">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                </svg>

                            </span>
                            <h4 className="mb-4 text-2xl font-bold font-heading text-white">Procurar artigos</h4>
                            <p className="text-gray-500 leading-loose">Explore as instruções e conheça as melhores práticas da nossa base de conhecimento.</p>
                        </div>
                        <div className="mb-12 lg:mb-0 w-full md:w-1/2 lg:w-1/3 px-4">
                            <span className="mb-4 md:mb-6 inline-block bg-indigo-100 p-3 text-indigo-500 rounded">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 12A2.5 2.5 0 0 1 21 9.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2.5a2.5 2.5 0 0 1 0 5V17a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                                </svg>

                            </span>
                            <h4 className="mb-4 text-2xl font-bold font-heading text-white">Exibir todos os tickets</h4>
                            <p className="text-gray-500 leading-loose">Acompanhe todo o andamento do seu ticket e sua interação com as equipes de suporte.</p>
                        </div>
                        <div className="mb-12 lg:mb-0 w-full md:w-1/2 lg:w-1/3 px-4">
                            <span className="mb-4 md:mb-6 inline-block bg-indigo-100 p-3 text-indigo-500 rounded">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z" clip-rule="evenodd" />
                                </svg>

                            </span>
                            <h4 className="mb-4 text-2xl font-bold font-heading text-white">Enviar um ticket</h4>
                            <p className="text-gray-500 leading-loose">Descreva seu problema preenchendo o formulário do ticket de suporte.</p>
                        </div>
                        {/*  */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Base;