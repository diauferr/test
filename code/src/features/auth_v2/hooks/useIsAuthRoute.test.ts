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

import { AuthRoutePaths } from '../pages/AuthRoutePaths.enum';
import { useIsAuthRoute } from './useIsAuthRoute';

const { check } = useIsAuthRoute();

const tests = [
  {
    pathname: AuthRoutePaths.LoginPage,
    expected: true
  },
  {
    pathname: `${AuthRoutePaths.LoginPage}?email=rick.onodera@gmail.com`,
    expected: true
  },
  {
    pathname: AuthRoutePaths.SignupPage,
    expected: true
  },
  {
    pathname: `${AuthRoutePaths.SignupPage}?email=rick.onodera@gmail.com`,
    expected: true
  },
  {
    pathname: AuthRoutePaths.CallbackPage,
    expected: true
  },
  {
    pathname: `${AuthRoutePaths.CallbackPage}?email=rick.onodera@gmail.com`,
    expected: true
  },
  {
    pathname: '/livro/54887/44841',
    expected: false
  },
  {
    pathname: '/ler/574/44841',
    expected: false
  },
  {
    pathname: '/livro/cadastro-geral-de-licitacoes',
    expected: false
  },
  {
    pathname: `${AuthRoutePaths.LogoutPage}?reason=expired_session`,
    expected: true
  },
  {
    pathname: `${AuthRoutePaths.SsoLoginPage}?t=token&c=mpu`,
    expected: true
  },
  {
    pathname: `${AuthRoutePaths.ResetPasswordPage}`,
    expected: true
  },
  {
    pathname: `${AuthRoutePaths.ResetPasswordPage}?email=rick.onodera@gmail.com`,
    expected: true
  }
];

tests.forEach(({ pathname, expected }) => {
  test(`Deve saber se ${pathname} é uma rota de autenticação.`, async () => {
    expect(check(pathname)).toBe(expected);
  });
});
