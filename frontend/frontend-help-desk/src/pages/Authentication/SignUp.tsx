import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';
import Brand from "../../components/LandingPage/Brand/Brand";
import Button from "../../components/LandingPage/Button/Button";
import Input from "../../components/LandingPage/Input/Input";
import GoogleIcon from "../../components/LandingPage/Icons/GoogleIcon";

const SignUp: React.FC = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [isTecnico, setIsTecnico] = useState(false);
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTipoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTecnico(e.target.checked);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await register(nomeUsuario, senha, isTecnico ? 'ADMIN' : 'USER'); // Define o tipo como 'ADMIN' se for técnico, caso contrário, define como 'USER'
        console.log('Sucesso ao logar:', response);
        console.log('Token:', response.token);
        console.log('Tipo:', response.tipo);
        console.log('Nome:', response.nome);
        console.log('CPF/CNPJ:', response.cpfCnpj);
        navigate('/signin');
    } catch (error) {
        console.error('Falha de registro:', error);
        setError('Erro ao criar conta. Verifique os dados e tente novamente.');
    }
  };

  return (
    <>
      <main className='w-full h-screen flex flex-col items-center justify-center px-4'>
        <div className='max-w-sm w-full text-gray-300'>
          <div className='text-center'>
            <Link to="/">
              <Brand className='mx-auto w-32 cursor-pointer' />
            </Link>
            <div className='mt-5 space-y-2'>
              <h1 className='text-white text-2xl font-bold sm:text-3xl'>
                Criar uma conta
              </h1>
              <p className=''>
                Já tem uma conta?{" "}
                <Link
                  to='/signin'
                  className='font-medium text-indigo-500 hover:text-indigo-600 duration-150'>
                  Faça login
                </Link>
              </p>
            </div>
          </div>
          <form onSubmit={handleRegister} className='mt-8 space-y-5'>
            <div>
              <label className='font-medium'>Nome de usuário</label>
              <Input
                type='text'
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
                required
                className='w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800'
              />
            </div>
            <div>
              <label className='font-medium'>Senha</label>
              <Input
                type='password'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className='w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800'
              />
            </div>
            <div>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={isTecnico}
                  onChange={handleTipoChange}
                  className='mr-2'
                />
                Registrar como técnico
              </label>
            </div>
            <div>
              <label className='font-medium'>{isTecnico ? 'Nome do Técnico' : 'Nome da Empresa'}</label>
              <Input
                type='text'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className='w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800'
              />
            </div>
            {isTecnico ? (
              <div>
                <label className='font-medium'>CPF</label>
                <Input
                  type='text'
                  value={cpfCnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                  required
                  className='w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800'
                />
              </div>
            ) : (
              <div>
                <label className='font-medium'>CNPJ</label>
                <Input
                  type='text'
                  value={cpfCnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                  required
                  className='w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800'
                />
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            <Button type='submit' className='w-full text-gray-800 bg-gray-100 hover:bg-gray-200 ring-offset-2 focus:ring rounded-lg'>
              Criar conta
            </Button>
            <button
              type='button'
              onClick={() => alert('Continuar com Google não implementado')}
              className='w-full flex items-center justify-center gap-x-3 py-2.5 border border-gray-800 rounded-lg text-sm font-medium bg-gray-800/40 hover:bg-gray-800 ring-purple-500 focus:ring duration-150'>
              <GoogleIcon />
              Continue com o Google
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default SignUp;