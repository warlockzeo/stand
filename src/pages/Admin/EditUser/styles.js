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
    background-color: #fff;
    width: 100%;
    margin-bottom: 10px;
    padding: 20px;

    .form-input {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #fff;
      padding: 0;
      min-width: 260px;

      @media screen and (max-width: 767px) {
        margin-bottom: 10px;
      }
    }

    * {
      margin: 0 5px;
    }
  }

  .form-buttons {
    display: flex;
    flex-direction: row;
    justify-content: right;
    background-color: #fff;
    padding: 10px;
    margin: 10px 0 0;
    width: 100%;
  }

  .tab-content {
    width: 100%;
  }

  .foto {
    position: relative;
    height: 200px;
    margin-top: 5px;
    margin-bottom: 5px;
    background-position: center center;
    background-size: cover;
    border: #ccc 2px solid;
  }

  .delete-icon {
    width: 10px;
    height: 10px;
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
`;
