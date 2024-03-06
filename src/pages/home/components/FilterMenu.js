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
}) => {
  const [manufacturer, setManufacturer] = useState(selectedManufacturer || '');
  const [minPrice, setMinPrice] = useState(selectedMinPrice || '');
  const [maxPrice, setMaxPrice] = useState(selectedMaxPrice || '');
  const [color, setColor] = useState(selectedColor || '');
  const [model, setModel] = useState(selectedModel || '');

  const uniqueColors = Array.from(new Set(itemsArray.map(item => item.color)));

  const generateModels = () => {
    const modelsSet = new Set(itemsArray
      .filter(item => item.brand.toLowerCase() === manufacturer.toLowerCase())
      .map(item => item.model));
    setModels(Array.from(modelsSet));
  };

  const clearFilters = () => {
    setManufacturer('');
    setSelectedManufacturer('');
    setMinPrice('');
    setSelectedMinPrice('');
    setMaxPrice('');
    setSelectedMaxPrice('');
    setColor('');
    setSelectedColor('');
    setModel('');
    setModels([]);
    setFilteredList(itemsArray);
  };

  const applyFilters = () => {
    let filteredData = [...itemsArray];
    if (manufacturer) {
      filteredData = filteredData.filter(item => item.brand.toLowerCase() === manufacturer.toLowerCase());
      setSelectedManufacturer(manufacturer);
    }
    if (minPrice) {
      filteredData = filteredData.filter(item => Number(item.price) >= Number(minPrice));
      setSelectedMinPrice(Number(minPrice));
    }
    if (maxPrice) {
      filteredData = filteredData.filter(item => Number(item.price) <= Number(maxPrice));
      setSelectedMaxPrice(Number(maxPrice));
    }
    if (color) {
      filteredData = filteredData.filter(item => item.color === color);
      setSelectedColor(color);
    }
    if (model) {
      filteredData = filteredData.filter(item => item.model === model);
      setSelectedModel(model);
    }
    setFilteredList(filteredData);
  };

  return (
    <section className="p-6 bg-white rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-text-brown">Filtrar Produtos</h2>
      <article className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="manufacturer">Fabricante:</label>
          <input
            type="text"
            id="manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            onBlur={generateModels}
            className="border border-gray-300 rounded-md px-2 py-1"
            aria-label="Fabricante"
          />
        </div>
        {models.length > 0 && (
          <div className="flex flex-col">
            <label htmlFor="model">Modelo:</label>
            <select
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1"
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
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
            aria-label="Preço mínimo"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="maxPrice">Preço máximo:</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
            aria-label="Preço máximo"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="color">Cor:</label>
          <select
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
            aria-label="Cor"
          >
            <option value="">Selecione</option>
            {uniqueColors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
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
