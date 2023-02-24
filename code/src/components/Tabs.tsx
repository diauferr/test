import React from 'react';
import styled from 'styled-components';

const StyledTab = styled.button<any>`
  padding: 1rem 2rem;
  border: 0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-family: var(--title-font-family);
  position: relative;
  margin-right: 20px;
  color: rgba(0, 0, 0, 0.5);
  outline: none;

  :hover {
    cursor: pointer;
  }

  &.active {
    background: var(--primary-color);
    color: white;
    font-weight: 500;
  }

  .active-label {
    display: ${(props) => (props.active ? 'block' : 'none')};
    background: var(--secondary-color);
    position: absolute;
    height: 3px;
    width: 100%;
    bottom: 0;
    left: 0;
  }
`;

interface IProps {
  tabName: string;
  active: boolean;
  onClick: () => void;
}

export const Tabs = ({ tabName, active, onClick }: IProps) => (
  <StyledTab className={active && 'active'} active={active} onClick={onClick}>
    {tabName}
    <div className="active-label"></div>
  </StyledTab>
);
