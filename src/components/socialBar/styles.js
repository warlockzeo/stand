import styled from 'styled-components';

export const SocialBarStyle = styled.div`
  position: fixed;
  top: 100px;
  background-color: blue;
  display: flex;
  flex-direction: column;
  z-index: 999;

  * {
    font-size: 50px;
    color: #fff;
    padding: 10px;
  }
`;
