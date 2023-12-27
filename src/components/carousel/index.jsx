import React from 'react';

import Carousel from 'react-bootstrap/Carousel';
import { BannerCarousel } from './styles';

const Banner = ({ data }) => {
  return (
    <BannerCarousel>
      {Array.isArray(data) ? (
        <Carousel fade>
          {data?.map((carro, index) => {
            if (Array.isArray(carro.fotos))
              return (
                <Carousel.Item key={index}>
                  <div
                    className='carousel-foto'
                    style={{
                      backgroundImage: `url(${carro.fotos[0]})`,
                    }}
                  ></div>

                  <Carousel.Caption>
                    <h3>{carro.marca}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              );
          })}
        </Carousel>
      ) : (
        <Carousel fade>
          {data?.fotos?.map((foto, index) => (
            <Carousel.Item key={index}>
              {console.log(foto)}
              <div
                className='carousel-foto'
                style={{
                  backgroundImage: `url("../${foto}")`,
                }}
              ></div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </BannerCarousel>
  );
};

export default Banner;
