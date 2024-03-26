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

  .delete-icon {
    background-color: #fff;
    border-radius: 45px;
    color: red;

    &:hover {
      color: #ccc;
    }
  }
`;
