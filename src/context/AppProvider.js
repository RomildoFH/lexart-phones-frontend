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
  const [filteredList, setFilteredList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [listIndex, setListIndex] = useState(1);
  const [listSize, setListSize] = useState();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

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
        localStorage.setItem('@TOKEN', response.data.token);
        navigate("/");
        setIsLoading(false);
      };
      toast.success("Bem vindo(a)!", { autoClose: 2000 });
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
  };

  const getProducts = async () => {
    try {      
      setIsLoading(true);

      const response = await api.get('/products');

      if (response?.data?.length) {
        setProductList(response.data);
      };

      setIsLoading(false);
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
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      if (response.status === 200) {
        toast.success("Produto deletado com sucesso)!", { autoClose: 2000 })
      };
      getProducts();
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
      console.log(error);
    };
  };

  const getProduct = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        setSelectedProduct(response.data);
    } catch (error) {
      if (error.response.status === 401) {
          navigate('/login');
      } else {
          toast.error(error?.response?.data?.message || error.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });
      }
      console.log(error);
    };
  };

  const updateProduct = async (id, payload) => {
    try {
      await api.patch(`/products/${id}`, payload);
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
      console.log(error)
    };
  };

  const createProduct = async ( payload) => {
    try {
      await api.post(`/products`, payload);
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
      console.log(error)
    };
  };

  const register = async (data) => {
    try {
      const created = await api.post(`/users`, data);
      console.log(created)
      setEmail(data.email);
      setPassword(data.password);
      await login();
    } catch (error) {
      toast.error(error?.response?.data || error.message, {
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
      console.log(error)
    };
  };

  const getAllUsers = async () => {
    try {
      setIsLoading(true);

      const response = await api.get('/users');

      if (response?.data?.length) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      };

      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data.message || error.message, {
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
      console.log(error)
    };
  };

  const editUser = async (id, payload) => {
    try {
      await api.patch(`/users/${id}`, payload);

      toast.success('Usuário atualizado com sucesso', { autoClose: 2000 });

      getAllUsers();
    } catch (error) {
      toast.error(error?.response?.data.message || error.message, {
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
      console.log(error)
    };
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);

      toast.success('Usuário deletado com sucesso', { autoClose: 2000 });

      getAllUsers();
    } catch (error) {
      toast.error(error?.response?.data.message || error.message, {
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
      console.log(error)
    };
  };

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
    filteredList,
    setFilteredList,
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
    getProducts,
    deleteProduct,
    getProduct,
    updateProduct,
    createProduct,
    register,
    getAllUsers,
    editUser,
    deleteUser,
    users,
    setUsers,
    filteredUsers,
    setFilteredUsers,
  }), [
    isLoading,
    email,
    password,
    productList,
    searchTerm,
    filteredList,
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