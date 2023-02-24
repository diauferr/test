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
import { Route, Switch, useHistory } from 'react-router-dom';
import { TestId } from '../../../components/TestId';
import { AuthContent } from '../components/AuthContent';
import { useQueryParams } from '../hooks/useQueryParams';
import { AuthRoutePaths } from './AuthRoutePaths.enum';
import { CallbackPage } from './Callback/CallbackPage';
import { LoginPage } from './Login/LoginPage';
import { LogoutPage } from './Logout/LogoutPage';
import { ResetPasswordPage } from './ResetPassword/ResetPasswordPage';
import { SignupPage } from './Signup/SignupPage';
import { SsoLoginPage } from './SsoLogin/SsoLoginPage';

interface IProps {}

export const test_id = 'auth-routes';

export const AuthRoutes: React.FC<IProps> = () => {
  const { get } = useQueryParams();
  const show_back_button = get('voltar');
  const history = useHistory();

  return (
    <div className="auth-routes">
      <TestId {...{ test_id }} />

      <AuthContent
        {...{
          on_go_back_click: show_back_button
            ? () => {
              history.goBack();
            }
            : null
        }}>
        <Switch>
          <Route
            {...{
              path: AuthRoutePaths.LoginPage,
              component: LoginPage
            }}
          />

          <Route
            {...{
              path: AuthRoutePaths.SignupPage,
              component: SignupPage
            }}
          />

          <Route
            {...{
              path: AuthRoutePaths.ResetPasswordPage,
              component: ResetPasswordPage
            }}
          />

          <Route
            {...{
              path: AuthRoutePaths.CallbackPage,
              component: CallbackPage
            }}
          />

          <Route
            {...{
              path: AuthRoutePaths.LogoutPage,
              component: LogoutPage
            }}
          />

          <Route
            {...{
              path: AuthRoutePaths.SsoLoginPage,
              component: SsoLoginPage
            }}
          />
        </Switch>
      </AuthContent>
    </div>
  );
};
