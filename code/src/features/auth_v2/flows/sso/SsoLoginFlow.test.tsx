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

import { render, waitFor } from '@testing-library/react';
import * as faker from 'faker';
import { createMemoryHistory } from 'history';
import { setupServer } from 'msw/node';
import React from 'react';
import App from '../../../../App';
import { UpdateProfileDto } from '../../dtos/UpdateProfileDto';
import { useSessionInfoStorage } from '../../hooks/useSessionInfoStorage';
import { ErrorCodes } from '../../model/ErrorCodes.enum';
import { AuthRoutePaths } from '../../pages/AuthRoutePaths.enum';
import {
  create_client,
  create_token,
  success_login,
  success_update_user_profile,
  wait_for_protected_content_to_be_rendered
} from '../test-utils';

const session_info = useSessionInfoStorage();
const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const history = createMemoryHistory();

test(`Deve fazer login.`, async () => {
  const client = create_client();
  const token = create_token();
  const created_at = Date.now();
  const name = faker.name.firstName();
  const picture = faker.internet.avatar();

  const update_profile_spy = jest.fn<any, [UpdateProfileDto]>();
  server.use(
    success_login({
      client,
      created_at,
      email: faker.internet.email(),
      name,
      picture
    }),
    success_update_user_profile(update_profile_spy)
  );

  history.replace(
    `${AuthRoutePaths.SsoLoginPage}?t=${token}&c=${client.sso_id}`
  );
  render(<App {...{ history }} />);

  await waitFor(() => expect(history.location.pathname).toBe('/inicial'));
  await wait_for_protected_content_to_be_rendered();

  expect(session_info.get().client_id).toBe(client.id);
  expect(session_info.get().created_at).toBe(created_at);
  expect(session_info.get().sso_token).toBe(token);
  expect(session_info.get().sso_id).toBe(client.sso_id);
  expect(session_info.get().is_auth0).toBeFalsy();
  expect(session_info.get().intranet_session_id).toBeFalsy();

  expect(update_profile_spy).toHaveBeenCalledTimes(1);
  expect(update_profile_spy.mock.calls[0][0]).toStrictEqual({
    name,
    picture
  });
});
