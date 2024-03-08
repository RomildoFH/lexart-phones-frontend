import React, { useContext, useEffect, useState } from 'react';
import Loading from './components/Loading';
import TwoColumns from '../../layouts/TwoColumns/TwoColumns';
import SideBar from './components/SideBar';
import UsersContainer from './components/UsersContainer';
import AppContext from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ModalContainer from './components/ModalContainer';
import EditUserForm from './components/EditUserMenu';

const AccessManagement = () => {
  const {
    users,
    setUsers,
    getAllUsers,
    editUser,
    deleteUser,
    setFilteredUsers,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [itens, setItens] = useState([]);
  const [editUserMenu, setEditUserMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const navigate = useNavigate();

  const filterBySearchTerm = () => {
    if (searchTerm) {
      let filtered = itens.filter((e) => (
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase())
      ));
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
    setLoading(false);
    return () => {
      setUsers([])
    }
  }, []);

  useEffect(() => {
    setItens(users);
    if (users?.length) {
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
            <UsersContainer users={users} deleteUser={deleteUser} filteredList={itens} setSelectedUser={setSelectedUser} setEditUserMenu={setEditUserMenu} />

            <ModalContainer
              isActive={editUserMenu}
              closeModal={() => setEditUserMenu(false)}
            >
              <EditUserForm selectedUser={selectedUser} onClick={editUser} setSelectedUser={setSelectedUser} />              
            </ModalContainer>
          </main>
        )}
      />
    )
  );
};

export default AccessManagement;
