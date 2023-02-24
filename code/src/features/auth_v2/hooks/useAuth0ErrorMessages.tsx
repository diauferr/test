import React from 'react';
import { NavLink } from 'react-router-dom';
import { Auth0ErrorCodes } from '../flows/auth0_flow/Auth0ErrorCodes';

export function useAuth0ErrorMessages(email?: string) {
  const {
    AccessDenied,
    InvalidSignupPassword,
    InvalidUserPassword,
    TooManyAttempts,
    UserAlreadyExists,
    UserIsBlocked,
    LoginRequired
  } = Auth0ErrorCodes;

  return {
    [AccessDenied]: 'E-mail ou senha incorretos.',
    [InvalidUserPassword]: 'E-mail ou senha incorretos.',
    [LoginRequired]: <p>E necessario se autenticar novamente.</p>,
    [TooManyAttempts]:
      'Sua conta foi bloqueada depois de múltiplas tentativas. Por favor, entre em contato através do chat para prosseguir.',
    [UserIsBlocked]:
      'Sua conta se encontra bloqueada. Por favor, entre em contato através do chat para prosseguir.',
    [UserAlreadyExists]: (
      <p>
        O e-mail informado já está em uso.
        <br />
        <NavLink to={`/login?email=${email}`}>Continue fazendo login</NavLink>
      </p>
    ),
    [InvalidSignupPassword]: 'A senha deve ter no mínimo 8 caracteres.'
  };
}
