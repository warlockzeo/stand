import React from 'react';

import { CarDetailsThumb } from '../../components';
import { LastReleasesStyles } from './styles';

const LastReleases = ({ data }) => {
  return (
    <LastReleasesStyles>
      {data &&
        Array.isArray(data) &&
        data.map((car) => <CarDetailsThumb key={car.id} car={car} />)}
      <div className='paginacao'>PAGINAÇÃO</div>
    </LastReleasesStyles>
  );
};

export default LastReleases;
