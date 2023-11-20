import styled from 'styled-components';

export const CarDetailsStyled = styled.div`
  min-height: calc(100vh - 65px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Destaq = styled.section`
  position: sticky;
  top: 64px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: rgba(20, 35, 85, 0.15) 0px 2px 6px 0px;

  h1,
  h2,
  p {
    margin-bottom: 0;
  }

  h1 {
    font-weight: bold;
  }

  h2 {
    color: red;
    font-weight: bold;

    span {
      font-size: 18px;
      font-weight: normal;
    }
  }

  p {
    background-color: #ffffff;
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  p {
    margin: 0;
    padding: 5px 10px;
  }

  div {
    margin-bottom: 10px;
  }

  span {
    font-weight: bold;
  }

  p:nth-child(even) {
    background-color: #eee;
  }
`;
