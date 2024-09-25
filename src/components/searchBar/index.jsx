/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

import { DualRange } from '../index';
import { SearchBarStyled } from './styles';

const SearchBar = ({ list, onChange }) => {
  const [marcaSelected, setMarcaSelected] = useState('');
  const [modeloSelected, setModeloSelected] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [precoMaximo, setPrecoMaximo] = useState(0);

  useEffect(() => {
    onChange('modelo', '');
    if (marcaSelected) {
      setModelos(
        [
          ...new Set(
            list
              .filter((car) => car.marca == marcaSelected)
              .map((car) => car.modelo)
          ),
        ].sort()
      );
    } else {
      setModelos([...new Set(list.map((car) => car.modelo))].sort());
    }
  }, [marcaSelected]);

  useEffect(() => {
    setPrecoMaximo(Math.max(...list.map((car) => Number(car.preco))));
    setMarcas([...new Set(list.map((car) => car.marca))].sort());
    setModelos([...new Set(list.map((car) => car.modelo))].sort());
  }, [list]);

  useEffect(() => {
    setPrecoMaximo(Math.max(...list.map((car) => Number(car.preco))));
  }, []);

  return (
    <SearchBarStyled>
      <Row>
        <Col xs={12} sm={2}>
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
        <Col xs={12} sm={2}>
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
          sm={4}
          style={{ flexDirection: 'row', display: 'flex', gap: 5 }}
        >
          Preço:
          <DualRange
            min={0}
            max={precoMaximo}
            step={500}
            onChange={(e) => onChange('preco', e)}
          />
        </Col>
      </Row>
    </SearchBarStyled>
  );
};

export default SearchBar;
