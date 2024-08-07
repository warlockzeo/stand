/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Swipe from 'react-easy-swipe';
import './styles.css';

const Carousel2 = ({
  data,
  time,
  width,
  height,
  captionStyle,
  slideNumberStyle,
  radius,
  slideNumber,
  style,
  captionPosition,
  dots,
  automatic,
  pauseIconColor,
  pauseIconSize,
  slideBackgroundColor,
  slideImageFit,
  thumbnails,
  thumbnailWidth,
  showNavBtn = true,
}) => {
  const [slide, setSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [change, setChange] = useState(0);
  const [photos, setPhotos] = useState(data);

  //Function to change slide
  const addSlide = (n) => {
    if (slide + n >= photos.length) setSlide(0);
    else if (slide + n < 0) setSlide(photos.length - 1);
    else setSlide(slide + n);
  };

  const scrollTo = (el) => {
    let elLeft = el.offsetLeft + el.offsetWidth;
    let elParentLeft = el.parentNode.offsetLeft + el.parentNode.offsetWidth;

    // check if element not in view
    if (elLeft >= elParentLeft + el.parentNode.scrollLeft) {
      el.parentNode.scroll({
        left: elLeft - elParentLeft,
        behavior: 'smooth',
      });
    } else if (elLeft <= el.parentNode.offsetLeft + el.parentNode.scrollLeft) {
      el.parentNode.scroll({
        left: el.offsetLeft - el.parentNode.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  //Start the automatic change of slide
  useEffect(() => {
    if (automatic && photos.length > 0) {
      let index = slide;

      const interval = setInterval(() => {
        if (!isPaused) {
          index++;
          if (index >= photos.length) index = 0;
          if (index < 0) index = photos.length - 1;
          setSlide(index);
        }
      }, time ?? 2000);
      return () => clearInterval(interval);
    }
  }, [isPaused, change, photos]);

  //Listens to slide state changes
  useEffect(() => {
    let slides = document.getElementsByClassName('carousel-item');
    let dots = document.getElementsByClassName('dot');

    const slideIndex = slide;
    let i;
    for (i = 0; i < photos.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    //If thumbnails are enabled
    if (thumbnails) {
      let thumbnailsArray = document.getElementsByClassName('thumbnail');
      for (i = 0; i < thumbnailsArray.length; i++) {
        thumbnailsArray[i].className = thumbnailsArray[i].className.replace(
          ' active-thumbnail',
          ''
        );
      }
      if (thumbnailsArray[slideIndex] !== undefined)
        thumbnailsArray[slideIndex].className += ' active-thumbnail';

      const element = document.getElementById(`thumbnail-${slideIndex}`);
      if (element) scrollTo(element);
    }

    if (slides[slideIndex] !== undefined)
      slides[slideIndex].style.display = 'block';
    if (dots[slideIndex] !== undefined) dots[slideIndex].className += ' active';
  }, [slide, isPaused]);

  useEffect(() => {
    if (!!data.length) {
      setPhotos(data);
    }
  }, [data]);

  return (
    <>
      {photos.length > 0 && (
        <div style={style} className='box'>
          <div
            style={{
              maxWidth: width ?? '600px',
              maxHeight: height ?? '400px',
            }}
          >
            <Swipe
              onSwipeRight={() => {
                addSlide(-1);
                setChange(!change);
              }}
              onSwipeLeft={() => {
                addSlide(1);
                setChange(!change);
              }}
            >
              <div
                className='carousel-container'
                style={{
                  maxWidth: width ?? '600px',
                  height: height ?? '400px',
                  backgroundColor: slideBackgroundColor ?? 'darkgrey',
                  borderRadius: radius,
                }}
              >
                {photos.map((item, index) => (
                  <div
                    className='carousel-item fade'
                    style={{
                      maxWidth: width ?? '600px',
                      maxHeight: height ?? '400px',
                    }}
                    onMouseDown={() => {
                      automatic && setIsPaused(true);
                    }}
                    onMouseUp={() => {
                      automatic && setIsPaused(false);
                    }}
                    onMouseLeave={() => {
                      automatic && setIsPaused(false);
                    }}
                    onTouchStart={() => {
                      automatic && setIsPaused(true);
                    }}
                    onTouchEnd={() => {
                      automatic && setIsPaused(false);
                    }}
                    key={index}
                  >
                    {slideNumber && (
                      <div className='slide-number' style={slideNumberStyle}>
                        {index + 1} / {photos.length}
                      </div>
                    )}
                    <img
                      src={item.image}
                      alt={item.caption}
                      className='carousel-image'
                      style={{
                        borderRadius: radius,
                        objectFit: slideImageFit ?? 'cover',
                      }}
                    />
                    {isPaused && (
                      <div
                        className='pause-icon pause'
                        style={{
                          color: pauseIconColor ?? 'white',
                          fontSize: pauseIconSize ?? '40px',
                        }}
                      >
                        II
                      </div>
                    )}
                    <div
                      className={`carousel-caption-${
                        captionPosition ?? 'bottom'
                      }`}
                      style={captionStyle}
                      dangerouslySetInnerHTML={{ __html: item.caption }}
                    ></div>
                  </div>
                ))}

                {showNavBtn && (
                  <>
                    <span
                      className='prev'
                      onClick={() => {
                        addSlide(-1);
                        setChange(!change);
                      }}
                    >
                      &#10094;
                    </span>

                    <span
                      className='next'
                      onClick={() => {
                        addSlide(1);
                        setChange(!change);
                      }}
                    >
                      &#10095;
                    </span>
                  </>
                )}
                {dots && (
                  <div className='dots'>
                    {photos.map((_, index) => (
                      <span
                        className='dot'
                        key={index}
                        onClick={() => {
                          setSlide(index);
                          setChange(!change);
                        }}
                      ></span>
                    ))}
                  </div>
                )}
              </div>
            </Swipe>
          </div>
          {thumbnails && (
            <div
              className='thumbnails'
              id='thumbnail-div'
              style={{ maxWidth: width }}
            >
              {photos.map((item, index) => (
                <img
                  width={thumbnailWidth ?? '100px'}
                  src={item.image}
                  alt={item.caption}
                  className='thumbnail'
                  id={`thumbnail-${index}`}
                  key={index}
                  onClick={() => {
                    setSlide(index);
                    setChange(!change);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Carousel2;
