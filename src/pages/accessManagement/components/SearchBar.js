import React from 'react';

const SearchBar = ({onChange, value, placeholder}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className={`w-2/5 min-w-60 max-w-80 px-4 rounded-3xl h-12 border`}
    />
  );
};

export default SearchBar;
