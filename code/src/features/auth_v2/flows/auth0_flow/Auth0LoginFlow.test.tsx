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

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { setupServer } from 'msw/node';
import React from 'react';
import App from '../../../../App';
import * as AuthErrorMessage from '../../components/AuthErrorMessage';
import { CreateSessionDto } from '../../dtos/CreateSessionDto';
import { UpdateProfileDto } from '../../dtos/UpdateProfileDto';
import { useReturnUrlPersistence } from '../../hooks/useAuth0ReturnUrlPersistence';
import { useSessionInfoStorage } from '../../hooks/useSessionInfoStorage';
import { ErrorCodes } from '../../model/ErrorCodes.enum';
import { SessionInfo } from '../../model/SessionInfo';
import {
  create_client,
  create_token,
  expect_logging_out,
  failed_login,
  faker,
  netword_erorr_login,
  success_get_associated_clients,
  success_login,
  success_update_user_profile,
  wait_for_protected_content_to_be_rendered
} from '../test-utils';
import { Auth0ErrorCodes } from './Auth0ErrorCodes';

const server = setupServer();
const history = createMemoryHistory();

const session_info_storage = useSessionInfoStorage();
const return_url_persistence = useReturnUrlPersistence();

afterEach(() => {
  session_info_storage.clear();
  return_url_persistence.clear();
  server.resetHandlers();
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => {
  mock_get_auth0_session_result = {
    resolve: null,
    reject: null
  };
  session_info_storage.clear();
  history.replace(`/callback#access_token=eyJhbGciOiJIUzI1NiIsInR5368w`);
});
afterAll(() => server.close());

const state = return_url_persistence.create_state_string();
const mock_get_state_from_hash = () => Promise.resolve(state);
const mock_token = create_token();

type Auth0Result = {
  accessToken: string;
  emailVerified: boolean;
  sub: string;
};

let mock_get_auth0_session_result = {
  resolve: null,
  reject: null
} as {
  resolve?: Auth0Result;
  reject?: Auth0ErrorCodes | string;
};

const email_verified: Auth0Result = {
  accessToken: mock_token,
  emailVerified: true,
  sub: ''
};

const email_still_not_verified: Auth0Result = {
  accessToken: mock_token,
  emailVerified: false,
  sub: ''
};

jest.mock('../../hooks/useAuth0', () => ({
  useAuth0: () => ({
    logout: () => {},
    get_state_from_hash: mock_get_state_from_hash,
    get_session: async (): Promise<{
      accessToken: string;
      emailVerified: boolean;
      sub: string;
    }> =>
      new Promise((resolve, reject) => {
        if (mock_get_auth0_session_result.resolve) {
          return resolve(mock_get_auth0_session_result.resolve);
        }

        return reject(mock_get_auth0_session_result.reject);
      })
  })
}));

const clients = [create_client(), create_client()];

test('Deve mostrar mensagem de email não verificado.', async () => {
  mock_get_auth0_session_result = {
    resolve: email_still_not_verified
  };

  server.use(
    success_get_associated_clients(clients),
    failed_login(400, ErrorCodes.MissingToken)
  );
  render(<App {...{ history }} />);

  await waitFor(() => screen.getByRole('button', { name: /verif/i }));

  mock_get_auth0_session_result = {
    resolve: email_verified
  };

  fireEvent.click(screen.getByRole('button', { name: /verif/i }));

  await waitFor(() => screen.getByText(clients[0].name));
});

test('Deve mostrar mensagem de erro quando tentar fazer login e request de criacao de sessao falhar.', async () => {
  mock_get_auth0_session_result = {
    resolve: email_verified
  };
  server.use(
    success_get_associated_clients([clients[0]]),
    failed_login(400, `${ErrorCodes.MissingToken}: token inválido.`)
  );

  render(<App {...{ history }} />);

  await expect_logging_out(history);
});

test('Deve mostrar mensagem de erro quando erro de rede.', async () => {
  mock_get_auth0_session_result = {
    resolve: email_verified
  };
  server.use(
    success_get_associated_clients([clients[0]]),
    netword_erorr_login()
  );

  render(<App {...{ history }} />);

  await waitFor(() => screen.getByTestId(AuthErrorMessage.test_id));
  await waitFor(() => screen.getByText(/conexão/i));
  await expect_logging_out(history);
});

test('Deve mostrar mensagem de limite máximo de acessos simultaneos atingido.', async () => {
  mock_get_auth0_session_result = {
    resolve: email_verified
  };
  server.use(
    success_get_associated_clients([clients[0]]),
    failed_login(403, `${ErrorCodes.MaxSimultaneosUsersLimitReached}: erro.`)
  );

  render(<App {...{ history }} />);

  await expect_logging_out(history);
  await waitFor(() => screen.findByText(/máximo/i));
});

test('Deve fazer login direto quando somente um cliente permitido.', async () => {
  mock_get_auth0_session_result = {
    resolve: email_verified
  };
  const [client] = clients;
  const created_at = faker.datatype.number(20);
  const name = faker.name.firstName();
  const picture = faker.internet.avatar();

  const spy_login = jest.fn<any, [CreateSessionDto]>();
  const spy_user_profile = jest.fn<any, [UpdateProfileDto]>();
  server.use(
    success_get_associated_clients([client]),
    success_login({
      created_at,
      client,
      email: faker.internet.email(),
      spy: spy_login,
      name,
      picture
    }),
    success_update_user_profile(spy_user_profile)
  );

  render(<App {...{ history }} />);

  await wait_for_protected_content_to_be_rendered();
  await waitFor(() => expect(history.location.pathname).toBe('/inicial'));

  expect(spy_login).toHaveBeenCalledTimes(1);
  const r_dto: CreateSessionDto = spy_login.mock.calls[0][0];
  expect(r_dto).toStrictEqual({
    auth0_token: mock_token,
    client_id: client.id
  } as CreateSessionDto);

  // Persiste dados da sessao.
  expect(session_info_storage.get()).toStrictEqual({
    client_id: client.id,
    created_at,
    is_auth0: true,
    intranet_session_id: null,
    sso_id: null,
    sso_token: null
  } as SessionInfo);

  expect(spy_user_profile).toHaveBeenCalledTimes(1);
  expect(spy_user_profile.mock.calls[0][0]).toStrictEqual({
    name,
    picture
  });
});

test('Nao deve tentar fazer login direto quando unico cliente estiver bloqueado.', async () => {
  mock_get_auth0_session_result = {
    resolve: email_verified
  };
  const [client] = clients;
  const blocked_client = {
    ...client,
    blocked: true
  };

  server.use(
    success_get_associated_clients([
      {
        ...client,
        blocked: true
      }
    ])
  );

  render(<App {...{ history }} />);

  await waitFor(() => screen.getByText(blocked_client.name));
});

test('Deve fazer redirect do usuário para pagina que ele estava visitando antes da autenticacao.', async () => {
  mock_get_auth0_session_result = {
    resolve: email_verified
  };
  const return_url = '/pagina/qualquer?param=1';

  return_url_persistence.persist(state, return_url);

  const [client] = clients;
  const created_at = faker.datatype.number(20);

  server.use(
    success_get_associated_clients([client]),
    success_login({
      created_at,
      client,
      email: faker.internet.email()
    }),
    success_update_user_profile(jest.fn())
  );

  render(<App {...{ history }} />);

  await wait_for_protected_content_to_be_rendered();

  const [pathname, search] = return_url.split('?');
  await waitFor(() => expect(history.location.pathname).toBe(pathname));
  await waitFor(() => expect(history.location.search).toBe(`?${search}`));
});

test('Deve retomar fluxo de login quando usuario fez login no auth0 mas ainda nao fez login na plataforma.', async () => {
  mock_get_auth0_session_result = {
    resolve: email_verified
  };

  // Tem somente informacao que o usuário já fez login no auth0.
  session_info_storage.save({
    is_auth0: true
  });

  server.use(
    success_get_associated_clients(clients)
    // success_legacy_search()
  );

  history.replace('/livro/4487/4875');

  render(<App {...{ history }} />);

  // Persiste dados da sessao.
  await waitFor(() => screen.getByText(clients[0].name));
});
