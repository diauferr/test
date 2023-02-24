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
import { RestoreSessionDto } from '../dtos/RestoreSessionDto';
import { useAuthApi } from '../hooks/useAuthApi';
import { useAuthCtx } from '../hooks/useAuthCtx';
import { useInterval } from '../hooks/useInterval';
import { useSessionInfoStorage } from '../hooks/useSessionInfoStorage';
interface IProps {}

const DELAY = 60000 * 15; // quinze minutos;

/**
 * Fica fazendo restore da sessao para atualizar o seu ttl e verificar se usuario
 * ainda tem sessao ativa.
 */
export const SessionRefresher: React.FC<IProps> = ({}) => {
  const { session, auth0_token: auth0_access_token, logout } = useAuthCtx();

  const session_persistence = useSessionInfoStorage();
  const session_info = session_persistence.get();

  const { restore } = useAuthApi();

  useInterval(() => {
    if (!!session_info.intranet_session_id) {
      return;
    }

    const dto: RestoreSessionDto = {
      created_at: session.created_at,
      client_id: session.client.id,
      intranet_session_id: null,
      sso_id: session_info.sso_id,
      sso_token: session_info.sso_token,
      auth0_token: auth0_access_token
    };

    restore(dto).catch((error) => {
      logout(error);
    });
  }, DELAY);

  return null;
};
