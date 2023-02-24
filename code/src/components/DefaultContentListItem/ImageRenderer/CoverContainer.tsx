/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { Icon } from 'antd';
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import imagePlaceholder from '../../../assets/images/image-placeholder.jpg';
import { ContentType } from '../../../enums/ContentType';

interface IProps {
  imgSrc: string;
  linkTo: string;
  title: string;
  showArrow?: boolean;
  contentType?: ContentType;
}

export const CoverContainer = ({
  imgSrc,
  linkTo,
  showArrow,
  title,
  contentType
}: IProps) => {
  const history = useHistory();
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageLoadingError, setImageLoadingError] = useState(false);

  return (
    // TODO alterar link da imagem para o S3.
    <Container className="image-container">
      <Cover
        src={(() => {
          if (imageLoadingError) {
            return imagePlaceholder;
          } else if (showArrow) {
            return '/assets/images/arrow.svg';
          } else if (String(imgSrc).includes('s3.')) {
            return imgSrc;
          } else {
            return imgSrc;
          }
        })()}
        alt={`capa ${title}`}
        onClick={() => {
          if (
            contentType === ContentType.CODE ||
            contentType === ContentType.CODE_ITEM
          ) {
            return window.open(linkTo);
          }

          history.push(linkTo);
        }}
        onLoad={() => setImageLoading(false)}
        onError={() => setImageLoadingError(true)}
      />
      {!showArrow && !imageLoading && (
        <ZoomButton onClick={() => setLightboxVisible(true)}>
          <Icon type="zoom-in" />
          Ampliar
        </ZoomButton>
      )}

      {lightboxVisible && (
        <Lightbox
          mainSrc={imgSrc}
          onCloseRequest={() => setLightboxVisible(false)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 180px;
  height: 290px;
  &:hover {
    button {
      display: block;
    }
  }

  @media (max-width: 800px) {
    button {
      display: block;
    }
  }
`;

const Cover = styled.img`
  border-radius: 8px;
  width: 180px;
  height: 260px;
`;

const ZoomButton = styled.button`
  display: none;
  font-size: 0.9rem;
  margin-top: 0.4rem;
  width: 100px;
  margin-left: 1.7rem;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  color: #717070;
  outline: none;
  padding: 3px;

  &:hover {
    color: var(--primary-color);
  }

  i {
    margin-right: 3px;
  }
`;
