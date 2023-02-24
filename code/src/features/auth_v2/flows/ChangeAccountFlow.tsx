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

import { message } from 'antd';
import React, { useState } from 'react';
import { Message } from '../../../components/messages/Message';
import { AssociatedClientsList } from '../components/AssociatedClientsList/AssociatedClientsList';
import { AuthContent } from '../components/AuthContent';
import Loading from '../components/Loading';
import { useAuthApi } from '../hooks/useAuthApi';
import { useAuthCtx } from '../hooks/useAuthCtx';
import { useUserProfileApi } from '../hooks/useUserProfileApi';
import { Auth0AccessTokenLoader } from './auth0_flow/_components/Auth0AccessTokenLoader';

interface IProps {
  return_url?: string;
}

export const ChangeAccountFlow: React.FC<IProps> = ({ return_url }) => {
  const { on_auth_success, session } = useAuthCtx();
  const user_profile_api = useUserProfileApi();
  const auth_api = useAuthApi();
  const [loading_login, set_loading_login] = useState(false);
  const on_error = (err: any) => {
    console.error(err);
    message.error(`Ocorreu um erro durante a autenticacao ${err}`);
    set_loading_login(false);
  };

  function try_change_account(client_id: string, access_token?: string) {
    if (session.client.id === client_id) {
      // ignora teentativa de selecionar a conta atual
      return;
    }

    set_loading_login(true);

    auth_api
      .logout()
      .then(() =>
        auth_api.login({ client_id, auth0_token: access_token }).then((r) => {
          on_auth_success({
            result: r,
            auth0_token: access_token
          });

          user_profile_api.update({
            name: r.name,
            picture: r.picture
          });
        })
      )
      .then(() => {
        window.location.assign(
          `${process.env.REACT_APP_BASE_UI_URL}/pesquisa/todos`
        );
      })
      .catch(on_error);
  }

  return (
    <AuthContent>
      <Auth0AccessTokenLoader
        {...{
          render_children: (auth0_token) => (
            <AssociatedClientsList
              {...{
                selected_client_id: session.client.id,
                on_clients_loaded: () => {},
                on_error,
                children: (clients) => {
                  if (loading_login) {
                    return <Loading />;
                  }

                  if (
                    clients.length === 1 &&
                    clients[0].id === session.client.id
                  ) {
                    return <NoOtherAccountMessage />;
                  }

                  return null;
                },
                title: '',
                footer: null,
                auth0_token,
                on_selected: (client_id: string) => {
                  try_change_account(client_id, auth0_token);
                }
              }}
            />
          )
        }}
      />
    </AuthContent>
  );
};

export const NoOtherAccountMessage: React.FC = () => (
  <p
    style={{
      textAlign: 'center'
    }}>
    Não há nenhuma outra conta associada ao seu usuário
  </p>
);
