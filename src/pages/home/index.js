import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Loading from './components/Loading';
import TwoColumns from '../../layouts/TwoColumns/TwoColumns';
import SideBar from './components/SideBar';
import Filter from '../../images/svg/filter.svg';
import PrimaryButton from './components/PrimaryButton';
import LeftArrow from '../../images/svg/arrow-left.svg';
import RightArrow from '../../images/svg/arrow-right.svg';
import DownArrow from '../../images/svg/arrow-down.svg';
import EditIcon from '../../images/svg/edit-svgrepo-com.svg';
import DeleteIcon from '../../images/svg/delete-recycle-bin-trash-can-svgrepo-com.svg';

const Home = () => {
  const {
    email,
    productList,
    searchTerm,
    filtredList,
    setFiltredList,
    selectedProduct,
    isLogged,
    listIndex,
    listSize,
    setListSize,
    getProducts,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [pages, setPages] = useState(1);

  const navigate = useNavigate();

  const orderProducts = (param) => {
    console.log(`ordenar por ${param}`);
  };

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    if (!token) {
      navigate('/login');
    };

    getProducts();
    setListSize(10);
  }, [])

  useEffect(() => {
    if (productList?.length) {
      setLoading(false);
      setFiltredList(productList)
    };

  }, [productList]);

  useEffect(() => {
    if (filtredList?.length) {
      setPages(Math.ceil(filtredList.length / (listSize || 1)));
    } else {
      setPages(1);
    }
  }, [filtredList])

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
              <PrimaryButton
                title={`Adicionar produto`}
                name={`add-product`}
                onClick={() => console.log('click')}
                className={`text-white bg-text-brown px-10 rounded-3xl hover:brightness-125 transition duration-300`}
              />
              <img src={Filter} alt={`filter-icon.svg`} className={`hover:brightness-125 transition duration-300 cursor-pointer`} />
            </section>
            <section className={`w-full border-2 border-gray-50 rounded-lg py-8`}>
              <ul className={`flex-col w-full max-h-96 bg-coral border-b border-gray-50 mb-2 overflow-y-scroll`}>
                <li className="grid grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr,0.2fr,0.2fr] gap-4 w-full font-medium mb-4 bg-white h-fit border border-gray-50 py-4 px-6">
                  <div className={`flex justify-between w-fit gap-2 hover:brightness-125 cursor-pointer`}>
                    <p className="overflow-hidden text-left">Item</p>
                    <img src={DownArrow} alt={`ordenar por item`} onClick={() => orderProducts('index')} />
                  </div>
                  <div className={`flex justify-between w-fit gap-2 hover:brightness-125 cursor-pointer`}>
                    <p className="overflow-hidden text-left">Nome</p>
                    <img src={DownArrow} alt={`ordenar por item`} onClick={() => orderProducts('name')} />
                  </div>
                  <div className={`flex justify-between w-fit gap-2 hover:brightness-125 cursor-pointer`}>
                    <p className="overflow-hidden text-left">Fabricante</p>
                    <img src={DownArrow} alt={`ordenar por item`} onClick={() => orderProducts('brand')} />
                  </div>
                  <div className={`flex justify-between w-fit gap-2 hover:brightness-125 cursor-pointer`}>
                    <p className="overflow-hidden text-left">Modelo</p>
                    <img src={DownArrow} alt={`ordenar por item`} onClick={() => orderProducts('model')} />
                  </div>
                  <div className={`flex justify-between w-fit gap-2 hover:brightness-125 cursor-pointer`}>
                    <p className="overflow-hidden text-left">Cor</p>
                    <img src={DownArrow} alt={`ordenar por item`} onClick={() => orderProducts('color')} />
                  </div>
                  <div className={`flex justify-between w-fit gap-2 hover:brightness-125 cursor-pointer`}>
                    <p className="overflow-hidden text-left">Preço</p>
                    <img src={DownArrow} alt={`ordenar por item`} onClick={() => orderProducts('price')} />
                  </div>
                </li>
                  {
                  productList?.filter((e, index) => listSize ? index < listSize : filtredList.length).map((product, index) => (
                    <li className="grid grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr,0.2fr,0.2fr] gap-4 w-full bg-white h-fit border-t border-gray-50 py-4 px-6">
                      <p className="overflow-hidden text-left">{index + 1}</p>
                      <p className="overflow-hidden text-left">{product.name}</p>
                      <p className="overflow-hidden text-left">{product.brand}</p>
                      <p className="overflow-hidden text-left">{product.model}</p>
                      <p className="overflow-hidden text-left">{product.color}</p>
                      <p
                      className="overflow-hidden text-left"
                      >
                        {
                          Number(product.price).toLocaleString(
                            'pt-BR', { style: 'currency', currency: 'BRL' }
                          )
                        }
                      </p>
                      <img
                        src={EditIcon} alt={`editar`} 
                        className={`hover:brightness-200 transition duration-300 cursor-pointer`}
                      />
                      <img
                        src={DeleteIcon} alt={`deletar`}
                        className={`hover:brightness-200 transition duration-300 cursor-pointer`}
                      />
                    </li>
                  ))
                }
              </ul>
              <div className={`flex pl-4 pt-4 gap-4 align-middle h-10`}>
                <img src={LeftArrow} alt={`back-page`} className={`hover:brightness-125 transition duration-300 cursor-pointer`} />
                <p>{`Página ${1} de ${pages}`}</p>
                <img src={RightArrow} alt={`foward-page`} className={`hover:brightness-125 transition duration-300 cursor-pointer`} />
              </div>
            </section>
          </main>
        }
      />
    )
  );
};

export default Home;
