import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 21rem;
  @media (max-width: 500px) {
    width: 15rem;
  }
`;
export const Logo = () => (
  <Img src="/assets/images/logo-forum-conhecimento.svg" alt="Logo Fórum" />
);
