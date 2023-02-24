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
import { TestId } from '../../../components/TestId';
import { Auth0ErrorCodes } from '../flows/auth0_flow/Auth0ErrorCodes';
import { ErrorCodes } from '../model/ErrorCodes.enum';

export const test_id = 'auth-error-msg';

interface IProps {
  error: string;
  show_redirecting?: boolean;
}

export const AuthErrorMessage: React.FC<IProps> = ({
  error,
  show_redirecting = true
}) => {
  const { message, icon, title } = get_error_display(error);

  return (
    <div className="auth-error-message">
      <TestId
        {...{
          test_id
        }}
      />
      <div>
        {title && (
          <div className="title-container">
            {icon}
            <h1>{title}</h1>
          </div>
        )}
        {message}
      </div>

      {show_redirecting && <Redirecting />}
    </div>
  );
};

const Redirecting: React.FC = ({}) => (
  <div>
    <p
      {...{
        style: {
          color: '#919191',
          marginBottom: -5,
          marginTop: 32
        }
      }}>
      redirecionando
    </p>
    <img
      {...{
        alt: '',
        src: '/assets/images/redirect.webp',
        style: {
          width: 64
        }
      }}
    />
  </div>
);

type ErrorDisplay = {
  title?: string;
  icon?: ReactNode;
  message: ReactNode;
};

function get_error_display(error: string): ErrorDisplay {
  if (!error) {
    unkownerror(error);
  }

  const errors: [Auth0ErrorCodes | ErrorCodes, ErrorDisplay][] = [
    [Auth0ErrorCodes.LoginRequired, login_required],
    [Auth0ErrorCodes.TooManyAttempts, too_many_attempts],
    [Auth0ErrorCodes.UserIsBlocked, blocked_user],
    [ErrorCodes.UserAccessBlocked, blocked_user],
    [ErrorCodes.NetworkError, network_error],
    [ErrorCodes.ExpiredSession, session_expired],
    [ErrorCodes.TokenExpired, session_expired],
    [ErrorCodes.MaxSimultaneosUsersLimitReached, max_simultaneous_users_error],
    [ErrorCodes.NoClientsAssociatedWithUser, no_clients]
  ];

  for (let i = 0; i < errors.length; i++) {
    const [code, display] = errors[i];

    if (error.includes(code)) {
      return display;
    }
  }

  return unkownerror(error);
}

const unkownerror = (error: any): ErrorDisplay => ({
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#dc2626">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  title: 'Erro inesperado',
  message: (
    <div>
      <p>
        Aconteceu um erro inesperado: <br />
        <span
          {...{
            style: {
              display: 'block',
              fontWeight: 'bold',
              padding: '5px 3px ',
              background: '#ffe0e0',
              border: '1px solid #ec7e7e'
            }
          }}>
          {error}{' '}
        </span>
      </p>

      <p>Por favor, tente novamente.</p>
    </div>
  )
});

const session_expired: ErrorDisplay = {
  title: 'Sessão expirou',
  message: <p>Por favor, faça login novamente</p>
};

const network_error: ErrorDisplay = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#F59E0B">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
      />
    </svg>
  ),
  title: 'Erro de rede',
  message: <p>Por favor, verifique sua conexão e tente novamente.</p>
};

const max_simultaneous_users_error: ErrorDisplay = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#FBBF24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  title: 'Máximo de usuários atingido',
  message: (
    <div>
      <p>
        O número de acessos simultâneos contratados para essa conta foi
        atingido.
      </p>

      <div
        {...{
          style: {
            textAlign: 'left'
          }
        }}>
        <p> Para continuar você pode:</p>
        <ul>
          <li>Tentar novamente mais tarde.</li>
          <li>
            Entrar em contato com o gestor de sua conta requisitando o aumento
            do limite de usuários.
          </li>
        </ul>
      </div>
    </div>
  )
};

const login_required: ErrorDisplay = {
  message: <p>É necessário se autenticar novamente.</p>
};

const too_many_attempts: ErrorDisplay = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#dc2626">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      />
    </svg>
  ),
  title: 'O seu usuário está bloqueado',
  message: (
    <div>
      <p>Sua conta foi bloqueada depois de múltiplas tentativas.</p>
      <p>Por favor, entre em contato através do chat para prosseguir.</p>
    </div>
  )
};

const blocked_user: ErrorDisplay = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#dc2626">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      />
    </svg>
  ),
  title: 'Seu acesso está inativo',
  message: (
    <div>
      <p>Por favor, entre em contato através do chat para prosseguir.</p>
    </div>
  )
};

const no_clients: ErrorDisplay = {
  title: 'Sua conta não possui acesso a Plataforma Fórum',
  message: (
    <div
      {...{
        style: {
          textAlign: 'left'
        }
      }}>
      <p>Para ter acesso você pode:</p>
      <ul>
        <li>Se autenticar utilizando a intranet de um cliente.</li>
        <li>
          Entrando em contato com o gestor de contrato, solicitando que ele o
          convide.
        </li>
      </ul>
    </div>
  )
};
