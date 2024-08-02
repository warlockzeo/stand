import styled from 'styled-components';

export const ShopcartStyle = styled.div`
  position: relative;
  padding: 0.5rem;

  .cover-all {
    position: fixed;
    top: 0;
    left: 0;
    width: 99%;
    height: 99vh;
    z-index: 90;
    background-color: transparent;
  }

  .items-number {
    cursor: pointer;
    position: absolute;
    top: -2px;
    right: -2px;
    border-radius: 45px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
    color: white;
    font-size: 10px;
  }

  .items {
    position: absolute;
    top: 40px;
    right: 0;
    padding: 10px;
    border-radius: 15px;
    background-color: #fff;
    color: #000;
    width: 200px;
    z-index: 999;

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
    }

    li:hover {
      background-color: #eee;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
`;
