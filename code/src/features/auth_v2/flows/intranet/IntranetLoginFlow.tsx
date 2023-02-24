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

import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AssociatedClientsList } from '../../components/AssociatedClientsList/AssociatedClientsList';
import { AuthErrorMessage } from '../../components/AuthErrorMessage';
import Loading from '../../components/Loading';
import { useAuthApi } from '../../hooks/useAuthApi';
import { useAuthCtx } from '../../hooks/useAuthCtx';
import { useIsAuthRoute } from '../../hooks/useIsAuthRoute';
import { useQueryParams } from '../../hooks/useQueryParams';

interface IProps {}

export const IntranetLoginFlow: React.FC<IProps> = () => {
  const query_params = useQueryParams();
  const { check: is_auth_route } = useIsAuthRoute();
  const { on_auth_success, go_to_login } = useAuthCtx();
  const [loading_login, set_loading_login] = useState(false);
  const auth_api = useAuthApi();
  const history = useHistory();
  const [error, set_error] = useState();
  const client_id_from_querystring = query_params.get('directClientSelect');

  useEffect(() => {
    // Caso o cliente para ser escolhido ja venha da url.
    if (!!client_id_from_querystring) {
      try_login(client_id_from_querystring);
    }
  }, []);

  function try_login(client_id: string) {
    set_loading_login(true);
    auth_api
      .login({
        client_id
      })
      .then((result) => {
        on_auth_success({ result });
      })
      .catch((error) => {
        set_error(_.get(error, 'response.data') || `${error}`);
      });
  }

  const redirect_to_login = () => {
    const { pathname } = history.location;

    if (pathname === '/' || is_auth_route(pathname)) {
      return go_to_login(false);
    }

    const return_url = encodeURIComponent(
      `${history.location.pathname}${history.location.search}`
    );

    history.replace(`/login?return_url=${return_url}`);
  };

  // tentando fazer login direto, entao nem precisa carregar lista de clientes
  if (!!client_id_from_querystring) {
    return <Loading />;
  }

  // se cliente para fazer login nao esta vindo atraves de url, entao
  // usuario tem que selecionar.
  return (
    <AssociatedClientsList
      {...{
        on_error: redirect_to_login,
        on_selected: try_login,
        on_clients_loaded: (clients) => {
          if (clients.length === 0) {
            redirect_to_login();
          }

          if (clients.length === 1) {
            try_login(clients[0].id);
          }
        },
        footer: null
      }}>
      {() => {
        if (error) {
          return (
            <>
              <AuthErrorMessage {...{ error, show_redirecting: false }} />

              <button
                {...{
                  onClick: () => {
                    go_to_login(false);
                  }
                }}>
                Fazer login utilizando e-mail e senha
              </button>

              <br />

              <button
                {...{
                  onClick: () => {
                    window.location.href = window.location.origin;
                  }
                }}>
                Tentar novamente
              </button>
            </>
          );
        }

        if (loading_login) {
          return <Loading />;
        }

        return null;
      }}
    </AssociatedClientsList>
  );
};
