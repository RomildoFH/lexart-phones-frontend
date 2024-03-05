import React from 'react';
import logo from '../../../images/svg/lex-white.svg';

const SideBar = () => {
  return (
    <nav className="w-full h-full border-solid border border-gray-50 rounded-r-3xl shadow-md shadow-emerald-50 bg-coral pt-10 px-2">
      <img
        src={logo}
        alt={`lexartlabs-logo.svg`}
        className={`drop-shadow-brown`}
      />
    </nav>
  );
};

export default SideBar;