import React from 'react';
import A1 from '../../../assets/images/selo-qualis/QUALIS-A1.jpg';
import A2 from '../../../assets/images/selo-qualis/QUALIS-A2.jpg';
import B1 from '../../../assets/images/selo-qualis/QUALIS-B1.jpg';
import B2 from '../../../assets/images/selo-qualis/QUALIS-B2.jpg';
import B3 from '../../../assets/images/selo-qualis/QUALIS-B3.jpg';
import B4 from '../../../assets/images/selo-qualis/QUALIS-B4.jpg';
import B5 from '../../../assets/images/selo-qualis/QUALIS-B5.jpg';
import C from '../../../assets/images/selo-qualis/QUALIS-C.jpg';
import styled from 'styled-components';
import { ImageWithLightbox } from '../../../components/ImageWithLightbox';

const Container = styled.div<any>`
  margin-top: 1rem;
  display: flex;
  justify-content: center;

  img {
    width: 140px;
    height: 59px;
  }
`;

interface IProps {
  qualis: string;
}

export const Qualis = ({ qualis }: IProps) => {
  const imageSrcs = {
    A1,
    A2,
    B1,
    B2,
    B3,
    B4,
    B5,
    C
  };

  const src = imageSrcs[qualis];

  if (!src) return null;

  return (
    <Container>
      <ImageWithLightbox imageSrc={src} title={`Selo qualis${qualis}`} />
    </Container>
  );
};
