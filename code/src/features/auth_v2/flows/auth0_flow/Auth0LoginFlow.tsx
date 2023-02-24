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

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { AssociatedClientsList } from '../../components/AssociatedClientsList/AssociatedClientsList';
import { AuthErrorMessage } from '../../components/AuthErrorMessage';
import Loading from '../../components/Loading';
import { useAuthApi } from '../../hooks/useAuthApi';
import { useAuthCtx } from '../../hooks/useAuthCtx';
import { useUserProfileApi } from '../../hooks/useUserProfileApi';
import { ErrorCodes } from '../../model/ErrorCodes.enum';
import { Auth0AccessTokenLoader } from './_components/Auth0AccessTokenLoader';

interface IProps {
  return_url?: string;
}

export const Auth0LoginFlow: React.FC<IProps> = ({ return_url }) => {
  const { on_auth_success, logout } = useAuthCtx();
  const user_profile_api = useUserProfileApi();
  const auth_api = useAuthApi();
  const [loading_login, set_loading_login] = useState(false);
  const [no_clients, set_no_clients] = useState(false);
  const history = useHistory();

  function try_login(client_id: string, access_token: string) {
    set_loading_login(true);

    auth_api
      .login({ client_id, auth0_token: access_token })
      .then((r) => {
        on_auth_success({
          result: r,
          auth0_token: access_token
        });

        user_profile_api.update({
          name: r.name,
          picture: r.picture
        });

        if (return_url) {
          return history.replace(decodeURIComponent(return_url));
        }

        history.replace('/pesquisa/todos');
      })
      .catch((error) => {
        logout(error);
      });
  }

  return (
    <>
      {}

      <Auth0AccessTokenLoader
        {...{
          render_children: (access_token) => (
            <AssociatedClientsList
              {...{
                auth0_token: access_token,
                on_selected: (client_id: string) => {
                  try_login(client_id, access_token);
                },
                on_error: logout,
                on_clients_loaded: (clients) => {
                  // Sem clientes permitidos
                  if (clients.length === 0) {
                    set_no_clients(true);
                  }

                  // Somente um cliente habilitado..tenta fazer login direto.
                  if (clients.length === 1 && !clients[0].blocked) {
                    return try_login(clients[0].id, access_token);
                  }
                }
              }}>
              {() => {
                if (no_clients) {
                  return (
                    <AuthErrorMessage
                      {...{
                        error: ErrorCodes.NoClientsAssociatedWithUser,
                        show_redirecting: false
                      }}
                    />
                  );
                }

                if (loading_login) {
                  return <Loading text="criando sessão.." />;
                }

                return null; // Renderiza a lista de clientes para selecao
              }}
            </AssociatedClientsList>
          )
        }}
      />
    </>
  );
};
