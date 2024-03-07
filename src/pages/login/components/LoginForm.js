import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../../context/AppContext";
import PrimaryButton from "./PrimaryButton";

const LoginForm = ({setTypeForm}) => {

  const {
    login,
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(AppContext);

  const handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }

  };

  return (
    <form className="flex flex-col w-5/6 py-16 px-10 rounded-2xl m-auto border border-gray-70 shadow-lg gap-4">
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 rounded-xl px-4 h-10 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => handleChange(e)}
          className="border border-gray-300 rounded-xl px-4 h-10 w-full"
        />
      </div>
      <PrimaryButton
        title={`Entrar`}
        onClick={() => login()}
        className={`w-full max-w-full h-10 text-white bg-text-brown px-10 rounded-3xl hover:brightness-125 transition duration-300 text-base md:text-xs mt-2`}
      />
      <p className="mt-2 text-sm">Não tem uma conta? <span onClick={() => setTypeForm('registro')} className="text-indigo-600 cursor-pointer">Cadastre-se</span></p>
    </form>
  );
};

export default LoginForm;
