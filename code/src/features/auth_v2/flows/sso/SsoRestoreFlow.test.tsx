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
  create_token,
  expect_logging_out,
  failed_restore,
  success_logout,
  success_restore,
  wait_for_protected_content_to_be_rendered
} from '../test-utils';

const session_info_persistence = useSessionInfoStorage();
const server = setupServer();
const history = createMemoryHistory();

const client = create_client();
const sso_token = create_token();
const session_info: SessionInfo = {
  client_id: client.id,
  created_at: Date.now() - 587,
  intranet_session_id: null,
  is_auth0: false,
  sso_id: client.sso_id,
  sso_token
};

beforeAll(() => {
  server.listen({ onUnhandledRequest: `error` });
  session_info_persistence.save(session_info);
  const any_page_route = '/qualquer/548118';
  history.replace(any_page_route);
});
beforeEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
  session_info_persistence.clear();
});

test(`Deve fazer restore.`, async () => {
  const spy = jest.fn<any, [RestoreSessionDto]>();

  server.use(
    success_restore({
      sso_token,
      created_at: session_info.created_at,
      client,
      spy
    })
  );

  render(<App {...{ history }} />);

  await wait_for_protected_content_to_be_rendered();

  expect(spy).toHaveBeenCalledTimes(1);

  const r_dto: RestoreSessionDto = spy.mock.calls[0][0];
  expect(r_dto).toStrictEqual({
    created_at: session_info.created_at,
    sso_id: session_info.sso_id,
    sso_token: session_info.sso_token,
    auth0_token: null,
    client_id: null,
    intranet_session_id: null
  } as RestoreSessionDto);
});

test(`Deve mostrar mensagem de sessao expirada quando token expirar.`, async () => {
  server.use(failed_restore(ErrorCodes.TokenExpired), success_logout());

  render(<App {...{ history }} />);

  await expect_logging_out(history);
  await waitFor(() => screen.getByText(/expirou/i));
});

test(`Deve mostrar mensagem de sessao expirada quando sessao expirar.`, async () => {
  server.use(failed_restore(ErrorCodes.ExpiredSession), success_logout());

  render(<App {...{ history }} />);

  await expect_logging_out(history);
  await waitFor(() => screen.getByText(/expirou/i));
});
