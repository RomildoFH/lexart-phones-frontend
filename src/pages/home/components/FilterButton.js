import React from 'react';

const FilterButton = ({onClick, image}) => {
  return (
    <button type="button" onClick={() => onClick(true)} className={`min-w-8`}>
      <img src={image} alt={`filter-icon.svg`} className={`hover:brightness-125 transition duration-300 cursor-pointer w-full`} />
    </button>  
  );
};

export default FilterButton;