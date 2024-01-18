import React, { useState } from 'react';
import { SearchBarStyled } from './styles';
import { useFormatCurrency } from '../../hooks/useFormatCurrency';

const SearchBar = ({ list, onChange }) => {
  const [price, setPrice] = useState(0);

  const marcas = list
    .map((car) => car.marca)
    .filter(function (elem, pos, self) {
      return self.indexOf(elem) === pos;
    });

  const modelos = list
    .map((car) => car.modelo)
    .filter(function (elem, pos, self) {
      return self.indexOf(elem) === pos;
    });

  const onDropRange = (e) => {
    const val = e.currentTarget.value;
    setPrice(val);
    onChange('preco', val);
  };

  return (
    <SearchBarStyled>
      Marca:
      <select
        className='form-control'
        name='brand'
        id='brand'
        onChange={(e) => onChange('marca', e.currentTarget.value)}
      >
        <option value=''>Todos</option>
        {marcas.map((marca) => (
          <option key={marca} value={marca}>
            {marca}
          </option>
        ))}
      </select>
      Modelo:
      <select
        className='form-control'
        name='model'
        id='model'
        onChange={(e) => onChange('modelo', e.currentTarget.value)}
      >
        <option value=''>Todos</option>
        {modelos.map((modelo) => (
          <option key={modelo} value={modelo}>
            {modelo}
          </option>
        ))}
      </select>
      Preço:
      <input
        type='range'
        className='multi-range form-control'
        name='price'
        id='price'
        aria-describedby='helpId'
        min='0'
        max='200000'
        step='500'
        onChange={onDropRange}
        defaultValue={price}
      />
      <input
        type='text'
        className='form-control'
        name='showPrice'
        id='showPrice'
        value={useFormatCurrency(price)}
        disabled
      />
    </SearchBarStyled>
  );
};

export default SearchBar;
