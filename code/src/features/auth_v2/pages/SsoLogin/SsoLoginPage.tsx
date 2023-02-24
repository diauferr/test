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
import { AuthErrorMessage } from '../../components/AuthErrorMessage';
import { SsoLoginFlow } from '../../flows/sso/SsoLoginFlow';
import { useQueryParams } from '../../hooks/useQueryParams';
interface IProps {}

export const SsoLoginPage: React.FC<IProps> = ({}) => {
  const query_params = useQueryParams();

  const sso_token = query_params.get('t');
  const sso_id = query_params.get('c');

  if (!sso_token) {
    return (
      <AuthErrorMessage
        {...{
          error: `Parametro "token" não informado.`
        }}
      />
    );
  }

  if (!sso_id) {
    return (
      <AuthErrorMessage
        {...{
          error: `Parametro "cliente" não informado.`
        }}
      />
    );
  }

  return (
    <SsoLoginFlow
      {...{
        sso_id,
        sso_token
      }}
    />
  );
};
