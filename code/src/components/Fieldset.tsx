import React from 'react';
import styled from 'styled-components';

const Container = styled.fieldset<any>`
  transition: all 0.5s;
  opacity: 1;
  display: block;
  width: 100%;

  &[aria-disabled='true'] {
    opacity: 0.5;
  }
`;

interface IProps {
  children: any;
  disabled: boolean;
  style?: object;
}

export const Fieldset = ({ children, disabled, style = {} }: IProps) => (
  <Container disabled={disabled} aria-disabled={disabled} style={style}>
    {children}
  </Container>
);
