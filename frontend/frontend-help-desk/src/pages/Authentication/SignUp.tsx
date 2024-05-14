import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { register } from '../../api/auth'; // Importa a função register da sua API Axios
import Brand from "../../components/LandingPage/Brand/Brand";
import Button from "../../components/LandingPage/Button/Button";
import Input from "../../components/LandingPage/Input/Input";
import GoogleIcon from "../../components/LandingPage/Icons/GoogleIcon";

const SignUp: React.FC = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState<'USER'>('USER');
  const [isEmpresa, setIsEmpresa] = useState(false);
  const [cnpj, setCnpj] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Usa a função register API Axios para enviar os dados para o backend
      await register(nome, senha, tipo);
      // Registro bem-sucedido: redireciona para a página de login
      navigate('/signin');
      alert('Conta criada com sucesso!');
    } catch (error) {
      // Erro de registro: exibe mensagem de erro
      setError('Erro ao criar conta. Verifique os dados e tente novamente.');
      console.error('Erro ao fazer registro:', error);
    }
  };

  const handleTipoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmpresa(e.target.checked);
    setTipo('USER'); 
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:9000/auth/register', {
        username: nome,
        password: senha, 
        userType: tipo, 
      });
  
      if (response.status === 200) {
        // código para lidar com o registro bem-sucedido

        // Redirecionar para a página de login
        navigate('/signin');
        alert('Conta criada com sucesso!');

        //MOSTRAR TOKEN
        console.log('Token:', response.data.token);

        // EXIBIR NOME DO USUÁRIO E TIPO
        console.log('Nome:', response.data.nome);
        console.log('Tipo:', response.data.tipo);
      } else {
        // código para lidar com erros de registro

        // Exibe a mensagem de erro retornada pelo servidor
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      // código para lidar com erros de rede
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
          <form onSubmit={handleSubmit} className='mt-8 space-y-5'>
            <div>
              <label className='font-medium'>{isEmpresa ? 'Nome da empresa' : 'Nome de usuário'}</label>
              <Input
                type='text'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
                  checked={isEmpresa}
                  onChange={handleTipoChange}
                  className='mr-2'
                />
                Registrar como empresa
              </label>
            </div>
            {isEmpresa && (
              <div>
                <label className='font-medium'>CNPJ</label>
                <Input
                  type='text'
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  required={isEmpresa}
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