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
import { LoadingSessionMessage } from '../../components/LoadingSessionMessage';
import { RestoreSessionDto } from '../../dtos/RestoreSessionDto';
import { useAuthApi } from '../../hooks/useAuthApi';
import { useAuthCtx } from '../../hooks/useAuthCtx';
import { Auth0AccessTokenLoader } from './_components/Auth0AccessTokenLoader';

interface IProps {
  created_at: number;
  client_id: string;
}

export const Auth0RestoreFlow: React.FC<IProps> = ({
  created_at,
  client_id
}) => (
  <Auth0AccessTokenLoader
    render_children={(access_token?: string) => (
      <RestoreSession
        {...{
          created_at,
          client_id,
          access_token
        }}
      />
    )}
  />
);

interface IRestoreProps {
  created_at: number;
  client_id: string;
  access_token?: string;
}

const RestoreSession: React.FC<IRestoreProps> = ({
  created_at,
  client_id,
  access_token
}) => {
  const auth_api = useAuthApi();
  const { on_auth_success, logout } = useAuthCtx();

  useEffect(() => {
    if (!access_token) {
      return;
    }

    const dto: RestoreSessionDto = {
      client_id,
      created_at,
      auth0_token: access_token
    };

    auth_api
      .restore(dto)
      .then((r) => {
        on_auth_success({
          result: r,
          auth0_token: access_token
        });
      })
      .catch(logout);
  }, [access_token]);

  return <LoadingSessionMessage />;
};
