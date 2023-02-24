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
import * as faker from 'faker';
import { createMemoryHistory } from 'history';
import { compose, rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import App from '../../../../App';
import {
  change_input_value,
  get_password_input,
  get_email_input
} from '../../flows/test-utils';

import { Auth0ErrorCodes } from '../../flows/auth0_flow/Auth0ErrorCodes';

const server = setupServer();

beforeAll(() => server.listen());
beforeEach(() => {
  history.replace('/cadastro');
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const history = createMemoryHistory();

const get_signup_button = () =>
  screen.getByRole('button', { name: /inscrever/i });

const get_confirm_password_input = () =>
  screen.getByLabelText('Confirmar senha');

const get_name_input = () => screen.getByLabelText('Nome');

test(`Deve informar erro no formulario caso ele não esteja valido.`, async () => {
  render(<App {...{ history }} />);

  await waitFor(get_signup_button);

  fireEvent.click(get_signup_button());

  await waitFor(() => screen.getByText(/inválidos/i));
});

test(`Deve informar erro de senhas não conferirem.`, async () => {
  render(<App {...{ history }} />);

  const password = faker.random.alpha({ count: 10 });

  change_input_value(get_password_input(), password);
  change_input_value(get_confirm_password_input(), `${password}T`);

  fireEvent.click(get_signup_button());

  await waitFor(() => screen.getByText(/conferem/i));
});

test(`Deve informar erro de nome obrigatório caso esteja vazio.`, async () => {
  render(<App {...{ history }} />);

  change_input_value(get_name_input(), ' ');

  fireEvent.click(get_signup_button());

  await waitFor(() => screen.getByText(/obrigatório/i));
});

test(`Deve preencher campo de email se tiver um email na querystring.".`, async () => {
  const history = createMemoryHistory();
  const email = faker.internet.email();
  history.replace(`/cadastro?email=${email}`);

  render(<App {...{ history }} />);

  await waitFor(get_email_input);

  const email_input = get_email_input() as HTMLInputElement;

  expect(email_input.value).toBe(email);
});

const auth0_error_tests = [
  [
    'erro de usuário já cadastrado',
    Auth0ErrorCodes.UserAlreadyExists,
    /está em uso/i
  ],
  [
    'erro de senha inválida na tentativa de cadastro',
    Auth0ErrorCodes.InvalidSignupPassword,
    /deve ter no mínimo/i
  ]
];

auth0_error_tests.forEach(
  ([description, auth0_error_code, should_find_in_screen]) => {
    test(`Deve informar ${description}.`, async () => {
      server.use(
        rest.post(/auth0/i, (req, res, ctx) => {
          const auth0_response = {
            name: 'BadRequestError',
            code: auth0_error_code,
            description: '',
            statusCode: 400
          };
          return res.once(compose(ctx.json(auth0_response), ctx.status(400)));
        })
      );

      render(<App {...{ history }} />);

      const password = faker.internet.password(10);

      change_input_value(get_email_input(), faker.internet.email());
      change_input_value(get_name_input(), faker.internet.userName());
      change_input_value(get_password_input(), password);
      change_input_value(get_confirm_password_input(), password);

      fireEvent.click(get_signup_button());

      await waitFor(() => screen.getByText(should_find_in_screen));
    });
  }
);
