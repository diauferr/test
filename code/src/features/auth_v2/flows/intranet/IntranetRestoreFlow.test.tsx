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
import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { setupServer } from 'msw/node';
import React from 'react';
import App from '../../../../App';
import { RestoreSessionDto } from '../../dtos/RestoreSessionDto';
import { useSessionInfoStorage } from '../../hooks/useSessionInfoStorage';
import { SessionInfo } from '../../model/SessionInfo';
import {
  create_client,
  create_intranet_session_id,
  failed_login,
  failed_restore,
  success_login,
  success_restore,
  wait_for_protected_content_to_be_rendered
} from '../test-utils';

const client = create_client();
const intranet_session_id = create_intranet_session_id();
const created_at = Date.now() - 898;

const session_info_storage = useSessionInfoStorage();

afterEach(() => {
  session_info_storage.clear();
});

const server = setupServer();

beforeAll(() => server.listen());

beforeEach(() => {
  session_info_storage.save({
    client_id: client.id,
    created_at,
    intranet_session_id
  });

  server.resetHandlers();
});
afterAll(() => server.close());

test('Deve fazer restore de uma sessao intranet.', async () => {
  const spy = jest.fn<any, [RestoreSessionDto]>();
  server.use(
    success_restore({
      client,
      created_at,
      intranet_session_id,
      spy
    })
  );

  render(<App />);

  await wait_for_protected_content_to_be_rendered();

  expect(spy.mock.calls[0][0]).toStrictEqual<RestoreSessionDto>({
    created_at,
    client_id: client.id,
    intranet_session_id,
    auth0_token: null,
    sso_id: null,
    sso_token: null
  });
});

test('Deve tentar fazer login no mesmo cliente se o restore da sessao falhar.', async () => {
  const old_intranet_session_id = create_intranet_session_id();
  const old_created_at = Date.now() - 898;

  const new_intranet_session_id = create_intranet_session_id();
  const new_created_at = Date.now();

  session_info_storage.save({
    client_id: client.id,
    created_at: old_created_at,
    intranet_session_id: old_intranet_session_id
  });

  server.use(
    failed_restore(),
    success_login({
      client,
      created_at: new_created_at,
      intranet_session_id: new_intranet_session_id
    })
  );

  render(<App />);

  await wait_for_protected_content_to_be_rendered();

  const session_info = session_info_storage.get();
  expect(session_info).toStrictEqual({
    client_id: client.id,
    created_at: new_created_at,
    intranet_session_id: new_intranet_session_id,
    is_auth0: false,
    sso_id: null,
    sso_token: null
  } as SessionInfo);
});

test('Deve fazer logout se tentar fazer restore e falhar e tentar login falhar.', async () => {
  session_info_storage.save({
    client_id: client.id,
    created_at,
    intranet_session_id
  });

  server.use(failed_restore(), failed_login(401));

  const history = createMemoryHistory();
  render(<App {...{ history }} />);

  await waitFor(() => expect(history.location.pathname).toMatch(/logout/i));

  const session_info = session_info_storage.get();
  expect(session_info.client_id).toBeFalsy();
  expect(session_info.created_at).toBeFalsy();
  expect(session_info.intranet_session_id).toBeFalsy();
}, 5000);
