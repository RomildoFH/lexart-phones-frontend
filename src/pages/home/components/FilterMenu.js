import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';

const FilterMenu = ({
  itemsArray,
  selectedManufacturer,
  setSelectedManufacturer,
  selectedMinPrice,
  setSelectedMinPrice,
  selectedMaxPrice,
  setSelectedMaxPrice,
  setFilteredList,
  selectedColor,
  setSelectedColor,
  selectedModel,
  setSelectedModel,
  models,
  setModels,
  listSize,
  setListSize,
}) => {

  const uniqueColors = Array.from(new Set(itemsArray.map(item => item.color)));
  const uniqueManufacturers = Array.from(new Set(itemsArray.map(item => item.brand)));

  const generateModels = () => {
    const modelsSet = new Set(itemsArray
      .filter(item => item.brand.toLowerCase() === selectedManufacturer.toLowerCase())
      .map(item => item.model));
    setModels(Array.from(modelsSet));
  };

  const clearFilters = () => {
    setSelectedManufacturer('');
    setSelectedMinPrice('');
    setSelectedMaxPrice('');
    setSelectedColor('');
    setSelectedModel('');
    setModels([]);
    setFilteredList(itemsArray);
  };

  const applyFilters = () => {
    let filteredData = [...itemsArray];
    if (selectedManufacturer) {
      filteredData = filteredData.filter(item => item.brand.toLowerCase() === selectedManufacturer.toLowerCase());
      setSelectedManufacturer(selectedManufacturer);
    }
    if (selectedMinPrice) {
      filteredData = filteredData.filter(item => Number(item.price) >= Number(selectedMinPrice));
      setSelectedMinPrice(Number(selectedMinPrice));
    }
    if (selectedMaxPrice) {
      filteredData = filteredData.filter(item => Number(item.price) <= Number(selectedMaxPrice));
      setSelectedMaxPrice(Number(selectedMaxPrice));
    }
    if (selectedColor) {
      filteredData = filteredData.filter(item => item.color === selectedColor);
      setSelectedColor(selectedColor);
    }
    if (selectedModel) {
      filteredData = filteredData.filter(item => item.model === selectedModel);
      setSelectedModel(selectedModel);
    }
    if (listSize) {
      setListSize(listSize);
    }
    setFilteredList(filteredData);
  };

  return (
    <section className="flex flex-col p-6 bg-white rounded-2xl sm:max-w-80 sm:text-sm">
      <h2 className="text-2xl font-bold mb-4 text-text-brown">Filtrar Produtos</h2>
      <article className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="manufacturer">Fabricante:</label>
          <select
            id="manufacturer"
            value={selectedManufacturer}
            onChange={(e) => setSelectedManufacturer(e.target.value)}
            onBlur={generateModels}
            className="border border-gray-300 rounded-md px-2 py-1 h-9"
            aria-label="Fabricante"
          >
            <option value="">Selecione</option>
            {uniqueManufacturers.map(manufacturer => (
              <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
            ))}
          </select>
        </div>
        {models.length > 0 && (
          <div className="flex flex-col">
            <label htmlFor="model">Modelo:</label>
            <select
              id="model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 h-9 max-h-20 overflow-y-auto"
              aria-label="Modelo"
            >
              <option value="">Selecione</option>
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
        )}
        <div className="flex flex-col">
          <label htmlFor="minPrice">Preço mínimo:</label>
          <input
            type="number"
            id="minPrice"
            value={selectedMinPrice}
            onChange={(e) => setSelectedMinPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
            aria-label="Preço mínimo"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="maxPrice">Preço máximo:</label>
          <input
            type="number"
            id="maxPrice"
            value={selectedMaxPrice}
            onChange={(e) => setSelectedMaxPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
            aria-label="Preço máximo"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="color">Cor:</label>
          <select
            id="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 h-9"
            aria-label="Cor"
          >
            <option value="">Selecione</option>
            {uniqueColors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="maxPrice">Itens por página:</label>
          <input
            type="number"
            min={1}
            id="listSize"
            value={listSize || 1}
            onChange={(e) => setListSize(e.target.value)}
            onBlur={() => applyFilters()}
            className="border border-gray-300 rounded-md px-2 py-1"
            aria-label="Tamanho da lista"
          />
        </div>
        <div className="flex justify-between">
          <PrimaryButton title={'Aplicar Filtros'} onClick={applyFilters} className={`text-white bg-text-brown px-10 w-60 rounded-3xl hover:brightness-125 transition duration-300`} />
          <button onClick={clearFilters} className={`flex justify-center h-8 w-1/2 font-medium text-gray-70 gap-2 mt-3 px-2 hover:brightness-125 hover:drop-shadow-gray hover:scale-105`}>Limpar Filtros</button>
        </div>
      </article>
    </section>
  );
};

export default FilterMenu;
