import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';

import { CarDetailsThumb } from '../../components';
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
    <LastReleasesStyles>
      {CarsList.map((car) => (
        <Col xs={12} sm={6} md={4} key={car.id}>
          <CarDetailsThumb car={car} />
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
  );
};

export default LastReleases;
