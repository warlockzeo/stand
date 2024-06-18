import styled from 'styled-components';

export const LastReleasesStyles = styled.div`
  padding: 40px;
  background-color: #000;
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
      color: #fff;
    }

    .btn-actual {
      color: red;
      font-weight: bold;
    }
  }
`;
