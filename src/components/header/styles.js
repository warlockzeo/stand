import styled from 'styled-components';

export const Wrap = styled.div`
  width: 100%;
  /* position: fixed; */
  top: 0;
  z-index: 999;
  box-shadow: rgba(20, 35, 85, 0.15) 0px 2px 6px 0px;

  .navbar {
    background-color: #000 !important;
    color: #fff;
    min-height: 7vh;
  }

  .navbar-brand {
    span {
      color: red;
      font-weight: bold;
    }

    img {
      width: 50px;
      margin-right: 20px;
    }
  }

  .navbar-collapse {
    margin-top: 10px;
  }

  .nav-link:hover {
    color: red;
  }

  .dropdown-menu {
    background-color: #000 !important;
    color: #fff;
  }
`;
