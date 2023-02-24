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

import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/Button';

interface IProps {
  html: string;
}

export const EditionRenderer = ({ html }: IProps) => {
  const [zoom, _setZoom] = useState(1);

  function setZoom(zoom) {
    if (zoom < 0.5 || zoom > 1.7) return;

    _setZoom(zoom);
  }

  return (
    <Container>
      <ZoomButtonsContainer>
        <Button
          icon={'zoom-in'}
          onClick={() => setZoom(zoom + 0.1)}
          style={{
            fontSize: '1.5rem',
            marginBottom: '.5rem'
          }}
        />
        <Button
          icon={'zoom-out'}
          onClick={() => setZoom(zoom - 0.1)}
          style={{
            fontSize: '1.5rem'
          }}
        />
      </ZoomButtonsContainer>
      <div dangerouslySetInnerHTML={{ __html: html }} style={{ zoom }} />
    </Container>
  );
};

const Container = styled.article`
  position: relative;
  transition: all 0.3s;

  p,
  h1,
  h2,
  h3,
  h4,
  span {
    font-family: var(--text-font-family) !important;
  }
`;

const ZoomButtonsContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 2rem;
  display: flex;
  padding: 1rem;
  border-radius: 0.4rem;
  background: #f4f4f4;
  flex-direction: column;
`;
