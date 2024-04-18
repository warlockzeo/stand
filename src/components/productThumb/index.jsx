import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { SERVER_URL } from '../../utils/constants';
import noImage from '../../features/no-image.png';
import { Wrap } from './styles';

const ProductThumb = ({ product }) => {
  const navigate = useNavigate();
  const { id, fileName, marca, modelo, ano, kms, preco, vendido } = product;
  return (
    <Wrap onClick={() => navigate(`/product/${id}`)}>
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

      <span>Marca: {marca}</span>
      <span>Modelo: {modelo}</span>
      <span>Ano: {ano}</span>
      <span>Kms: {kms}</span>
      <span className='preco'>Preço: {formatCurrency(preco)}</span>
    </Wrap>
  );
};

export default ProductThumb;
