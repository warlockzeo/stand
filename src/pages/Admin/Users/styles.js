import styled from 'styled-components';

export const Wrap = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${(props) => (props.isLoading ? 'center' : 'flex-start')};
  width: 100%;
  margin: 10px 0;

  table {
    width: 100%;
  }

  tbody tr {
    background-color: #333;
    border-bottom: solid 5px #000;

    :hover {
      background-color: #555;
    }
  }

  td {
    padding: 10px;

    :first-child {
      width: 100px;
    }

    :not(:last-child) {
      border-right: solid 2px #000;
    }

    :last-child {
      width: 50px;
      text-align: center;
      background-color: #000;
    }
  }

  img {
    max-width: 100%;
  }

  .delete-icon {
    background-color: #000;
    border-radius: 45px;
    color: red;

    &:hover {
      color: #ccc;
    }
  }
`;
