import React, { useContext, useEffect, useState } from 'react';
import Loading from './components/Loading';
import TwoColumns from '../../layouts/TwoColumns/TwoColumns';
import SideBar from './components/SideBar';
import UsersContainer from './components/UsersContainer';
import AppContext from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';

const AccessManagement = () => {
  const {
    users,
    setUsers,
    getAllUsers,
    editUser,
    deleteUser,
    filteredUsers,
    setFilteredUsers,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [itens, setItens] = useState([]);

  const navigate = useNavigate();

  const filterBySearchTerm = () => {
    if (searchTerm) {
      console.log('filtrando', searchTerm)
      let filtered = itens.filter((e) => (
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase())
      ));    
      console.log('filtrando', filtered)
      setItens(filtered);
    } else {
      setItens(users);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    if (!token) {
      navigate('/login');
    };

    getAllUsers();
    console.log('montou')
    setLoading(false);
    // return () => {
    //   setUsers([])
    // }
  }, []);

  useEffect(() => {
    setItens(users);
    if (users?.length) {
      console.log('users no gestao', users);
      setFilteredUsers(users);
      setLoading(false);
    }
  }, [users]);

  useEffect(() => {
    filterBySearchTerm();
  }, [searchTerm])

  return (
    loading ? <Loading /> : (
      <TwoColumns
        column1={<SideBar />}
        column2={(
          <main className={`flex flex-col justify-between p-10 pb-1 w-full lg:p-2 h-full`}>
            <header className={`flex w-full`}>
              <h1 className={`font-bold text-5xl w-full text-text-brown md:text-3xl`}>
                Gestão de acesso
              </h1>
            </header>
            <SearchBar
              value={searchTerm}
              placeholder={'Buscar por nome ou email'}
              onChange={setSearchTerm}
            />
            <UsersContainer users={users} deleteUser={deleteUser} filteredList={itens} />
          </main>
        )}
      />
    )
  );
};

export default AccessManagement;
