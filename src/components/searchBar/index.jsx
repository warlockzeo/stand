import React, { useState } from 'react';
import { SearchBarStyled } from './styles';
import { useFormatCurrency } from '../../hooks/useFormatCurrency';

const SearchBar = ({ onChange }) => {
  const [price, setPrice] = useState(0);

  const onDropRange = (e) => {
    const val = e.currentTarget.value;
    setPrice(val);
    onChange({ price: val });
  };

  return (
    <SearchBarStyled>
      Marca:
      <select
        className='form-control'
        name='brand'
        id='brand'
        onChange={(e) => onChange({ brand: e.curre.value })}
      ></select>
      Modelo:
      <select
        className='form-control'
        name='model'
        id='model'
        onChange={(e) => onChange({ model: e.curre.value })}
      ></select>
      Preço:
      <input
        type='range'
        className='multi-range form-control'
        name='price'
        id='price'
        aria-describedby='helpId'
        min='1000'
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
