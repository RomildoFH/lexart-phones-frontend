import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Loading from './components/Loading';
import TwoColumns from '../../layouts/TwoColumns/TwoColumns';
import SideBar from './components/SideBar';
import Filter from '../../images/svg/filter.svg';

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
              <button
                type="button"
                className={`text-white bg-text-brown px-10 rounded-3xl hover:brightness-125 transition duration-300`}
              >
                Adicionar produto
              </button>
            </section>
          </main>
        }
      />
    )
  );
};

export default Home;
