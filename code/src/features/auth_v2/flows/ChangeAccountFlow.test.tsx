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
import App from '../../../App';
import { UserSession } from '../model/UserSession';
import { ChangeAccountFlow } from './ChangeAccountFlow';
import { create_client, success_get_associated_clients } from './test-utils';

const server = setupServer();
const history = createMemoryHistory();

afterEach(() => {
  server.resetHandlers();
});

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
  history.replace('/pesquisa/todos');
});
beforeEach(() => {});
afterAll(() => server.close());

const clients = [create_client(), create_client()];

const test_session: UserSession = {
  client: {
    id: clients[0].id,
    contracted_products: [],
    initials: 'TEST',
    name: clients[0].name,
    unlimited: true
  },
  created_at: Date.now(),
  email: 'teste@teste.com.br',
  intranet_session_id: null,
  name: 'teste',
  picture: '',
  roles: [],
  contractedProducts: []
};

jest.mock('../hooks/useAuth0', () => ({
  useAuth0: () => ({
    logout: () => {},
    get_state_from_hash: () => Promise.resolve('state'),
    get_session: async (): Promise<{
      accessToken: string;
      emailVerified: boolean;
      sub: string;
    }> =>
      new Promise((resolve, reject) =>
        resolve({
          accessToken: 'token',
          emailVerified: true,
          sub: ''
        })
      )
  })
}));

test('Deve mostrar mensagem de nenhuma outra conta habilitada quando usuario so possuir um cliente associado a ele.', async () => {
  server.use(success_get_associated_clients([clients[0]]));

  render(
    <App {...{ history, test_session, test_children: <ChangeAccountFlow /> }} />
  );

  await waitFor(() => screen.getByText(/nenhuma outra conta/i));
});
