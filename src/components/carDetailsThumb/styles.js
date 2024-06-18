import styled from 'styled-components';

export const Wrap = styled.div`
  position: relative;
  padding: 0;
  background-color: #222;
  display: flex;
  flex-direction: column;
  border: solid thin #444;
  border-radius: 0 0 15px 15px;
  margin: 5px;
  text-decoration: none;
  color: #fff;
  overflow: hidden;

  .foto {
    width: 100%;
    height: 300px;
    background-position: center center;
    background-size: cover;
  }

  span {
    padding: 0 10px;
    &.marca {
      font-size: 28px;
      font-weight: bold;
      color: red;
    }

    &.details {
      margin: 0;

      .icon {
        margin: 0 5px 0 10px;

        :first-child {
          margin: 0 5px 0 0;
        }
      }
    }
  }

  .preco {
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.7847514005602241) 40%,
      rgba(255, 255, 255, 0) 100%
    );
    color: #fff;
    font-size: 26px;
    font-weight: bold;
    text-align: right;
    padding: 10px;
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
