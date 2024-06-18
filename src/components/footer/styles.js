import styled from 'styled-components';

export const FooterStyles = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #000;
  color: white;
  padding: 40px 40px 0;
  margin: 0;

  section {
    padding: 10px;
  }

  h1 {
    font-size: x-large;
    border-bottom: solid 2px red;
    color: red;
  }

  i {
    margin-right: 10px;
  }

  a:link,
  a:visited {
    color: #fff;
  }
  a:hover {
    color: red;
  }
`;
