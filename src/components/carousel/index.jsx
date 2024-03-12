import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import { SERVER_URL } from '../../utils/constants';
import { BannerCarousel } from './styles';

const Banner = ({ images }) => {
  return (
    <>
      {Array.isArray(images) ? (
        <BannerCarousel>
          <Carousel fade>
            {images?.map((car, index) => {
              return (
                <Carousel.Item key={index}>
                  <div
                    className='carousel-foto'
                    style={{
                      backgroundImage: `url("${SERVER_URL}/imagens/${car.fileName}")`,
                    }}
                  ></div>

                  <Carousel.Caption>
                    <h3>{car.marca}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </BannerCarousel>
      ) : null}
    </>
  );
};

export default Banner;
