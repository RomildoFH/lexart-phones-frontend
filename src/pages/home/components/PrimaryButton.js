import React from 'react'

const PrimaryButton = ({ title, name, onClick, className }) => {
  return (
    <button
      type="button"
      name={name}
      onClick={onClick}
      className={`${className}`}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;