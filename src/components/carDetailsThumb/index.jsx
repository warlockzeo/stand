import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormatCurrency } from '../../hooks/useFormatCurrency';
import { SERVER_URL } from '../../utils/constants';
import { Wrap } from './styles';

const CarDetailsThumb = ({ car }) => {
  const navigate = useNavigate();
  const { id, fileName, marca, modelo, ano, kms, preco } = car;
  return (
    <Wrap onClick={() => navigate(`/car/${id}`)}>
      <div className='cover'></div>
      <div
        className='foto'
        style={{
          backgroundImage: `url("${SERVER_URL}/imagens/${fileName ?? ''}")`,
        }}
      ></div>

      <span>Marca: {marca}</span>
      <span>Modelo: {modelo}</span>
      <span>Ano: {ano}</span>
      <span>Kms: {kms}</span>
      <span className='preco'>Preço: {useFormatCurrency(preco)}</span>
    </Wrap>
  );
};

export default CarDetailsThumb;
