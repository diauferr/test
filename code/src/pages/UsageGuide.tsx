import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  position: fixed;
  text-align: center;
  bottom: 16px;
  right: 36px;
  padding: 0.2rem;
  border-radius: 4px;

  a {
    font-size: 0.9rem;
    opacity: 0.6;
    transition: 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`;

export const UsageGuide = () => (
  <StyledFooter>
    <a target="_blank" href="https://plataformaforum.zendesk.com">
      Central de ajuda
    </a>
  </StyledFooter>
);
