import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Loading from './components/Loading';
import TwoColumns from '../../layouts/TwoColumns/TwoColumns';
import SideBar from './components/SideBar';
import Filter from '../../images/svg/filter.svg';
import PrimaryButton from './components/PrimaryButton';
import ModalContainer from './components/ModalContainer';
import FilterMenu from './components/FilterMenu';
import ProductsContainer from './components/ProductsContainer';
import SearchBar from './components/SearchBar';
import FilterButton from './components/FilterButton';

const Home = () => {
  const {
    productList,
    setProductList,
    filteredList,
    setFilteredList,
    listSize,
    setListSize,
    getProducts,
    deleteProduct,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [filterMenu, setFilterMenu] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [models, setModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const filterBySearchTerm = ({target}) => {
    const {value} = target;
    setSearchTerm(value);
    let filtered = productList.filter((e) => e.name.toLowerCase().includes(value.toLowerCase()));

    const filters = {
      brand: selectedManufacturer,
      minPrice: selectedMinPrice,
      maxPrice: selectedMaxPrice,
      color: selectedColor,
      model: selectedModel,
    };

    for (const filterKey in filters) {
      const filterValue = filters[filterKey];
      if (filterValue) {
        filtered = filtered.filter(item => {
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

    setFilteredList(filtered);
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
      setFilteredList(productList)
      setLoading(false);
    };

  }, [productList]);

  return (
    loading ? <Loading /> : (
      <TwoColumns
        column1={<SideBar />}
        column2={
          <main className={`flex flex-col justify-between p-10 pb-1 w-full lg:p-2 h-full`}>
            <header className={`flex w-full`}>
              <h1 className={`font-bold text-5xl w-full text-text-brown md:text-3xl`}>
                Lista de produtos
              </h1>
            </header>
            <section className={`flex justify-start w-full gap-2`}>
              <PrimaryButton
                title={`Adicionar produto`}
                name={`add-product`}
                onClick={() => navigate('/produto/new')}
                className={`w-2/5 max-w-56 text-white bg-text-brown px-10 rounded-3xl hover:brightness-125 transition duration-300 text-base md:text-xs `}
              />
              <SearchBar
                value={searchTerm}
                placeholder={'Buscar por nome'}
                onChange={filterBySearchTerm}
              />
              <FilterButton onClick={setFilterMenu} image={Filter} />         
            </section>
            <ProductsContainer
              setFilteredList={setFilteredList}
              productList={productList}
              filteredList={filteredList}
              listSize={listSize}
              deleteProduct={deleteProduct}
              selectedManufacturer={selectedManufacturer}
              selectedMinPrice={selectedMinPrice}
              selectedMaxPrice={selectedMaxPrice}
              selectedColor={selectedColor}
              selectedModel={selectedModel}
            />
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
                listSize={listSize}
                setListSize={setListSize}
              />
            </ModalContainer>
          </main>
        }
      />
    )
  );
};

export default Home;
