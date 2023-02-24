/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import React from 'react';
import styled from 'styled-components';
import { useAuthCtx } from '../../features/auth_v2/hooks/useAuthCtx';

const StyledButton = styled.button`
  border: 1px solid #fff;
  background: none;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  font-family: var(--title-font-family);
  font-weight: 700;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  span {
    transform: translate3d(0, 2px, 0);
    color: #fff;
    background-color: #D7282F;
    padding: 4px 8px 4px 8px;
    border-radius: 10px;
  }
`;

export const TopbarLoginButton = () => {
  const { go_to_login } = useAuthCtx();
  return (
    <StyledButton onClick={() => go_to_login()}>
      <span>Login</span>
    </StyledButton>
  );
};
