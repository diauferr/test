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
import { CreateSessionDto } from '../../dtos/CreateSessionDto';
import { useSessionInfoStorage } from '../../hooks/useSessionInfoStorage';
import { SessionInfo } from '../../model/SessionInfo';
import { AuthRoutePaths } from '../../pages/AuthRoutePaths.enum';
import * as AuthRoutes from '../../pages/AuthRoutes';
import {
  create_client,
  create_intranet_session_id,
  empty_associated_clients,
  failed_login,
  fail_get_clients,
  get_email_input,
  success_get_associated_clients,
  success_login,
  wait_for_protected_content_to_be_rendered
} from '../test-utils';

const session_info_storage = useSessionInfoStorage();

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
beforeEach(() => {
  server.resetHandlers();
  session_info_storage.clear();
});
afterAll(() => server.close());

const auth_routes = [
  AuthRoutePaths.LoginPage,
  AuthRoutePaths.SignupPage,
  AuthRoutePaths.CallbackPage,
  AuthRoutePaths.SsoLoginPage,
  AuthRoutePaths.LogoutPage,
  AuthRoutePaths.ResetPasswordPage
];

auth_routes.forEach((auth_route) => {
  test(`Não deve tentar fazer login intranet em telas de autenticacao. Rota: ${auth_route}.`, async () => {
    const history = createMemoryHistory();

    history.replace(auth_route);

    render(<App {...{ history }} />);

    await waitFor(() => screen.getByTestId(AuthRoutes.test_id));
  });
});

test('Deve redirecionar usuario para tela de login caso nao tenha clientes habilitados por ip.', async () => {
  const history = createMemoryHistory();
  const visiting_page = `/busca?text=licitações`;
  history.replace(visiting_page);

  server.use(empty_associated_clients());

  render(<App {...{ history }} />);

  await waitFor(() => expect(history.location.pathname).toMatch(/login/i));
  await waitFor(() =>
    // Testa se coloca o return_url no parametro de rota para redirecionar o usuario apos o login.
    expect(
      history.location.search.includes(
        `return_url=${encodeURIComponent(visiting_page)}`
      )
    ).toBe(true)
  );
  await waitFor(get_email_input);
});

test('Deve redirecionar usuario para tela de login caso erro no request de listagem de clientes por ip.', async () => {
  const history = createMemoryHistory();

  server.use(fail_get_clients(500, 'erro '));

  render(<App {...{ history }} />);

  await waitFor(() => expect(history.location.pathname).toMatch(/login/i));
});

{
  const clients = [create_client(), create_client()];

  test('Deve mostrar selecao de clientes caso usuario tenha acesso a mais de uma conta por ip.', async () => {
    server.use(success_get_associated_clients(clients));

    render(<App />);

    await waitFor(() => screen.findByText(clients[0].name));
    await waitFor(() => screen.findByText(clients[1].name));
  });

  test('Deve  fazer login direto quando o usuario tiver acesso a somente um cliente.', async () => {
    const client = clients[0];
    const created_at = Date.now();
    const intranet_session_id = create_intranet_session_id();

    const spy = jest.fn<any, [CreateSessionDto]>();
    server.use(
      success_get_associated_clients([client]),
      success_login({
        created_at,
        client,
        intranet_session_id,
        spy
      })
    );

    render(<App />);

    await wait_for_protected_content_to_be_rendered();

    expect(spy).toHaveBeenCalledTimes(1);
    const r_dto: CreateSessionDto = spy.mock.calls[0][0];

    expect(r_dto).toStrictEqual({
      client_id: client.id
    } as CreateSessionDto);
  });

  test('Deve tentar fazer login quando id do clienet informado pela querystring(ex: link dentro da intranet de orgaos publicos).', async () => {
    const history = createMemoryHistory();
    const client = clients[1];
    const created_at = Date.now();
    const intranet_session_id = create_intranet_session_id();

    const spy = jest.fn<any, [CreateSessionDto]>();
    server.use(
      success_login({
        created_at,
        client,
        intranet_session_id,
        spy
      })
    );

    history.replace(`/?directClientSelect=${client.id}`);
    render(<App {...{ history }} />);

    await wait_for_protected_content_to_be_rendered();

    expect(spy).toHaveBeenCalledTimes(1);
    const r_dto: CreateSessionDto = spy.mock.calls[0][0];
    expect(r_dto).toStrictEqual({
      client_id: client.id
    } as CreateSessionDto);
  });

  test('Deve fazer login ao selecionar um cliente.', async () => {
    const created_at = Date.now();
    const intranet_session_id = create_intranet_session_id();
    const selected_client = clients[0];

    const spy = jest.fn<any, [CreateSessionDto]>();
    server.use(
      success_get_associated_clients(clients),
      success_login({
        created_at,
        client: selected_client,
        intranet_session_id,
        spy
      })
    );

    render(<App />);

    await waitFor(() => screen.findByText(selected_client.name));

    fireEvent.click(screen.getByText(selected_client.name));

    // Redireciona para a tela da aplicacao.
    await wait_for_protected_content_to_be_rendered();

    expect(spy).toHaveBeenCalledTimes(1);
    const r_dto: CreateSessionDto = spy.mock.calls[0][0];

    expect(r_dto).toStrictEqual({
      client_id: selected_client.id
    } as CreateSessionDto);

    // Persiste dados da sessao.
    expect(session_info_storage.get()).toStrictEqual({
      client_id: selected_client.id,
      created_at,
      intranet_session_id,
      is_auth0: false,
      sso_id: null,
      sso_token: null
    } as SessionInfo);
  });

  test('Deve mostrar erro e opcao de ir para login, ou tentar novamente, caso de erro na api de login.', async () => {
    const client = clients[0];
    const error_msg = 'ocorreu um erro inesperado';

    server.resetHandlers();
    server.use(
      success_get_associated_clients([client]),
      failed_login(500, error_msg)
    );

    render(<App />);

    await waitFor(() => screen.findByText(error_msg));
    await waitFor(() => screen.findByText(/tentar novamente/i));
  });

  test('Deve mostrar erro e opcao de ir para login caso de erro no login ao selecionar um cliente.', async () => {
    const selected_client = clients[0];
    const error_msg = 'aws permission denied';

    server.use(
      success_get_associated_clients(clients),
      failed_login(500, error_msg)
    );

    render(<App />);

    await waitFor(() => screen.findByText(selected_client.name));

    fireEvent.click(screen.getByText(selected_client.name));

    await waitFor(() => screen.findByText(error_msg));
    await waitFor(() => screen.findByText(/tentar novamente/i));
  });
}
