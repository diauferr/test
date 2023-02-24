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

import React, { useEffect } from 'react';
import { AuthErrorMessage } from '../../components/AuthErrorMessage';
import Loading from '../../components/Loading';
import { LogoutSuccessDto } from '../../dtos/LogoutSuccessDto';
import { useAuth0 } from '../../hooks/useAuth0';
import { useAuthApi } from '../../hooks/useAuthApi';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useSessionInfoStorage } from '../../hooks/useSessionInfoStorage';
import { AuthRoutePaths } from '../AuthRoutePaths.enum';

interface IProps {}

const READ_ERROR_MESSAGE_TIME = 7000;

export const LogoutPage: React.FC<IProps> = ({}) => {
  const auth0 = useAuth0();
  const session_persistence = useSessionInfoStorage();
  const {
    is_auth0: with_auth0,
    sso_id,
    client_id,
    intranet_session_id
  } = session_persistence.get();
  const auth_api = useAuthApi();
  const qs = useQueryParams();
  const error = qs.get('error');

  useEffect(() => {
    session_persistence.clear();
    do_logout();
  }, []);

  function do_logout() {
    const delay = !!error
      ? (dto: LogoutSuccessDto = {}) => sleep(dto)
      : (dto: LogoutSuccessDto = {}) => Promise.resolve(dto);

    // caso logado intranet.
    if (intranet_session_id) {
      return delay().then(() => {
        window.location.assign(window.origin);
      });
    }

    if (client_id) {
      // usuario logado na api.

      return auth_api
        .logout()
        .then(delay)
        .then((dto) => {
          if (with_auth0) {
            return auth0.logout();
          }

          // Caso logout SSO, redireciona pro sistema externo.
          if (sso_id) {
            const url = dto.sso_login_url || AuthRoutePaths.LoginPage;

            window.location.assign(url);
          }
        })
        .catch((error) => {
          if (with_auth0) {
            return auth0.logout();
          }

          window.location.assign(window.origin);
        });
    }

    return delay().then(() => {
      // usuario so fez login no auth0 mas nao chegou a logar na plataforma.
      if (with_auth0) {
        return auth0.logout();
      }

      window.location.assign(window.origin);
    });
  }

  if (!error) {
    return <Loading text="encerrando sessão..." />;
  }

  return <AuthErrorMessage {...{ error }} />;
};

const sleep = (dto: LogoutSuccessDto): Promise<LogoutSuccessDto> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(dto), READ_ERROR_MESSAGE_TIME)
  );
