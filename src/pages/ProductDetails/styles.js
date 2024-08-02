import styled from 'styled-components';

export const ProductDetailsStyled = styled.div`
  width: 100%;
  min-height: calc(100vh - 65px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Destaq = styled.section`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  flex-wrap: wrap;
  padding: 0 10px;

  h1,
  h2,
  p {
    margin: 0;
  }

  h1 {
    font-weight: bold;
    font-size: 24px;
  }

  h2 {
    color: red;
    font-weight: bold;
    font-size: 24px;
    text-align: right;
    padding-right: 20px;
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 20px;

  @media screen and (min-width: 426px) {
    flex-direction: row;
    margin-bottom: 85px;
  }

  img {
    border-radius: 15px;
    padding: 5px;
  }

  div {
    margin-bottom: 10px;
  }

  .field {
    display: flex;
    color: #fff;
    font-weight: bold;
    align-items: center;

    svg {
      font-size: 33px;
      margin-right: 10px;
    }

    img {
      filter: invert(1);
      width: 33px;
      height: 33px;
      margin-right: 10px;
    }

    div {
      margin-bottom: 0;
    }

    span {
      font-weight: normal;
      display: block;
      color: #ccc;
    }
  }
`;
