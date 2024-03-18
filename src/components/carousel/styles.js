import styled from 'styled-components';

export const BannerCarousel = styled.div`
  .carousel {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
  }

  .carousel-foto {
    height: ${(props) => (props.expandeble ? '80vh' : '50vh')};
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    @media screen and (max-width: 425px) {
      height: 93vh;
    }
  }

  .carousel-caption {
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.7847514005602241) 20%,
      rgba(255, 255, 255, 0) 100%
    );
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 30px;
  }
`;
