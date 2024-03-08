import React from 'react';
import LoadingGif from '../../../images/gif/icons8-círculo-de-carga.gif';

const Loading = () => {
  return (
    <div className={`w-screen h-screen flex flex-row justify-center items-center`}>
      <img src={LoadingGif} alt="Carregando" className={`w-36 h-36`} />
    </div>
  );
};

export default Loading;