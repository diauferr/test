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

import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  on_go_back_click?: () => void;
}

export const AuthContent: React.FC<IProps> = ({
  children,
  on_go_back_click
}) => (
  <div className="auth-content">
    {on_go_back_click && <BackButton {...{ on_click: on_go_back_click }} />}

    {on_go_back_click && (
      <div
        {...{
          style: {
            display: 'block',
            marginTop: on_go_back_click ? '1.5rem' : 0
          }
        }}
      />
    )}

    {children}
  </div>
);

interface IGoBackButtonProps {
  on_click?: () => void;
}

const BackButton: React.FC<IGoBackButtonProps> = ({ on_click }) => (
  <button
    {...{
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        background: 'none',
        color: '#1034a6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      onClick: on_click
    }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      style={{
        width: 14,
        height: 14,
        marginRight: 4
      }}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
    Voltar
  </button>
);
