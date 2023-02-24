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
import { Button } from './Button';
import { Icon } from 'antd';

const StyledButton = styled(Button)`
  background: linear-gradient(to right, #ed213a, var(--secondary-color));
  color: #fff;
  transition: all 0.4s;

  &:hover {
    background: linear-gradient(to right, #ed213a, var(--secondary-color));
    color: #fff !important;
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }

  &:disabled {
    background: linear-gradient(to right, #cccccc, #cccccc);
  }
`;

export const StartReadingButton = ({ children, ...props }) => (
  <StyledButton {...props}>
    <Icon type="play-circle" /> INICIAR LEITURA
  </StyledButton>
);
