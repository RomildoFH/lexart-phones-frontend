import React, { useEffect } from 'react';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {
    isLoading,
    email,
    productList,
    searchTerm,
    filtredList,
    selectedProduct,
    isLogged,
    listIndex,
    listSize,
  } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    if (!token) {
      navigate('/login');
    }
  }, [])

  return (
    <div>Home</div>
  );
};

export default Home;
