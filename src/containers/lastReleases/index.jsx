/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';

import { formatCurrency } from '../../utils/formatCurrency';
import { SERVER_URL } from '../../utils/constants';
import noImage from '../../assets/no-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DetailsThumb } from '../../components';
import { LastReleasesStyles } from './styles';

const LastReleases = ({ data }) => {
  const itensPerPage = 6;
  const [actualPage, setActualPage] = useState(1);
  const [start, setStart] = useState(0);

  const pagesLenght = Math.ceil(data?.length / itensPerPage);

  const CarsList =
    data && Array.isArray(data) ? data.slice(start, start + itensPerPage) : [];

  const PagesLink = () => {
    let buttonsList = [];

    for (let i = 1; i <= pagesLenght; i++) {
      buttonsList.push(
        <button
          className={`btn ${actualPage == i ? 'btn-actual' : ''}`}
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
        <LastReleasesStyles>
          {CarsList.map((car) => (
            <Col xs={12} sm={6} md={4} key={car.id}>
              <DetailsThumb url='/car' id={car.id} vendido={car.vendido}>
                <div
                  className='foto'
                  style={{
                    backgroundImage: `url(${
                      car.fileName
                        ? `${SERVER_URL}/imagens/${car.fileName}`
                        : noImage
                    })`,
                  }}
                ></div>

                <p>
                  <span className='marca'>{car.marca}</span>
                  <span>{car.modelo}</span>
                </p>
                <span className='details'>
                  <FontAwesomeIcon
                    icon='fa-solid fa-calendar-days'
                    className='icon'
                  />
                  {car.registo}
                  <FontAwesomeIcon icon='fa-solid fa-road' className='icon' />
                  {car.quilometros}
                  <FontAwesomeIcon
                    icon='fa-solid fa-gas-pump'
                    className='icon'
                  />
                  {car.combustivel}
                </span>
                <span className='preco'>{formatCurrency(car.preco)}</span>
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
        </LastReleasesStyles>
      ) : null}
    </>
  );
};

export default LastReleases;
