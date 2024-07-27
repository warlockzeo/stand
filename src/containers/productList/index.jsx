import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';

import { formatCurrency } from '../../utils/formatCurrency';
import { SERVER_URL } from '../../utils/constants';
import noImage from '../../features/no-image.png';

import { DetailsThumb } from '../../components';
import { ProductListStyles } from './styles';

const ProductList = ({ data }) => {
  const itensPerPage = 6;
  const [actualPage, setActualPage] = useState(1);
  const [start, setStart] = useState(0);

  const pagesLenght = Math.ceil(data?.length / itensPerPage);

  const ProductsList =
    data && Array.isArray(data) ? data.slice(start, start + itensPerPage) : [];

  const PagesLink = () => {
    let buttonsList = [];

    for (let i = 1; i <= pagesLenght; i++) {
      buttonsList.push(
        <button
          className={`btn ${actualPage === i ? 'btn-actual' : ''}`}
          key={i}
          onClick={() => setActualPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttonsList;
  };

  useEffect(() => {
    setStart((actualPage - 1) * itensPerPage);
  }, [actualPage]);

  return (
    <>
      {Array.isArray(data) && data.length ? (
        <ProductListStyles>
          {ProductsList.map((product) => (
            <Col xs={12} sm={6} md={4} key={product.id}>
              <DetailsThumb
                url='/product'
                id={product.id}
                vendido={product.vendido}
              >
                <div
                  className='foto'
                  style={{
                    backgroundImage: `url(${
                      product.fileName
                        ? `${SERVER_URL}/imagens/${product.fileName}`
                        : noImage
                    })`,
                  }}
                ></div>
                <p>
                  <span className='marca'>{product.name}</span>
                  <span>{product.descr}</span>
                </p>
                <span className='preco'>
                  Preço: {formatCurrency(product.preco)}
                </span>
              </DetailsThumb>
            </Col>
          ))}
          <div className='paginacao'>
            <button className='btn' onClick={() => setActualPage(1)}>
              {'<<'}
            </button>
            <PagesLink />
            <button className='btn' onClick={() => setActualPage(pagesLenght)}>
              {'>>'}
            </button>
          </div>
        </ProductListStyles>
      ) : null}
    </>
  );
};

export default ProductList;
