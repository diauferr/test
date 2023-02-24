import React from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'antd';

const StyledButton = styled<any>(Button)`
  border-radius: 0.5rem;
  box-shadow: none;
  background: var(--background-color);
  margin-right: 0.3rem;
  margin-bottom: 0.3rem;
  padding: 0 1rem;

  &.active {
    background: var(--primary-color) !important;
    color: white !important;
    border: 0 !important;
  }
`;
interface IProps {
  text: string;
  active: Boolean;
  onClick: () => any;
}

export const TagButton = ({ text, active, onClick }: IProps) => (
  <StyledButton className={active ? 'active' : ''} onClick={onClick}>
    {active && <Icon type="check" />}
    {text}
  </StyledButton>
);
