import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

const StyledButton = styled<any>(Button)`
  color: var(--primary-color-light);

  &:focus,
  &:active,
  &:hover {
    color: var(--primary-color-light);

    i {
      text-decoration: underline !important;
    }
    button {
      text-decoration: underline !important;
    }
  }

  i {
    margin-right: 0.5rem;
    color: var(--primary-color-light);
  }
`;

interface IProps {
  buttonProps?: any;
}

export const ButtonsBarButton = ({ buttonProps = {} }: IProps) => (
  <StyledButton {...buttonProps} />
);
