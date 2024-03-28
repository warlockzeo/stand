import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { SearchBarStyled } from './styles';
import { formatCurrency } from '../../utils/formatCurrency';

const SearchBar = ({ list, onChange }) => {
  const [price, setPrice] = useState(0);

  const marcas = list
    .map((car) => car.marca)
    .filter(function (elem, pos, self) {
      return self.indexOf(elem) == pos;
    });

  const modelos = list
    .map((car) => car.modelo)
    .filter(function (elem, pos, self) {
      return self.indexOf(elem) == pos;
    });

  const onDropRange = (e) => {
    const val = e.currentTarget.value;
    setPrice(val);
    onChange('preco', val);
  };

  return (
    <SearchBarStyled>
      <Row>
        <Col sm={12} md={3}>
          <select
            className='form-control'
            name='brand'
            id='brand'
            onChange={(e) => onChange('marca', e.currentTarget.value)}
          >
            <option value=''>Marca</option>
            {marcas.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            ))}
          </select>
        </Col>
        <Col sm={12} md={3}>
          <select
            className='form-control'
            name='model'
            id='model'
            onChange={(e) => onChange('modelo', e.currentTarget.value)}
          >
            <option value=''>Modelo</option>
            {modelos.map((modelo) => (
              <option key={modelo} value={modelo}>
                {modelo}
              </option>
            ))}
          </select>
        </Col>
        <Col
          sm={12}
          md={3}
          style={{ flexDirection: 'row', display: 'flex', gap: 5 }}
        >
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
            style={{ padding: '6px 2px' }}
          />
        </Col>
        <Col sm={12} md={3}>
          <input
            type='text'
            className='form-control'
            name='showPrice'
            id='showPrice'
            value={formatCurrency(price)}
            disabled
          />
        </Col>
      </Row>
    </SearchBarStyled>
  );
};

export default SearchBar;
