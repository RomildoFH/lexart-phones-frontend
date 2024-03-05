import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Loading from './components/Loading';
import TwoColumns from '../../layouts/TwoColumns/TwoColumns';
import SideBar from './components/SideBar';
import Filter from '../../images/svg/filter.svg';
import PrimaryButton from './components/PrimaryButton';

const Home = () => {
  const {
    email,
    productList,
    searchTerm,
    filtredList,
    selectedProduct,
    isLogged,
    listIndex,
    listSize,
    getProducts,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    if (!token) {
      navigate('/login');
    };

    getProducts();
  }, [])

  useEffect(() => {
    if (productList?.length) {
      setLoading(false);
    };

  }, [productList]);

  return (
    loading ? <Loading /> : (
      <TwoColumns
        column1={<SideBar />}
        column2={
          <main className={`flex-col p-10 w-full`}>
            <header className={`flex w-full mb-10`}>
              <h1 className={`font-bold text-5xl w-fit text-text-brown`}>
                Lista de produtos
              </h1>
            </header>
            <section className={`flex w-full gap-10 mb-10`}>
              <img src={Filter} alt={`filter-icon.svg`} className={`hover:brightness-125 transition duration-300 cursor-pointer`} />
              <PrimaryButton
                title={`Adicionar produto`}
                name={`add-product`}
                onClick={() => console.log('click')}
                className={`text-white bg-text-brown px-10 rounded-3xl hover:brightness-125 transition duration-300`}
              />
            </section>
            <section className={`w-full border-2 rounded-lg px-4 py-8 overflow-y-auto`}>
              <section className={`flex-col w-full`}>
                <header className="grid grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr] gap-4 w-full font-medium mb-4">
                  <p className="overflow-hidden text-center">Item</p>
                  <p className="overflow-hidden text-center">Nome</p>
                  <p className="overflow-hidden text-center">Fabricante</p>
                  <p className="overflow-hidden text-center">Modelo</p>
                  <p className="overflow-hidden text-center">Cor</p>
                  <p className="overflow-hidden text-center">Preço</p>
                </header>
                {
                  productList?.map((product, index) => (
                    <article className="grid grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr] gap-4 w-full">
                      <p className="overflow-hidden text-center">{index + 1}</p>
                      <p className="overflow-hidden text-center">{product.name}</p>
                      <p className="overflow-hidden text-center">{product.brand}</p>
                      <p className="overflow-hidden text-center">{product.model}</p>
                      <p className="overflow-hidden text-center">{product.color}</p>
                      <p className="overflow-hidden text-center">{Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </article>
                  ))
                }
              </section>
            </section>
          </main>
        }
      />
    )
  );
};

export default Home;
