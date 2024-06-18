import styled from 'styled-components';

export const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin: 10px 0;

  form {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
    width: 100%;
    background-color: #eee;
  }

  .input-fields {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #eee;
    width: 100%;
  }
  .form-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #000;
    width: 100%;
    margin-bottom: 10px;
    padding: 20px;

    .form-input {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #000;
      padding: 0;
      min-width: 260px;

      @media screen and (max-width: 767px) {
        margin-bottom: 10px;
      }
    }
  }

  .form-buttons {
    display: flex;
    flex-direction: row;
    justify-content: right;
    background-color: #000;
    padding: 10px;
    margin: 10px 0 0;
    width: 100%;
  }

  .tab-content {
    width: 100%;
  }

  .foto {
    position: relative;
    margin-top: 5px;
    margin-bottom: 5px;
    border: #ccc 2px solid;

    & div {
      height: 200px;
      background-position: center center;
      background-size: cover;
      margin: 0;
    }
  }

  .delete-icon {
    width: 20px;
    height: 20px;
    position: absolute;
    bottom: 5px;
    right: 5px;
    margin: 0;
    padding: 5px;
    z-index: 999;
    background-color: #fff;
    border-radius: 45px;
    color: red;

    &:hover {
      color: #ccc;
    }
  }

  .selected {
    border: red solid 2px;
  }

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
