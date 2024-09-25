/* eslint-disable eqeqeq */
import styled from 'styled-components';

export const Wrap = styled.div`
  flex: ${(props) => (props.type == 'multitext' ? '1 1 100%' : '1 1 33%')};
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #000;
  padding: 5px 15px;
  min-width: 260px;

  svg {
    color: red;
  }

  * {
    margin: 0 5px;
  }
`;
