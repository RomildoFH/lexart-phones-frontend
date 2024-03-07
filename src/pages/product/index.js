import React, { useContext, useEffect, useState } from 'react'
import TwoColumns from '../../layouts/TwoColumns/TwoColumns';
import SideBar from './components/SideBar';
import Loading from './components/Loading';
import AppContext from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from './components/PrimaryButton';

const Product = () => {

  const {
    getProduct,
    selectedProduct,
    updateProduct,
    createProduct,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    color: '',
    price: '',
  });

  const colors = [
    'Amarelo',
    'Azul',
    'Branco',
    'Cinza',
    'Dourado',
    'Laranja',
    'Preto',
    'Prata',
    'Rosa',
    'Roxo',
    'Verde',
    'Vermelho',
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    if (!token) {
      navigate('/login');
    };

    const productId = window.location.pathname.replace('/produto/', '').replace('edit/', '');
    if (productId !== 'new') {
      getProduct(productId);
    }
  }, [])

  useEffect(() => {
    if (selectedProduct && loading) {
      setFormData(selectedProduct);
      setLoading(false);
    }
  }, [selectedProduct])

  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      ...selectedProduct
    }));
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlert(false);
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    const disabled = Object.values(formData).some((e) => e === "");
    if (disabled) {
      setAlert(true);
    } else if (selectedProduct && selectedProduct.id) {
      updateProduct(selectedProduct.id, formData);
    } else {
      createProduct(formData);
    };
  };

  return (
    loading ? <Loading /> : (
      <TwoColumns
        column1={<SideBar />}
        column2={
          <main className={`flex-col p-10 w-full lg:p-2`}>
            <header className={`flex w-full mb-10`}>
              <h1 className={`font-bold text-5xl w-full text-text-brown md:text-3xl`}>
                {
                  selectedProduct && selectedProduct.id ? (
                    `Edição do produto`
                  ) : `Cadastro de produto`
                }
              </h1>
            </header>
            <form onSubmit={handleSubmit} className={`flex flex-col w-96 gap-2`}>
              <label className="flex flex-col">
                Nome:
                <input className="border border-gray-300 rounded-md px-2 h-10" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Insira o nome do produto" />
              </label>
              <label className="flex flex-col">
                Fabricante:
                <input className="border border-gray-300 rounded-md px-2 h-10" type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Insira o fabricante do produto" />
              </label>
              <label className="flex flex-col">
                Modelo:
                <input className="border border-gray-300 rounded-md px-2 h-10" type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Insira o modelo do produto" />
              </label>
              <label className="flex flex-col">
                Preço:
                <input className="border border-gray-300 rounded-md px-2 h-10" type="number" name="model" value={formData.price} onChange={handleChange} placeholder="Insira o preço do produto" />
              </label>
              <label className="flex flex-col">
                Cor:
                <select className="border border-gray-300 rounded-md px-2 h-10" name="color" value={formData.color} onChange={handleChange}>
                  {colors.map((color, index) => (
                    <option key={index} value={color}>{color}</option>
                  ))}
                </select>
              </label>
              <PrimaryButton
                title={`Salvar produto`}
                name={`save`}
                onClick={() => handleSubmit()}
                className={`w-full max-w-56 h-10 text-white bg-text-brown px-10 rounded-3xl hover:brightness-125 transition duration-300 text-base md:text-xs mt-2`}
              />
              {
                alert ? <p className={``}>Todos os campos precisão ser preenchidos</p> : null
              }
            </form>
          </main>
        }
      />
    )
  );
};

export default Product;
