import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { SearchBarProductsStyled } from './styles';
import { formatCurrency } from '../../utils/formatCurrency';

const SearchBarProducts = ({ list, onChange }) => {
  const [price, setPrice] = useState(0);

  const onDropRange = (e) => {
    const val = e.currentTarget.value;
    setPrice(val);
    onChange('preco', val);
  };

  return (
    <SearchBarProductsStyled>
      <Row>
        <Col
          xs={12}
          sm={3}
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
            max='2000'
            step='5'
            onChange={onDropRange}
            defaultValue={price}
            style={{ padding: '6px 2px' }}
          />
        </Col>
        <Col xs={12} sm={3}>
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
    </SearchBarProductsStyled>
  );
};

export default SearchBarProducts;
