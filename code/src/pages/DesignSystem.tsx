import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30rem;
`;

export const DesignSystem = () => (
  <Container>
    <div id="design-system">
      <h1>Design System</h1>
    </div>
  </Container>
);
