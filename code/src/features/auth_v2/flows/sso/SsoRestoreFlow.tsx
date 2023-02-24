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

interface IProps {
  sso_id: string;
  sso_token: string;
  created_at: number;
}

export const SsoRestoreFlow: React.FC<IProps> = ({
  sso_id,
  sso_token,
  created_at
}) => {
  const { on_auth_success, logout } = useAuthCtx();
  const auth_api = useAuthApi();

  useEffect(() => {
    const dto: RestoreSessionDto = {
      sso_id,
      sso_token,
      created_at
    };

    auth_api
      .restore(dto)
      .then((r) => {
        on_auth_success({ result: r, sso_token, sso_id });
      })
      .catch(logout);
  }, []);

  return <LoadingSessionMessage />;
};
