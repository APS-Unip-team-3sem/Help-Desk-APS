import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/auth'; // Importe a função login do arquivo auth.ts
import Brand from '../../components/LandingPage/Brand/Brand';
import Button from '../../components/LandingPage/Button/Button';
import Input from '../../components/LandingPage/Input/Input';
import GoogleIcon from '../../components/LandingPage/Icons/GoogleIcon';

const SignIn: React.FC = () => {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Objeto para navegação

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const response = await login(nome, senha); // Use a função login definida em auth.ts
    
            // Exibir a resposta no console
            console.log('Resposta do servidor:', response);
    
            // Verifique se a resposta contém o token
            if (response.token) {
                // Armazene o token no localStorage (ou outro local seguro)
                localStorage.setItem('token', response.token);
    
                // Login bem-sucedido: redirecionar para a página do dashboard
                navigate('/dashboard');
    
                console.log('Usuário logado:', response);
            } else {
                setError('Token não encontrado na resposta');
            }
        } catch (error) {
            // Erro de login: exibe mensagem de erro
            setError('Credenciais inválidas. Por favor, verifique seu nome de usuário e senha.');
            console.error('Erro ao fazer login:', error);
        }
    };

    const handleContinueWithGoogle = () => {
        // Exemplo de navegação para o dashboard
        window.location.href = '/dashboard';
    };

    return (
        <>
            <main className="w-full h-screen flex flex-col items-center justify-center px-4">
                <div className="max-w-sm w-full text-gray-300">
                    <div className="text-center">
                        <Link to="/">
                            <Brand className="mx-auto w-32 cursor-pointer" />
                        </Link>
                        <div className="mt-5 space-y-2">
                            <h1 className="text-white text-2xl font-bold sm:text-3xl">
                                Entre com sua conta
                            </h1>
                            <p className="">
                                Ainda não tem uma conta?{' '}
                                <Link
                                    to="/signup"
                                    className="font-medium text-indigo-500 hover:text-indigo-600 duration-150"
                                >
                                    Registre-se
                                </Link>
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleLogin} className="mt-8 space-y-5">
                        <div>
                            <label className="font-medium">Nome de usuário</label>
                            <Input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                className="w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Senha</label>
                            <Input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                className="w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800"
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <Button
                            type="submit"
                            className="w-full text-gray-800 bg-gray-100 hover:bg-gray-200 ring-offset-2 focus:ring rounded-lg"
                        >
                            Entrar
                        </Button>
                        <button
                            type="button"
                            onClick={handleContinueWithGoogle}
                            className="w-full flex items-center justify-center gap-x-3 py-2.5 border border-gray-800 rounded-lg text-sm font-medium bg-gray-800/40 hover:bg-gray-800 ring-purple-500 focus:ring duration-150"
                        >
                            <GoogleIcon />
                            Continue com o Google
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
};

export default SignIn;