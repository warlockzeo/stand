/* eslint-disable eqeqeq */
import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => (props.size == 'big' ? 'column' : 'row')};

  p {
    font-size: ${(props) => (props.size == 'big' ? '72px' : '20')};
    margin: 0;
  }

  span {
    color: red;
    font-weight: bold;
  }

  img {
    width: ${(props) => (props.size == 'big' ? '350px' : '180px')};
    margin-bottom: ${(props) => (props.size == 'big' ? '20px' : '0')};
  }
`;

const Logo = ({ size }) => {
  return (
    <Wrap size={size}>
      <img src='/standlogo.svg' alt='Stand ALLCAR' />
    </Wrap>
  );
};

export default Logo;
