import styled from 'styled-components';

export const ProductListStyles = styled.div`
  padding: 40px;
  background-color: #fff;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .paginacao {
    width: 100%;
    text-align: center;

    .btn,
    .btn-actual {
      border: none;
      background-color: transparent;
      color: blue;
    }

    .btn-actual {
      color: red;
      font-weight: bold;
    }
  }
`;
