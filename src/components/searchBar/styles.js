import styled from 'styled-components';

export const SearchBarStyled = styled.div`
  width: 100%;
  background-color: #000;
  margin-top: 5px;
  padding: 20px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input,
  select {
    margin: 0 10px;
  }

  #showPrice {
    max-width: 150px;
    text-align: right;
    font-weight: bold;
  }
`;
