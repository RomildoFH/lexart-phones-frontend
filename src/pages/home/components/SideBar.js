import React, { useContext } from 'react';
import AppContext from '../../../context/AppContext';
import logo from '../../../images/svg/lex-white.svg';
import NavOption from './NavOption';
import LogoutIcon from '../../../images/svg/logout-svgrepo-com.svg';
import HomeIcon from '../../../images/svg/home-4-svgrepo-com.svg';
import SecurityIcon from '../../../images/svg/security-user-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {

  const {
    logout,
  } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <nav className="flex-col w-full h-full border-solid border border-gray-50 rounded-r-3xl shadow-md shadow-emerald-50 bg-coral pt-20 px-4">
      <img
        src={logo}
        alt={`lexartlabs-logo.svg`}
        className={`drop-shadow-brown mb-10`}
      />
      <NavOption title={'Produtos'} icon={HomeIcon} onClick={() => navigate('/')} />
      <NavOption title={'Acessos'} icon={SecurityIcon} onClick={() => navigate('/gestao-acesso')} />
      <NavOption title={'Sair'} icon={LogoutIcon} onClick={logout} />
    </nav>
  );
};

export default SideBar;