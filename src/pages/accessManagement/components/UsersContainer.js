import React from 'react';
import EditIcon from '../../../images/svg/edit-svgrepo-com.svg';
import DeleteIcon from '../../../images/svg/delete-recycle-bin-trash-can-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';

const UsersContainer = ({ users, deleteUser, filteredList, setSelectedUser, setEditUserMenu }) => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col justify-between w-full h-4/5 border-2 border-gray-50 rounded-lg pt-4 pb-2 px-2 lg:text-sm overflow-x-auto overflow-y-hidden md:max-h-400px">
      <li className="grid grid-cols-[3fr,3fr,1fr,0.5fr] gap-1 w-full font-medium mb-4 bg-white h-fit border-y border-gray-50 py-4 px-6 min-w-530">
        <div className="overflow-hidden text-left">Nome</div>
        <div className="overflow-hidden text-left">Email</div>
        <div className="overflow-hidden text-left">Permissão</div>
        <div className="overflow-hidden text-left">Gestão</div>
      </li>
      <div className="pr-1 h-5/6 mb-1 overflow-y-auto min-w-530">
        <ul className="flex-col w-full h-full bg-coral border-b border-gray-50 mb-2 text-base lg:text-sm">
          {filteredList.map((user) => (
            <li key={user.id} className="grid grid-cols-[3fr,3fr,1fr,0.5fr] gap-1 w-full bg-white h-fit border-t border-gray-50 py-4 px-6 lg:gap-1 md:px-2">
              <div className="overflow-hidden text-left">{user.name}</div>
              <div className="overflow-hidden text-left">{user.email}</div>
              <div className="overflow-hidden text-left">{user.role}</div>
              <div className="flex justify-between min-w-8 w-full">
                <button type="button" onClick={() => {
                  setSelectedUser(user);
                  setEditUserMenu(true);
                }}>
                  <img src={EditIcon} alt="editar" className="hover:brightness-200 transition duration-300 cursor-pointer" />
                </button>
                <button type="button" onClick={() => deleteUser(user.id)}>
                  <img src={DeleteIcon} alt="deletar" className="hover:brightness-200 transition duration-300 cursor-pointer" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UsersContainer;
