import React, { useEffect, useRef, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ProgressiveImage from 'react-progressive-image';
import { createGlobalStyle } from 'styled-components';
import { useOnScreen } from '../Hooks/useOnScreen';
import placeholder from './../assets/images/image-placeholder.jpg';

const GlobalOverrides = createGlobalStyle`
  body, html  {
    overflow: hidden !important;
  } 
`;

interface IProps {
  imageSrc: string;
  lightboxImageSrc?: string;
  style?: object;
}

export const ImageWithLightbox = ({
  imageSrc,
  lightboxImageSrc,
  style = {},
  ...props
}: IProps | any) => {
  const [error, setError] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [wasVisible, setWasVisible] = useState(false);
  const ref = useRef();
  const onScreen = useOnScreen(ref, '-30px');

  useEffect(() => {
    if (onScreen) setWasVisible(true);
  }, [onScreen]);

  return (
    <>
      {!error && lightboxVisible && (
        <>
          <GlobalOverrides />
          <Lightbox
            mainSrc={lightboxImageSrc || imageSrc}
            onCloseRequest={() => setLightboxVisible(false)}
          />
        </>
      )}
      <div ref={ref}>
        {wasVisible ? (
          <ProgressiveImage
            src={imageSrc}
            placeholder={placeholder}
            onError={() => {
              setError(true);
            }}>
            {(src: string) => (
              <img
                onClick={() => setLightboxVisible(true)}
                src={src}
                style={{
                  ...style,
                  cursor: error ? 'default' : 'zoom-in'
                }}
                {...props}
              />
            )}
          </ProgressiveImage>
        ) : (
          <img src={placeholder} alt="Placeholder" />
        )}
      </div>
    </>
  );
};
