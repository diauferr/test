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
import { useHistory } from 'react-router';
import { LoadingSessionMessage } from '../../components/LoadingSessionMessage';
import { CreateSessionDto } from '../../dtos/CreateSessionDto';
import { RestoreSessionDto } from '../../dtos/RestoreSessionDto';
import { useAuthApi } from '../../hooks/useAuthApi';
import { useAuthCtx } from '../../hooks/useAuthCtx';
import { useSessionInfoStorage } from '../../hooks/useSessionInfoStorage';

interface IProps {
  created_at: number;
  client_id: string;
  intranet_session_id: string;
}

export const IntranetRestoreFlow: React.FC<IProps> = ({
  created_at,
  client_id,
  intranet_session_id
}) => {
  const { on_auth_success, logout } = useAuthCtx();
  const auth_api = useAuthApi();

  useEffect(() => {
    const dto: RestoreSessionDto = {
      created_at,
      client_id,
      intranet_session_id
    };

    auth_api
      .restore(dto)
      .then((result) => on_auth_success({ result }))
      .catch(() => {
        const dto: CreateSessionDto = {
          client_id
        };

        return auth_api
          .login(dto)
          .then((result) => on_auth_success({ result }));
      })
      .catch((error) => {
        logout(error);
      });
  }, []);

  return <LoadingSessionMessage />;
};
