import styled from 'styled-components';

export const Wrap = styled.div`
  position: relative;
  padding: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border: solid thin #ccc;
  margin: 5px;
  text-decoration: none;
  color: #000;
  overflow: hidden;

  .foto {
    width: 100%;
    height: 200px;
    background-position: center center;
    background-size: cover;
  }

  span {
    padding: 2px 10px;
  }

  span:nth-child(even) {
    background-color: #eee;
  }

  .preco {
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.7847514005602241) 40%,
      rgba(255, 255, 255, 0) 100%
    );
    color: #fff;
    font-weight: bold;
  }

  .cover {
    background-color: rgba(0, 0, 0, 0);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 99;
    :hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  .vendido {
    position: absolute;
    top: 25px;
    left: -40px;
    padding: 5px 50px;
    color: #fff;
    background-color: red;
    rotate: -45deg;
    font-weight: bold;
  }
`;
