import React from 'react'

const PrimaryButton = ({ title, name, onClick, className, disabled }) => {
  return (
    <button
      type="button"
      name={name}
      onClick={onClick}
      className={`${className}`}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;