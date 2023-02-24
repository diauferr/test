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
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { setupServer } from 'msw/node';
import React from 'react';
import App from '../../../../App';
import { RestoreSessionDto } from '../../dtos/RestoreSessionDto';
import { useSessionInfoStorage } from '../../hooks/useSessionInfoStorage';
import { ErrorCodes } from '../../model/ErrorCodes.enum';
import { SessionInfo } from '../../model/SessionInfo';
import {
  create_client,
  expect_logging_out,
  failed_restore,
  faker,
  success_logout,
  success_restore,
  wait_for_protected_content_to_be_rendered
} from '../test-utils';
import { Auth0ErrorCodes } from './Auth0ErrorCodes';

const server = setupServer();
const history = createMemoryHistory();

const session_info_storage = useSessionInfoStorage();

const created_at = Date.now() - 900;

const client = create_client();
const session_info: SessionInfo = {
  client_id: client.id,
  created_at,
  is_auth0: true,
  intranet_session_id: null,
  sso_token: null
};

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error'
  });
});

beforeEach(() => {
  history.replace('/pagina/4875/48752');
  session_info_storage.save(session_info);
});
afterEach(() => {
  session_info_storage.clear();
  server.resetHandlers();
});
afterAll(() => server.close());
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
  accessToken: faker.random.alphaNumeric(32),
  emailVerified: true,
  sub: ''
};

const email_still_not_verified: Auth0Result = {
  accessToken: faker.random.alphaNumeric(32),
  emailVerified: false,
  sub: ''
};

jest.mock('../../hooks/useAuth0', () => ({
  useAuth0: () => ({
    logout: () => {},
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

const error_tests = [
  {
    error_code: Auth0ErrorCodes.LoginRequired,
    error_message: /novamente/i
  },
  {
    error_code: Auth0ErrorCodes.UserIsBlocked,
    error_message: /inativo/i
  },

  {
    error_code: Auth0ErrorCodes.TooManyAttempts,
    error_message: /tentativas/i
  }
];

error_tests.forEach(({ error_code, error_message }) => {
  test(`Deve mostrar mensagem de erro e fazer logout quando auth0 retornar erro "${error_code}".`, async () => {
    server.use(success_logout());
    mock_get_auth0_session_result = {
      reject: error_code
    };
    render(<App {...{ history }} />);

    await expect_logging_out(history);

    await waitFor(() => screen.findByText(error_message));
  });
});

test('Deve fazer logout quando nao conseguir fazer restore da sessao na api.', async () => {
  mock_get_auth0_session_result = {
    resolve: email_verified
  };

  server.use(failed_restore(), success_logout());

  render(<App {...{ history }} />);

  await expect_logging_out(history);
});

test('Deve mostrar aviso de sessao expirada.', async () => {
  mock_get_auth0_session_result = {
    resolve: email_verified
  };

  server.use(failed_restore(ErrorCodes.ExpiredSession), success_logout());

  render(<App {...{ history }} />);

  await expect_logging_out(history);
  await waitFor(() => screen.getByText(/expirou/i));
});

test('Deve mostrar aviso de confirmar conta se ainda nao verificada.', async () => {
  mock_get_auth0_session_result = {
    resolve: email_still_not_verified
  };
  render(<App {...{ history }} />);

  await waitFor(() => screen.getByRole('button', { name: /verif/i }));
});

test('Deve mostrar botao de sair na etapa de verificacao da conta.', async () => {
  mock_get_auth0_session_result = {
    resolve: email_still_not_verified
  };
  render(<App {...{ history }} />);

  await waitFor(() => screen.getByRole('button', { name: /sair/i }));
});

test('Deve conseguir fazer restore da sessao.', async () => {
  mock_get_auth0_session_result = {
    resolve: email_verified
  };
  const email = faker.internet.email();

  const spy = jest.fn<any, [RestoreSessionDto]>();

  server.use(
    success_restore({
      created_at,
      client,
      email,
      spy
    })
  );

  render(<App {...{ history }} />);

  await wait_for_protected_content_to_be_rendered();

  expect(spy).toHaveBeenCalledTimes(1);
  const req_dto = spy.mock.calls[0][0];

  expect(req_dto.created_at).toBe(created_at);
  expect(req_dto.client_id).toBe(client.id);
  expect(req_dto.auth0_token).toBe(email_verified.accessToken);
  expect(req_dto.intranet_session_id).toBeFalsy();
  expect(req_dto.sso_id).toBeFalsy();
  expect(req_dto.sso_token).toBeFalsy();
});
