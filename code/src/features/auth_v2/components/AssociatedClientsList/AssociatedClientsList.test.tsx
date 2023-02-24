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

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DefaultRequestBody, RequestParams, RestRequest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import {
  create_client,
  empty_associated_clients,
  expect_logging_out,
  fail_get_clients,
  faker,
  success_get_associated_clients
} from '../../flows/test-utils';
import { Client } from '../../model/Client';
import { AssociatedClientsList } from './AssociatedClientsList';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const clients = [create_client(), create_client()];

test(`Deve listar clientes habilitados intranet.`, async () => {
  // Assegura que está fazendo o request para recuperar clientes intranet.
  const assert_req = (req: RestRequest<DefaultRequestBody, RequestParams>) => {
    expect(req.url.searchParams.get('auth0_token')).toBeFalsy();
  };

  server.use(success_get_associated_clients(clients, assert_req));

  render(
    <AssociatedClientsList
      {...{
        auth0_token: '',
        children: () => null,
        on_clients_loaded: jest.fn(),
        on_selected: jest.fn(),
        on_error: jest.fn()
      }}
    />
  );

  await waitFor(() => screen.getByText(clients[0].name));
  await waitFor(() => screen.getByText(clients[1].name));
});

test(`Deve listar clientes habilitados por email utilizando token auth0.`, async () => {
  const auth0_token = faker.random.alphaNumeric(20);
  // Assegura que está fazendo o request para recuperar clientes habilitados por email.
  const assert_req = (req: RestRequest<DefaultRequestBody, RequestParams>) => {
    expect(req.url.searchParams.get('auth0_token')).toBeTruthy();
  };

  server.use(success_get_associated_clients(clients, assert_req));

  render(
    <AssociatedClientsList
      {...{
        auth0_token,
        children: () => null,
        on_clients_loaded: jest.fn(),
        on_selected: jest.fn(),
        on_error: jest.fn()
      }}
    />
  );

  await waitFor(() => screen.getByText(clients[0].name));
  await waitFor(() => screen.getByText(clients[1].name));
});

test(`Deve invocar callback de erro caso aconteca um erro na api  de clientes.`, async () => {
  const on_error_spy = jest.fn();
  server.use(fail_get_clients(500, 'erro inesperado'));

  render(
    <AssociatedClientsList
      {...{
        on_selected: jest.fn(),
        on_error: on_error_spy,
        children: () => null,
        on_clients_loaded: jest.fn()
      }}
    />
  );

  await waitFor(() => expect(on_error_spy).toHaveBeenCalledTimes(1));
});
