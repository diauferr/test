import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  margin-bottom: 4.5rem;
  position: relative;

  &:last-of-type {
    margin-bottom: 5rem;
  }

  h2 {
    margin-bottom: 2.5rem;
    position: relative;

    @media (max-width: 600px) {
      font-size: 1.5rem;
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0rem;
      height: 3px;
      width: 30px;
      background: var(--primary-color-dark);
    }
  }
`;

export const ContentSection = (props: any) => <Section {...props} />;
