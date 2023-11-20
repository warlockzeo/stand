import styled from 'styled-components';

export const Wrap = styled.div`
  form {
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
`;
