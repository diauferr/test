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

import React from 'react';
import styled from 'styled-components';

export const Subtitle = styled.h3<any>`
  font-family: var(--title-font-family);
  font-weight: 700;
  font-size: 1.2rem;
  color: #323232;
  position: relative;
  padding: 0 0 0 0.7rem;
  margin: 0 0 1rem 0;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.4rem;
    bottom: 0;
    height: 1.15rem;
    width: 0.3rem;
    background: var(--secondary-color);

    @media (max-width: 600px) {
      top: 0.3rem;
    }
  }
`;
