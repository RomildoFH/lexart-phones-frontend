import React from 'react';
import LeftArrow from '../../../images/svg/arrow-left.svg';
import RightArrow from '../../../images/svg/arrow-right.svg';

const PageControl = ({onClick, index, pages}) => {
  return (
    <div className={`flex pl-4 gap-4 align-middle h-8 xl:text-xs xl:h-4`}>
        <button
          onClick={() => onClick(index - 1)}
          disabled={index <= 1}
          className={`h-full`}
        >
          <img
            src={LeftArrow}
            alt={`back-page`}
            className={`hover:brightness-125 transition duration-300 cursor-pointer xl:h-4`}
          />
        </button>
        <p>{`Página ${index} de ${pages}`}</p>
        <button
          onClick={() => onClick(index + 1)}
          disabled={index >= pages}
          className={`h-full`}
        >
          <img
            src={RightArrow}
            alt={`foward-page`}
            className={`hover:brightness-125 transition duration-300 cursor-pointer xl:h-4`}
          />
        </button>
      </div>
  );
};

export default PageControl;
