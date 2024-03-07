import React, { useEffect, useState } from 'react';
import DownArrow from '../../../images/svg/arrow-down.svg';
import EditIcon from '../../../images/svg/edit-svgrepo-com.svg';
import DeleteIcon from '../../../images/svg/delete-recycle-bin-trash-can-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';
import PageControl from './PageControl';

const ProductsContainer = (
  {
    setFilteredList,
    productList,
    filteredList,
    listSize,
    deleteProduct,
  }) => {

  const [pageIndex, setPageIndex] = useState(1);
  const [pages, setPages] = useState(1);


  const navigate = useNavigate();

  const orderProducts = (sortBy) => {
    let sortedList = filteredList ? [...filteredList] : [...productList];
    
    if (sortBy !== 'item' && sortBy !== 'price') {
      sortedList.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    };

    if (sortBy === 'price') {
      sortedList.sort((a, b) => {
        if (Number(a[sortBy]) < Number(b[sortBy])) return -1;
        if (Number(a[sortBy]) > Number(b[sortBy])) return 1;
        return 0;
      });
    };

    setFilteredList(sortedList);
  };

  useEffect(() => {
    if (filteredList?.length) {
      setPages((Math.ceil(filteredList.length / (listSize || 1))) || 1);
    } else {
      setPages(1);
    }
  }, [filteredList])

  return (
    <section
      className={`flex flex-col justify-between w-full h-4/5 border-2 border-gray-50 rounded-lg pt-4 pb-2 px-2 lg:text-sm overflow-x-auto overflow-y-hidden md:max-h-400px`}
    >
      <li className="grid grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1.5fr,0.5fr] gap-1 w-full font-medium mb-4 bg-white h-fit border-y border-gray-50 py-4 px-6 min-w-530">
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
      <div className={`pr-1 h-5/6 mb-1 overflow-y-auto min-w-530`}>
        <ul className={`flex-col w-full h-full bg-coral border-b border-gray-50 mb-2 text-base lg:text-sm`}>
          {
            filteredList?.slice((pageIndex - 1) * (listSize || 1), pageIndex * (listSize || 1))
            .map((product, index) => (
              <li
                className="grid grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1.5fr,0.5fr] gap-1 w-full bg-white h-fit border-t border-gray-50 py-4 px-6 lg:gap-1 md:px-2"
              >
                <p className="overflow-hidden text-left">{(pageIndex - 1) * (listSize || 0) + index + 1}</p>
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
                <div className={`flex justify-between min-w-8 w-full`}>
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
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <PageControl
        onClick={setPageIndex}
        index={pageIndex}
        pages={pages}
      />
    </section>
  );
};

export default ProductsContainer;
