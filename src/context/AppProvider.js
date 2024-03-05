import React, { useMemo, useState } from 'react';
import AppContext from './AppContext';
import api from '../services/api';
import { toast } from "react-toastify";

import { useNavigate } from 'react-router-dom';

function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [productList, setProductList] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filtredList, setFiltredList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [listIndex, setListIndex] = useState(1);
  const [listSize, setListSize] = useState(10);

  const navigate = useNavigate();

  const login = async () => {
    try {
      setIsLoading(true);
      const payload = {
        email,
        password,
      };
      const response = await api.post('/users/login', payload);
      if (response?.data) {
        localStorage.setItem('@TOKEN', response.data);
        navigate("/");
        setIsLoading(false);
      };
      toast.success("Bem vindo(a)!", { autoClose: 2000 })
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      setIsLoading(false);
      console.log(error);
    };
  };

  const logout = () => {
    localStorage.removeItem('@TOKEN');
    navigate("/login");
  }

  const values = useMemo(() => ({
    isLoading,
    setIsLoading,
    email,
    setEmail,
    password,
    setPassword,
    productList,
    setProductList,
    searchTerm,
    setSearchTerm,
    filtredList,
    setFiltredList,
    selectedProduct,
    setSelectedProduct,
    isLogged,
    setIsLogged,
    listIndex,
    setListIndex,
    listSize,
    setListSize,
    login,
    logout,
  }), [
    isLoading,
    email,
    password,
    productList,
    searchTerm,
    filtredList,
    selectedProduct,
    isLogged,
    listIndex,
    listSize,
  ])


  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider