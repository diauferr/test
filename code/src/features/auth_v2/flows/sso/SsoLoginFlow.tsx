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
import Loading from '../../components/Loading';
import { CreateSessionDto } from '../../dtos/CreateSessionDto';
import { useAuthApi } from '../../hooks/useAuthApi';
import { useAuthCtx } from '../../hooks/useAuthCtx';
import { useUserProfileApi } from '../../hooks/useUserProfileApi';

interface IProps {
  sso_id: string;
  sso_token: string;
}

export const SsoLoginFlow: React.FC<IProps> = ({ sso_id, sso_token }) => {
  const history = useHistory();
  const user_profile_api = useUserProfileApi();
  const { on_auth_success, logout } = useAuthCtx();
  const auth_api = useAuthApi();

  useEffect(() => {
    const dto: CreateSessionDto = {
      sso_id,
      sso_token
    };

    auth_api
      .login(dto)
      .then((r) => {
        on_auth_success({ result: r, sso_token, sso_id });
        history.replace('/pesquisa/todos');

        user_profile_api.update({ name: r.name, picture: r.picture });
      })
      .catch(logout);
  }, []);

  return <Loading />;
};
