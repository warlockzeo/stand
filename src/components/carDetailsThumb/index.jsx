import React from 'react';
import { useFormatCurrency } from '../../hooks/useFormatCurrency';
import { Wrap } from './styles';
import { useNavigate } from 'react-router-dom';

const CarDetailsThumb = ({ car }) => {
  const navigate = useNavigate();
  const { id, fotos, marca, modelo, ano, kms, preco } = car;
  return (
    <Wrap onClick={() => navigate(`/car/${id}`)}>
      <div className='cover'></div>
      <div
        className='foto'
        style={{
          backgroundImage: `url(${fotos?.[0]})`,
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
