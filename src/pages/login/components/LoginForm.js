import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../../context/AppContext";

const LoginForm = () => {

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
    <div className="flex h-screen w-screen">
      <div className="w-1/2 bg-gray-200 flex items-center justify-center bg-emerald-500">
        <img src="/image.jpg" alt="Imagem" className="max-h-full" />
      </div>
      <div className="w-1/2 bg-white flex items-center justify-center">
        <form className="w-80">
          <h2 className="text-2xl mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="button"
            onClick={() => login()}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Entrar
          </button>
          <p className="mt-2 text-sm">Não tem uma conta? <Link to="/cadastro" className="text-indigo-600">Cadastre-se</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
