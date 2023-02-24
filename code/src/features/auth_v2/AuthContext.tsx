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

import React, { ReactNode, useState } from 'react';
import { useHistory } from 'react-router';
import { TestId } from '../../components/TestId';
import { HttpClient } from '../../util/http_client';
import { request } from '../../util/request';
import { RequestUtil } from '../../util/RequestUtil';
import { ConfirmAuthModal } from './components/ConfirmAuthModal';
import { AuthSuccessDto } from './dtos/AuthSuccessDto';
import { AuthFlow } from './flows/AuthFlow';
import { useIsAuthRoute } from './hooks/useIsAuthRoute';
import { useSessionInfoStorage } from './hooks/useSessionInfoStorage';
import { ErrorCodes } from './model/ErrorCodes.enum';
import { Role } from './model/Role';
import { UserSession } from './model/UserSession';
import { AuthRoutePaths } from './pages/AuthRoutePaths.enum';
import { AuthRoutes } from './pages/AuthRoutes';

type AuthType = 'intranet' | 'sso' | 'auth0';

interface IAuthCtx {
  session: UserSession;
  on_auth_success: (args: {
    result: AuthSuccessDto;
    auth0_token?: string;
    sso_token?: string;
    sso_id?: string;
  }) => any;

  logout: (error?: any) => any;
  is_authenticated: () => boolean;
  is_contract_manager: () => boolean;
  is_authenticated_by: (type: AuthType) => boolean;
  is_authenticated_with_email: () => boolean;
  go_to_login: (with_back_link?: boolean) => void;
  go_to_reset_password: (with_back_link?: boolean) => void;
  show_auth_modal: () => void;
  auth0_token?: string;
}

export const AuthContext = React.createContext({} as IAuthCtx);

interface IProps {
  children: ReactNode;
  test_session?: UserSession;
}

export const AuthProvider: React.FC<IProps> = ({ children, test_session }) => {
  const history = useHistory();
  const [auth0_token, set_auth0_token] = useState<string>();
  const [auth_modal_visible, set_auth_modal_visible] = useState(false);
  const [session, set_session] = useState<UserSession>(test_session);
  const session_info_storage = useSessionInfoStorage();
  const session_info = session_info_storage.get();
  const { check: check_auth_route } = useIsAuthRoute();
  const is_in_auth_pages = check_auth_route(history.location.pathname);

  function on_success(args: {
    result: AuthSuccessDto;
    auth0_token?: string;
    sso_token?: string;
    sso_id?: string;
  }) {
    const { result, auth0_token, sso_token = null, sso_id = null } = args;

    const session: UserSession = {
      client: result.client,
      created_at: result.created_at,
      email: result.email,
      intranet_session_id: result.intranet_session_id,
      name: result.name,
      picture: result.picture,
      roles: result.roles
    };

    session_info_storage.save({
      client_id: session.client.id,
      created_at: session.created_at,
      intranet_session_id: session.intranet_session_id || null,
      sso_token,
      sso_id,
      is_auth0: !!auth0_token
    });

    HttpClient.set_token(result.platform_token);
    HttpClient.on('unauthorized', (error: any) => {
      if (
        `${error}`.includes(ErrorCodes.TokenExpired) ||
        `${error}`.includes(ErrorCodes.ExpiredSession)
      ) {
        logout(error);
      }
    });

    request.set_token(result.token_legacy);
    RequestUtil.setToken(result.token_legacy);

    if (!!auth0_token) {
      set_auth0_token(auth0_token);
    }

    set_session(session);
  }

  function logout(error?: any) {
    if (error) {
      return history.replace(`/logout?error=${encodeURI(`${error}`)}`);
    }

    return history.replace(`/logout`);
  }

  function go_to_auth_page(page: 'login' | 'reset_password') {
    return (with_back_link: boolean = true) => {
      const path =
        page === 'login'
          ? AuthRoutePaths.LoginPage
          : AuthRoutePaths.ResetPasswordPage;
      const qs = with_back_link ? '?voltar=true' : '';
      const url = `${path}${qs}`;

      return history.push(url);
    };
  }

  const fncs = auth_functions(session);
  const go_to_login = go_to_auth_page('login');
  return (
    <AuthContext.Provider
      {...{
        value: {
          session,
          on_auth_success: on_success,
          logout,
          ...fncs,
          go_to_login,
          go_to_reset_password: go_to_auth_page('reset_password'),
          show_auth_modal: () => set_auth_modal_visible(true),
          auth0_token
        }
      }}>
      {(() => {
        // Caso esteja nas rotas de fazer login, callback, logout...
        if (is_in_auth_pages) {
          return <AuthRoutes />;
        }

        // usuario ja logado, mostrar aplicacao
        if (session) {
          return (
            <>
              <TestId {...{ test_id: 'protected' }} />
              {!fncs.is_authenticated_with_email() && (
                <ConfirmAuthModal
                  {...{
                    visible: auth_modal_visible,
                    onCancel: () => {
                      set_auth_modal_visible(false);
                    },
                    on_go_to_login_click: () => {
                      go_to_login(true);
                    }
                  }}
                />
              )}
              {children}
            </>
          );
        }

        return (
          <AuthFlow
            {...{
              session_info
            }}
          />
        );
      })()}
    </AuthContext.Provider>
  );
};

function auth_functions(session: UserSession) {
  const session_info_storage = useSessionInfoStorage();
  const session_info = session_info_storage.get();

  if (!session || !session_info.client_id) {
    return {
      is_authenticated() {
        return false;
      },
      is_contract_manager() {
        return false;
      },
      is_authenticated_by(type: AuthType) {
        return false;
      },
      is_authenticated_with_email() {
        return false;
      }
    };
  }

  const is_authenticated_by = (type: AuthType) => {
    switch (type) {
      case 'auth0':
        return session_info.is_auth0;
      case 'sso':
        return !!session_info.sso_token;
      case 'intranet':
        return !!session_info.intranet_session_id;
      default:
        return false;
    }
  };

  return {
    is_authenticated() {
      return true;
    },
    is_contract_manager() {
      return session.roles.some((r) => r === Role.ContractManager);
    },
    is_authenticated_by(type: AuthType) {
      const session_info = session_info_storage.get();

      switch (type) {
        case 'auth0':
          return session_info.is_auth0;
        case 'sso':
          return !!session_info.sso_token;
        case 'intranet':
          return !!session_info.intranet_session_id;
        default:
          return false;
      }
    },

    is_authenticated_with_email() {
      return is_authenticated_by('auth0') || is_authenticated_by('sso');
    }
  };
}
