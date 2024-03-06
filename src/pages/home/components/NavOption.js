import React from 'react';

const NavOption = ({ title, icon, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={`flex justify-start h-8 w-full font-medium text-gray-70 gap-2 mt-3 px-2 hover:brightness-125 hover:drop-shadow-gray hover:scale-105`}>
      <img src={icon} alt={`${title}-ícone`} className={`h-full`} />
      <p className={`h-full text-xl align-middle`}>
        { title }
      </p>
    </button>
  );
};

export default NavOption;
