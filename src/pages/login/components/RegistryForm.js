import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AppContext from "../../../context/AppContext";
import PrimaryButton from "./PrimaryButton";

const RegistryForm = ({ setTypeForm }) => {
  const {
    register,
    setPassword,
    setEmail,
  } = useContext(AppContext);

  const [registryEmail, setRegistryEmail] = useState("");
  const [registryPassword, setRegistryPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleRegister = async () => {
    // Validations
    if (fullName.length < 3) {
      toast.error("Insira um nome válido");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(registryEmail)) {
      toast.error("Formato de email inválido");
      return;
    }

    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!strongRegex.test(registryPassword)) {
      toast.error(
        "A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais"
      );
      return;
    }

    if (registryPassword !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setPassword(registryPassword);
    setEmail(registryEmail);

    await register({ name: fullName, email: registryEmail, password: registryPassword });
  };

  return (
    <form className="flex flex-col w-5/6 py-16 px-10 rounded-2xl m-auto border border-gray-70 shadow-lg gap-4">
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Nome Completo
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 h-10 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={registryEmail}
          onChange={(e) => setRegistryEmail(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 h-10 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          value={registryPassword}
          onChange={(e) => setRegistryPassword(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 h-10 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 h-10 w-full"
        />
      </div>
      <PrimaryButton
        title={`Cadastrar`}
        onClick={handleRegister}
        className={`w-full max-w-full h-10 text-white bg-text-brown px-10 rounded-3xl hover:brightness-125 transition duration-300 text-base md:text-xs mt-2`}
      />
      <p className="mt-2 text-sm">
        Já tem uma conta?{" "}
        <span onClick={() => setTypeForm("login")} className="text-indigo-600 cursor-pointer">
          Faça Login
        </span>
      </p>
    </form>
  );
};

export default RegistryForm;
