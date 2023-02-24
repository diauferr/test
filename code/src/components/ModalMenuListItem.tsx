import React, { ReactNode } from 'react';

import styled from 'styled-components';

const Li = styled.li<any>`
  padding: 0.5rem;
  display: grid;
  align-items: center;
  height: 4rem;
  width: 100%;
  transition: all 0.5s;
  font-size: 1rem;

  &:hover {
    background: ${(props) => (props.disabled ? '' : '#eeeeee')};
    text-decoration: ${(props) => (props.disabled ? '' : 'underline')};
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  }

  opacity: ${(props) => (props.disabled ? 0.7 : 1)};

  grid-template-columns: ${(props) => (props.hasIcon ? '.2fr .8fr' : '1fr')};

  i {
    font-size: 2rem;
    color: var(--primary-color-dark);
  }
`;

interface IProps {
  children: ReactNode;
  onClick: () => any;
  disabled?: boolean;
  Icon?: ReactNode;
}

export const ModalMenuListItem = ({
  children,
  onClick,
  disabled = false,
  Icon = null
}: IProps) => (
  <Li
    disabled={disabled}
    hasIcon={!!Icon}
    onClick={() => {
      if (disabled) return;

      onClick();
    }}>
    {Icon}
    {children}
  </Li>
);
