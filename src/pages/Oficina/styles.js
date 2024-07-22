import styled from 'styled-components';

export const Wrap = styled.div`
  width: 100%;
  min-height: calc(100vh - 65px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    padding: 10px;
  }
  div.carousel {
    background-color: transparent;
  }
`;
