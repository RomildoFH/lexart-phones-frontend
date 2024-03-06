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
import ModalContainer from './components/ModalContainer';
import FilterMenu from './components/FilterMenu';

const Home = () => {
  const {
    email,
    productList,
    setProductList,
    searchTerm,
    filteredList,
    setFilteredList,
    selectedProduct,
    isLogged,
    listIndex,
    listSize,
    setListSize,
    getProducts,
    deleteProduct,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [pages, setPages] = useState(1);
  const [filterMenu, setFilterMenu] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [models, setModels] = useState([]);

  const navigate = useNavigate();

  const orderProducts = (sortBy) => {
    let sortedList = [...productList];
    const filters = {
      brand: selectedManufacturer,
      minPrice: selectedMinPrice,
      maxPrice: selectedMaxPrice,
      color: selectedColor,
      model: selectedModel,
    }
    if (sortBy !== 'item') {
      sortedList.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    };

    for (const filterKey in filters) {
      const filterValue = filters[filterKey];
      if (filterValue) {
        sortedList = sortedList.filter(item => {
          if (filterKey === 'brand') {
            return item.brand.toLowerCase() === filterValue.toLowerCase();
          }
          if (filterKey === 'minPrice') {
            return item.price >= filterValue;
          }
          if (filterKey === 'maxPrice') {
            return item.price <= filterValue;
          }
          if (filterKey === 'color') {
            return item.color === filterValue;
          }
          if (filterKey === 'model') {
            return item.model === filterValue;
          }
          return true;
        });
      };
    };

    setFilteredList(sortedList);
  };

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    if (!token) {
      navigate('/login');
    };

    getProducts();
    setListSize(10);
    return () => {
      setProductList([])
    }
  }, [])

  useEffect(() => {
    if (productList?.length) {
      setLoading(false);
      setFilteredList(productList)
    };

  }, [productList]);

  useEffect(() => {
    if (filteredList?.length) {
      setPages(Math.ceil(filteredList.length / (listSize || 1)));
    } else {
      setPages(1);
    }
  }, [filteredList])

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
                onClick={() => navigate('/produto/new')}
                className={`text-white bg-text-brown px-10 rounded-3xl hover:brightness-125 transition duration-300`}
              />
              <button type="button" onClick={() => setFilterMenu(true)}>
                <img src={Filter} alt={`filter-icon.svg`} className={`hover:brightness-125 transition duration-300 cursor-pointer`} />
              </button>
            </section>
            <section className={`w-full border-2 border-gray-50 rounded-lg py-8 px-2`}>
                <li className="grid grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr,0.2fr,0.2fr] gap-4 w-full font-medium mb-4 bg-white h-fit border-y border-gray-50 py-4 px-6">
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
              <div className={`overflow-y-scroll pr-2 max-h-72`}>
                <ul className={`flex-col w-full h-full bg-coral border-b border-gray-50 mb-2`}>
                  {
                    filteredList?.filter((e, index) => listSize ? index < listSize : filteredList.length).map((product, index) => (
                      <li
                        className="grid grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr,0.2fr,0.2fr] gap-4 w-full bg-white h-fit border-t border-gray-50 py-4 px-6"
                      >
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
                        <button
                          type="button"
                          onClick={() => navigate(`/produto/edit/${product.id}`)}
                        >
                          <img
                            src={EditIcon}
                            alt={`editar`}
                            className={`hover:brightness-200 transition duration-300 cursor-pointer`}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <img
                            src={DeleteIcon}
                            alt={`deletar`}
                            className={`hover:brightness-200 transition duration-300 cursor-pointer`}
                          />
                        </button>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className={`flex pl-4 pt-4 gap-4 align-middle h-10`}>
                <img src={LeftArrow} alt={`back-page`} className={`hover:brightness-125 transition duration-300 cursor-pointer`} />
                <p>{`Página ${1} de ${pages}`}</p>
                <img src={RightArrow} alt={`foward-page`} className={`hover:brightness-125 transition duration-300 cursor-pointer`} />
              </div>
            </section>

            <ModalContainer
            isActive={filterMenu}
            closeModal={() => setFilterMenu(false)}
          >
            <FilterMenu
              isActive={filterMenu}
              closeModal={() => setFilterMenu(false)}
              itemsArray={productList}
              selectedManufacturer={selectedManufacturer}
              setSelectedManufacturer={setSelectedManufacturer}
              selectedMinPrice={selectedMinPrice}
              setSelectedMinPrice={setSelectedMinPrice}
              selectedMaxPrice={selectedMaxPrice}
              setSelectedMaxPrice={setSelectedMaxPrice}
              setFilteredList={setFilteredList}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              models={models}
              setModels={setModels}
            />
          </ModalContainer>
          </main>
        }
      />
    )
  );
};

export default Home;
