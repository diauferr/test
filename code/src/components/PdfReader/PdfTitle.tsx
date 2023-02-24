import React from 'react';
import styled from 'styled-components';
import { usePdfContext } from './hooks/usePdfContext';

const Container = styled.div<any>`
  position: fixed;
  color: #fff;
  background: #3d464d;
  margin-top: 48px;
  width: 99vw;
  box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  padding: 0.5rem;
  text-align: center;
  font-family: var(--title-font-family, sans-serif);
  cursor: pointer;

  @media (max-width: 1100px) {
    width: 98vw;
  }

  @media (max-width: 800px) {
    width: 97vw;
  }

  &.hidden {
    transform: translate3d(0, -55px, 0);
    pointer-events: none;
    opacity: 0;
  }

  &.hidden {
    transform: translate3d(0, -55px, 0);
    pointer-events: none;
    opacity: 0;
  }

  h1 {
    color: #fff;
    font-size: 1.1rem;
    width: 100%;
  }

  span {
    text-transform: uppercase;
    font-size: 0.8rem;
  }
`;

interface IProps {
  title: string;
  subtitle?: string;
  hidden: boolean;
  onClick: () => any;
}

export const PdfTitle = ({ title, subtitle, hidden, onClick }: IProps) => {
  const { changeUiState } = usePdfContext();
  const className = hidden ? 'hidden' : '';

  return (
    <Container
      onClick={onClick}
      className={className}
      onMouseLeave={() => {
        changeUiState((state) => state.setTitleVisibility(false));
      }}>
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </Container>
  );
};
