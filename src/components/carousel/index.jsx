import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import { SERVER_URL } from '../../utils/constants';
import { BannerCarousel } from './styles';

const Banner = ({ images = [], expandeble = false }) => {
  const [expand, setExpand] = useState(expandeble);
  //const banners = [{ fullName: '/standlogo.jpg' }, ...images];

  return (
    <>
      {Array.isArray(images) ? (
        <BannerCarousel expandeble={expandeble ? expand : false}>
          <Carousel fade>
            {images?.slice(0, 5).map((car, index) => {
              const img =
                car.fullName ?? `${SERVER_URL}/imagens/${car.fileName}`;

              return (
                <Carousel.Item key={index} onClick={() => setExpand(!expand)}>
                  <div
                    className='carousel-foto'
                    style={{
                      backgroundImage: `url("${img}")`,
                    }}
                  ></div>

                  <Carousel.Caption>
                    {car.marca && car.modelo ? (
                      <h3>
                        {car.marca} {car.modelo}
                      </h3>
                    ) : null}
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
