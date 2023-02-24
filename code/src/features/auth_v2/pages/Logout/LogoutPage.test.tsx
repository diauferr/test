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

import { render, screen, waitFor } from '@testing-library/react';
import * as faker from 'faker';
import { createMemoryHistory } from 'history';
import { setupServer } from 'msw/node';
import React from 'react';
import App from '../../../../App';
import { LogoutSuccessDto } from '../../dtos/LogoutSuccessDto';
import {
  cant_call_logout,
  failed_logout,
  success_logout
} from '../../flows/test-utils';
import { useSessionInfoStorage } from '../../hooks/useSessionInfoStorage';
import { ErrorCodes } from '../../model/ErrorCodes.enum';
import { SessionInfo } from '../../model/SessionInfo';

const window_location = window.location;
const window_assign_spy = jest.fn();
const mock_auth0_logout_spy = jest.fn();

jest.mock('../../hooks/useAuth0', () => ({
  useAuth0: () => ({
    logout: () => {
      mock_auth0_logout_spy();
    }
  })
}));

const session_info_storage = useSessionInfoStorage();

const server = setupServer();

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error'
  });
});

beforeEach(() => {
  delete window.location;

  //@ts-ignore
  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(window_location),
      assign: {
        configurable: true,
        value: jest.fn()
      }
    }
  );
});

afterEach(() => {
  server.resetHandlers();
  session_info_storage.clear();
  mock_auth0_logout_spy.mockClear();
  window_assign_spy.mockClear();
  window.location = window_location;
});
afterAll(() => server.close());

const history = createMemoryHistory();

const TIMEOUT = 6000;

describe('auth0', () => {
  test(`Deve fazer logout quando usuario logado com auth0.`, async () => {
    session_info_storage.save({
      client_id: `${faker.datatype.number(9999)}`,
      created_at: Date.now(),
      is_auth0: true
    });
    server.use(success_logout());

    history.replace('/logout');
    render(<App {...{ history }} />);

    await waitFor(() => screen.getByText(/encerrando/i));
    await waitFor(() => expect(mock_auth0_logout_spy).toHaveBeenCalledTimes(1));

    expect(session_info_storage.get().is_auth0).toBeFalsy();
  });

  test(`Nao deve tentar fazer logout na api quando usuario so tiver feito login no auth0.`, async () => {
    session_info_storage.save({
      client_id: '',
      is_auth0: true
    });

    const spy_api_logout = jest.fn();

    server.use(cant_call_logout(spy_api_logout));

    history.replace('/logout');
    render(<App {...{ history }} />);

    await waitFor(() => expect(mock_auth0_logout_spy).toHaveBeenCalledTimes(1));
    expect(spy_api_logout).not.toHaveBeenCalled();
  });

  test(`Deve fazer logout do auth0 mesmo se der erro no logout da api.`, async () => {
    session_info_storage.save({
      client_id: `${faker.datatype.number(9999)}`,
      is_auth0: true
    });

    server.use(failed_logout());

    history.replace('/logout');
    render(<App {...{ history }} />);

    await waitFor(() => expect(mock_auth0_logout_spy).toHaveBeenCalledTimes(1));
  });
});

describe('sso', () => {
  const sso_session_info: SessionInfo = {
    client_id: `${faker.datatype.number(9999)}`,
    created_at: Date.now(),
    is_auth0: false,
    sso_id: 'mpu',
    sso_token: 'token'
  };

  test(`Deve redirecionar usuario para url do sistema externo quando logout SSO.`, async () => {
    session_info_storage.save(sso_session_info);

    const sso_login_url = faker.internet.url();
    const dto: LogoutSuccessDto = {
      sso_login_url
    };

    server.use(success_logout(dto));

    history.replace('/logout');
    delete window.location;

    //@ts-ignore
    window.location = { assign: window_assign_spy };
    render(<App {...{ history }} />);

    await waitFor(() => screen.getByText(/encerrando/i));
    await waitFor(() => expect(window_assign_spy).toHaveBeenCalledTimes(1));
    expect(window_assign_spy).toHaveBeenCalledWith(sso_login_url);

    expect(session_info_storage.get().sso_id).toBeFalsy();
  });

  const expired_tests = [ErrorCodes.ExpiredSession, ErrorCodes.TokenExpired];
});

test(`Deve redirecionar para tela inicial do sistema quando intranet.`, async () => {
  session_info_storage.save({
    client_id: `${faker.datatype.number(9999)}`,
    created_at: Date.now(),
    is_auth0: false,
    intranet_session_id: faker.random.alphaNumeric()
  });

  const spy_api_logout = jest.fn();

  server.use(cant_call_logout(spy_api_logout));

  history.replace('/logout');
  delete window.location;

  //@ts-ignore
  window.location = { assign: window_assign_spy };
  render(<App {...{ history }} />);

  await waitFor(() => screen.getByText(/encerrando/i));
  await waitFor(() => expect(window_assign_spy).toHaveBeenCalledTimes(1));
  expect(spy_api_logout).not.toHaveBeenCalled();
  expect(window_assign_spy.mock.calls[0][0]).toBe(window.origin);
});

// test(`Deve mostrar mensagem de sessao expirada.`, async () => {
// 	session_info_storage.save({
// 		client_id: faker.datatype.number(9999) + ``,
// 		created_at: Date.now(),
// 		sso_id: `mpu`,
// 	});

// 	const sso_login_url = faker.internet.url();

// 	const dto: LogoutSuccessDto = {
// 		sso_login_url,
// 	};
// 	server.use(success_logout(dto));

// 	history.replace(`/logout?reason=${LogoutReason.SessionExpired}`);
// 	delete window.location;

// 	//@ts-ignore
// 	window.location = { assign: window_assign_spy };
// 	render(<App {...{ history }} />);

// 	await waitFor(() => screen.getByText(/expirou/i));
// 	await waitFor(() => expect(window_assign_spy).toHaveBeenCalledTimes(1), {
// 		timeout: 10000,
// 	});
// 	expect(window_assign_spy.mock.calls[0][0]).toBe(sso_login_url);
// }, 10000);
