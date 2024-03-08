import React from 'react';
import PrimaryButton from './PrimaryButton';

const EditUserForm = ({ selectedUser, setSelectedUser, onClick }) => {
  const { id, name, email, role } = selectedUser;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  return (
    <form className="flex flex-col p-6 bg-white rounded-2xl sm:max-w-80 sm:text-sm">
      <h2 className="text-2xl font-bold mb-4 text-text-brown">Editar Usuário</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1"
            aria-label="Nome"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1"
            aria-label="Email"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role">Permissão:</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-1 h-9"
            aria-label="Papel"
          >
            <option value="admin">Administrador</option>
            <option value="customer">Cliente</option>
          </select>
        </div>
        <div className="flex justify-between">
          <PrimaryButton
            title={'Salvar'}
            onClick={() => onClick(id, {
              name: selectedUser.name,
              email: selectedUser.email,
              role: selectedUser.role
            })}
            className={`text-white bg-text-brown px-10 w-60 rounded-3xl hover:brightness-125 transition duration-300`}
          />
          <button onClick={() => {}} className={`flex justify-center h-8 w-1/2 font-medium text-gray-70 gap-2 mt-3 px-2 hover:brightness-125 hover:drop-shadow-gray hover:scale-105`}>Cancelar</button>
        </div>
      </div>
    </form>
  );
};

export default EditUserForm;
