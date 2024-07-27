import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

import { DualRange } from '../index';
import { SearchBarStyled } from './styles';

const SearchBarProducts = ({ list, onChange }) => {
  const [precoMaximo, setPrecoMaximo] = useState(0);

  useEffect(() => {
    setPrecoMaximo(Math.max(...list.map((car) => Number(car.preco))));
  }, [list]);

  useEffect(() => {
    setPrecoMaximo(Math.max(...list.map((car) => Number(car.preco))));
  }, []);

  return (
    <SearchBarStyled>
      <Row>
        <Col
          xs={12}
          sm={4}
          style={{ flexDirection: 'row', display: 'flex', gap: 5 }}
        >
          Preço:
          <DualRange
            min={0}
            max={precoMaximo}
            step={10}
            onChange={(e) => onChange('preco', e)}
          />
        </Col>
      </Row>
    </SearchBarStyled>
  );
};

export default SearchBarProducts;
