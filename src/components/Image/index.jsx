import React from 'react';
import noImage from '../../features/no-image.png';
import { SERVER_URL } from '../../utils/constants';

const Image = ({ src, alt, ...rest }) => {
  return (
    <img
      src={src ? `${SERVER_URL}/imagens/${src}` : noImage}
      alt={alt}
      {...rest}
    />
  );
};

export default Image;
