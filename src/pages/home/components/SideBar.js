import React, { useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import logo from '../../../images/svg/lex-white.svg';
import NavOption from './NavOption';
import LogoutIcon from '../../../images/svg/logout-svgrepo-com.svg';
import HomeIcon from '../../../images/svg/home-4-svgrepo-com.svg';
import SecurityIcon from '../../../images/svg/security-user-svgrepo-com.svg';
import MenuIcon from '../../../images/svg/menu-svgrepo-com.svg';
import CloseIcon from '../../../images/svg/close-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {

  const {
    logout,
  } = useContext(AppContext);

  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  const role = localStorage.getItem('@ROLE');

  return (
    <nav className="flex-col w-full h-full border-solid border border-gray-50 rounded-r-3xl shadow-md shadow-emerald-50 bg-coral pt-20 px-4 md:flex-row md:rounded-none md:p-2">
      <img
        src={logo}
        alt={`lexartlabs-logo.svg`}
        className={`drop-shadow-brown mb-10 w-full md:mb-4 md:w-48`}
      />
      <div className={`flex flex-col md:flex-row`}>
        <div className={`hidden align-middle w-6 md:flex`}>
          {
            !menu ? (
              <button type="button" onClick={() => setMenu(true)}>
                <img src={MenuIcon} alt={"abrir-menu"} />
              </button>
            ) : (
              <button type="button" onClick={() => setMenu(false)}>
                <img src={CloseIcon} alt={"fechar-menu"} />
              </button>
            )
          }
        </div>
        {
          menu ? (
            <div className={`flex flex-row justify-around w-full`}>
              <NavOption title={'Produtos'} icon={HomeIcon} onClick={() => navigate('/')} />
              { role === 'admin' && <NavOption title={'Acessos'} icon={SecurityIcon} onClick={() => navigate('/gestao-acesso')} /> }
              <NavOption title={'Sair'} icon={LogoutIcon} onClick={logout} />
            </div>
          ) : null
        }
        <div className={`flex flex-col md:hidden`}>
          <NavOption title={'Produtos'} icon={HomeIcon} onClick={() => navigate('/')} />
          { role === 'admin' && <NavOption title={'Acessos'} icon={SecurityIcon} onClick={() => navigate('/gestao-acesso')} /> }
          <NavOption title={'Sair'} icon={LogoutIcon} onClick={logout} />
        </div>
      </div>
    </nav>
  );
};

export default SideBar;