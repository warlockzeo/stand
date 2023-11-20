import React from 'react';
import styled from 'styled-components';

const NoMatchPage = () => {
  const Wrap = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 96px;
  `;

  return <Wrap>404</Wrap>;
};

export default NoMatchPage;
