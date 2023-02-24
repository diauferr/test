import React from 'react';
import styled from 'styled-components';
import { useMenuContext } from './hooks/useMenuContext';

const Button = styled.button`
  background: none;
  border: 0;
  position: relative;
  cursor: pointer;

  padding: 0;
  margin: 0;

  &:active {
    svg {
      fill: white;
    }
  }

  svg {
    fill: white;
    height: 13px;
    width: 22px;
    padding: 0;
    margin: 0;
  }
`;

export const MenuButton = () => {
  const menuCtx = useMenuContext();

  return (
    <div style={{ padding: '3px 15px' }}>
      <Button onClick={() => menuCtx.changeMenuState(!menuCtx.state.isOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 12h18v-2H0v2zm0-5h18V5H0v2zm0-7v2h18V0H0z"
            fillRule="evenodd"
          />
        </svg>
      </Button>
    </div>
  );
};
