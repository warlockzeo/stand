import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Wrap } from './styles';

const DetailsThumb = ({ id, vendido, url, children }) => {
  const navigate = useNavigate();

  return (
    <Wrap onClick={() => navigate(`${url}/${id}`)}>
      <div className='cover hand-pointer'></div>
      {vendido == 1 && <div className='vendido'>Vendido</div>}
      {children}
    </Wrap>
  );
};

export default DetailsThumb;
