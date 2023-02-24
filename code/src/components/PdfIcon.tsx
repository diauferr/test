import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const Container = styled.div`
  background: #cecece;
  padding: 0.7rem 0.8rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  width: fit-content;

  i {
    margin: 0 !important;
  }

  svg {
    fill: #fff;
    height: 1.2rem;
    width: 1.2rem;
  }
`;

export const PdfIcon = () => (
  <Container className={'pdf-icon-container'}>
    <Icon type="file" />
  </Container>
);
