import React, { useState } from 'react'
import LoginForm from './components/LoginForm';
import Logo from '../../images/svg/lex-white.svg';
import TwoEqualColumns from '../../layouts/TwoColumns/TwoEqualColumns';
import RegistryForm from './components/RegistryForm';

const Login = () => {

  const [typeForm, setTypeForm] = useState('login');
  return (
    <TwoEqualColumns
      column1={
      <section className={`flex flex-row justify-center w-full px-4 bg-coral shadow-md`}>
        <img src={Logo} alt={`lexartlabs-logo`} className={`drop-shadow-brown mb-10 w-full md:mb-4 md:w-48`} />
      </section>}
      column2={
        <main className={`w-full`}>
          <section className={`w-full px-9`}>
            <nav className={`flex flex-row justify-center w-full px-10 mb-4`}>
              <button type="button" onClick={() => setTypeForm('login')} className={`w-2/5 p-2 hover:bg-coral rounded-lg hover:shadow-md`}>
                Login
              </button>
              <button type="button" onClick={() => setTypeForm('registry')} className={`w-2/5 p-2 hover:bg-coral rounded-lg hover:shadow-md`}>
                Registro
              </button>
            </nav>
            {
              typeForm === 'login' ? (
                <LoginForm setTypeForm={setTypeForm} />
              ) : (
                <RegistryForm setTypeForm={setTypeForm} />
              )
            }
          </section>
        </main>
      }      
    />
  );
};

export default Login;