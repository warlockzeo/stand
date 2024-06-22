import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

import { SearchBarStyled } from './styles';
import { formatCurrency } from '../../utils/formatCurrency';

const SearchBar = ({ list, onChange }) => {
  const [price, setPrice] = useState(0);
  const [marcaSelected, setMarcaSelected] = useState('');
  const [modeloSelected, setModeloSelected] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);

  const onDropRange = (e) => {
    const val = e.currentTarget.value;
    setPrice(val);
    onChange('preco', val);
  };

  useEffect(() => {
    onChange('modelo', '');
    if (marcaSelected) {
      setModelos(
        [
          ...new Set(
            list
              .filter((car) => car.marca === marcaSelected)
              .map((car) => car.modelo)
          ),
        ].sort()
      );
    } else {
      setModelos([...new Set(list.map((car) => car.modelo))].sort());
    }
  }, [marcaSelected]);

  useEffect(() => {
    setMarcas([...new Set(list.map((car) => car.marca))].sort());
    setModelos([...new Set(list.map((car) => car.modelo))].sort());
  }, [list]);

  return (
    <SearchBarStyled>
      <Row>
        <Col xs={12} sm={3}>
          <select
            className='form-control'
            name='brand'
            id='brand'
            onChange={(e) => {
              setMarcaSelected(e.currentTarget.value);
              setModeloSelected('');
              onChange('marca', e.currentTarget.value);
            }}
          >
            <option value=''>{marcaSelected ? 'Todas' : 'Marca'}</option>
            {marcas.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            ))}
          </select>
        </Col>
        <Col xs={12} sm={3}>
          <select
            value={modeloSelected}
            className='form-control'
            name='model'
            id='model'
            onChange={(e) => {
              setModeloSelected(e.currentTarget.value);
              onChange('modelo', e.currentTarget.value);
            }}
          >
            <option value=''>{modeloSelected ? 'Todos' : 'Modelo'}</option>
            {modelos.map((modelo) => (
              <option key={modelo} value={modelo}>
                {modelo}
              </option>
            ))}
          </select>
        </Col>
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
            max='200000'
            step='500'
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
    </SearchBarStyled>
  );
};

export default SearchBar;
