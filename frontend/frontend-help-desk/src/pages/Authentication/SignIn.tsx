import React from 'react';
import { Link } from 'react-router-dom';
import Brand from "../../components/LandingPage/Brand/Brand";
import Button from "../../components/LandingPage/Button/Button";
import Input from "../../components/LandingPage/Input/Input";
import GoogleIcon from "../../components/LandingPage/Icons/GoogleIcon";

const Login: React.FC = () => {
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
                Entre com sua conta
              </h1>
              <p className=''>
                Ainda não tem uma conta?{" "}
                <Link
                  to='/signup'
                  className='font-medium text-indigo-500 hover:text-indigo-600 duration-150'>
                  Registre-se
                </Link>
              </p>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className='mt-8 space-y-5'>
            <div>
              <label className='font-medium'>Nome de usuário ou E-mail</label>
              <Input
                type='text'
                required
                className='w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800'
              />
            </div>
            <div>
              <label className='font-medium'>Senha</label>
              <Input
                type='password'
                required
                className='w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800'
              />
            </div>
            <Button className='w-full text-gray-800 bg-gray-100 hover:bg-gray-200 ring-offset-2 focus:ring rounded-lg'>
              Entrar
            </Button>
            <button
              type='button'
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

export default Login;