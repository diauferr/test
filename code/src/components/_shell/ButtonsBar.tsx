import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  background: #f4f4f4;

  &:before {
    height: 3rem;
    content: '';
    display: block;
    left: 0;
    right: 0;
    position: absolute;
    background: #fafafa;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
  }
`;

export const ButtonsBar = ({ children, ...props }: any) => (
  <Container {...props}>{children}</Container>
);
