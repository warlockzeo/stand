import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { SERVER_URL } from '../../utils/constants';
import noImage from '../../features/no-image.png';
import { Wrap } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CarDetailsThumb = ({ car }) => {
  const navigate = useNavigate();
  const {
    id,
    fileName,
    marca,
    modelo,
    registo,
    quilometros,
    preco,
    vendido,
    combustivel,
  } = car;
  return (
    <Wrap onClick={() => navigate(`/car/${id}`)}>
      <div className='cover hand-pointer'></div>
      {vendido == 1 && <div className='vendido'>Vendido</div>}
      <div
        className='foto'
        style={{
          backgroundImage: `url(${
            fileName ? `${SERVER_URL}/imagens/${fileName}` : noImage
          })`,
        }}
      ></div>

      <p>
        <span className='marca'>{marca}</span>
        <span>{modelo}</span>
      </p>
      <span className='details'>
        <FontAwesomeIcon icon='fa-solid fa-calendar-days' className='icon' />
        {registo}
        <FontAwesomeIcon icon='fa-solid fa-road' className='icon' />
        {quilometros}
        <FontAwesomeIcon icon='fa-solid fa-gas-pump' className='icon' />
        {combustivel}
      </span>
      <span className='preco'>{formatCurrency(preco)}</span>
    </Wrap>
  );
};

export default CarDetailsThumb;
