import styled from 'styled-components';

export const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin: 10px 0;

  table {
    width: 100%;
  }

  tbody tr {
    background-color: #eee;
    border-bottom: solid 5px #fff;

    :hover {
      background-color: #ddd;
    }
  }

  td {
    padding: 10px;

    :first-child {
      width: 100px;
    }

    :not(:last-child) {
      border-right: solid 2px #fff;
    }

    :last-child {
      width: 50px;
      text-align: center;
      background-color: #fff;
    }
  }

  img {
    max-width: 100%;
  }
`;
