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
import { AuthContent } from '../components/AuthContent';
import { SessionInfo } from '../model/SessionInfo';
import { Auth0LoginFlow } from './auth0_flow/Auth0LoginFlow';
import { Auth0RestoreFlow } from './auth0_flow/Auth0RestoreFlow';
import { IntranetLoginFlow } from './intranet/IntranetLoginFlow';
import { IntranetRestoreFlow } from './intranet/IntranetRestoreFlow';
import { SsoRestoreFlow } from './sso/SsoRestoreFlow';

interface IProps {
  session_info: SessionInfo;
}

export const AuthFlow: React.FC<IProps> = ({ session_info }) => {
  function get_flow_cmp() {
    const flow_to_execute = decide_wich_flow_to_execute(session_info);

    // console.log(flow_to_execute, "flow_to_execute");

    if (flow_to_execute === 'auth0-login') {
      return <Auth0LoginFlow />;
    }

    // Primeiro acesso
    if (flow_to_execute === 'intranet-login') {
      return <IntranetLoginFlow />;
    }

    // Já tinha sessao intranet ativa.
    if (flow_to_execute === 'intranet-restore') {
      return (
        <IntranetRestoreFlow
          {...{
            created_at: session_info.created_at,
            client_id: session_info.client_id,
            intranet_session_id: session_info.intranet_session_id
          }}
        />
      );
    }

    // Já tinha sessao auth0.
    if (flow_to_execute === 'auth0-restore') {
      return (
        <Auth0RestoreFlow
          {...{
            created_at: session_info.created_at,
            client_id: session_info.client_id
          }}
        />
      );
    }

    // Já tinha sessao SSO.
    if (flow_to_execute === 'sso-restore') {
      return (
        <SsoRestoreFlow
          {...{
            created_at: session_info.created_at,
            sso_id: session_info.sso_id,
            sso_token: session_info.sso_token
          }}
        />
      );
    }
  }

  return (
    <div className="auth-routes">
      <AuthContent>{get_flow_cmp()}</AuthContent>
    </div>
  );
};

type Flow =
  | 'intranet-login'
  | 'intranet-restore'
  | 'auth0-login'
  | 'auth0-restore'
  | 'sso-restore';

function decide_wich_flow_to_execute({
  client_id,
  created_at,
  intranet_session_id,
  sso_token,
  is_auth0
}: SessionInfo): Flow {
  if (!created_at) {
    if (is_auth0) {
      // Fez login auth0 mas ainda nao fez login plataforma.

      return 'auth0-login';
    }

    return 'intranet-login';
  }

  if (client_id && intranet_session_id) {
    return 'intranet-restore';
  }

  if (client_id && is_auth0) {
    return 'auth0-restore';
  }

  if (client_id && sso_token) {
    return 'sso-restore';
  }
}
