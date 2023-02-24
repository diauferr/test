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
import { Auth0ErrorCodes } from '../../flows/auth0_flow/Auth0ErrorCodes';
import {
  change_input_value,
  get_email_input,
  get_password_input
} from '../../flows/test-utils';
import {
  STATE_PERSIST_KEY,
  useReturnUrlPersistence
} from '../../hooks/useAuth0ReturnUrlPersistence';
import { AuthRoutePaths } from '../AuthRoutePaths.enum';

const return_url_persistence = useReturnUrlPersistence();

const server = setupServer();

beforeAll(() => server.listen());

beforeEach(() => {
  history.replace(AuthRoutePaths.LoginPage);
  server.resetHandlers();
  return_url_persistence.clear();
});

afterAll(() => server.close());

const history = createMemoryHistory();

const get_login_button = () => screen.getByTestId('btn-login');

const get_signup_button = () => screen.getByTestId('footer_action');

test(`Deve redirecionar para a tela de cadastro.`, async () => {
  render(<App {...{ history }} />);

  fireEvent.click(get_signup_button());

  await waitFor(() => screen.getByText(/uma conta da Plataforma/i));
});

test(`Deve preencher campo de email se tiver um email na querystring.".`, async () => {
  const history = createMemoryHistory();
  const email = faker.internet.email();
  history.replace(`/login?email=${email}`);

  render(<App {...{ history }} />);

  await waitFor(get_email_input);

  const email_input = get_email_input() as HTMLInputElement;

  expect(email_input.value).toBe(email);
});

const invalid_emails = [
  '',
  '@',
  '@gmail.com',
  'rick.onodera',
  'rick.onodera@',
  'rick.onodera@@gmail.com'
];

invalid_emails.forEach((value) => {
  test(`Deve informar erro quando email invalido quando valor for "${value}".`, async () => {
    render(<App {...{ history }} />);

    await waitFor(get_login_button);

    change_input_value(get_email_input(), value);

    fireEvent.click(get_login_button());

    await waitFor(() => screen.findByText(/e-mail inválido/i));
  });
});

const invalid_passwords = [
  '',
  '1',
  '12',
  '123',
  '1234',
  '12345',
  '12345      ',
  '123456',
  '1234567',
  '1234567 '
];

invalid_passwords.forEach((value) => {
  test(`Deve informar erro quando senha invalida quando valor for "${value}".`, async () => {
    render(<App {...{ history }} />);

    await waitFor(get_login_button);

    change_input_value(get_password_input(), value);

    fireEvent.click(get_login_button());

    await waitFor(() => screen.getByText(/deve ter/i));
  });
});

test(`Deve mostrar mensagem de erro inesperado caso auth0 responda com erro desconhecido.`, async () => {
  server.use(
    rest.post(/auth0/i, (req, res, ctx) =>
      res.once(
        compose(
          ctx.json({
            code: faker.random.alpha(),
            error_description: ''
          }),
          ctx.status(500)
        )
      )
    )
  );

  render(<App {...{ history }} />);

  await fill_login_form();

  fireEvent.click(get_login_button());

  await waitFor(() => screen.findByText(/inesperado/i));
});

test(`Deve salvar url de retorno antes de fazer login.`, async () => {
  const return_url = encodeURIComponent('/livro/8845/3234?text=jacoby');
  history.replace(`${AuthRoutePaths.LoginPage}?return_url=${return_url}`);

  server.use(
    rest.post(/auth0/i, (req, res, ctx) =>
      res.once(
        compose(
          ctx.json({
            code: faker.random.alpha(),
            error_description: ''
          }),
          ctx.status(500)
        )
      )
    )
  );
  render(<App {...{ history }} />);

  await fill_login_form();

  fireEvent.click(get_login_button());

  await waitFor(() =>
    expect(localStorage.getItem(STATE_PERSIST_KEY)).toMatch(
      decodeURIComponent(return_url)
    )
  );

  await fill_login_form();
});

const password_errors = [
  Auth0ErrorCodes.AccessDenied,
  Auth0ErrorCodes.InvalidUserPassword
];

password_errors.forEach((error_code) => {
  test_auth0_error_messsages(
    'email ou senha incorretos',
    error_code,
    /incorretos/i
  );
});

test_auth0_error_messsages(
  'muitas tentativas de acesso',
  Auth0ErrorCodes.TooManyAttempts,
  /tentativas/i
);

test_auth0_error_messsages(
  'úsuario bloqueado',
  Auth0ErrorCodes.UserIsBlocked,
  /encontra bloqueada/i
);

/******************************************* HELPERS */
function test_auth0_error_messsages(
  error_description: string,
  error_code: Auth0ErrorCodes,
  should_find_text_on_screen: RegExp
) {
  test(`Deve mostrar mensagem de ${error_description}.`, async () => {
    server.use(
      rest.post(/auth0/i, (req, res, ctx) => {
        const auth0_error_response = {
          code: error_code,
          error_description: ''
        };

        return res.once(
          compose(ctx.json(auth0_error_response), ctx.status(403))
        );
      })
    );

    render(<App {...{ history }} />);

    await fill_login_form();

    fireEvent.click(get_login_button());

    await waitFor(() => screen.findByText(should_find_text_on_screen));
  });
}

async function fill_login_form() {
  await waitFor(get_email_input);
  await waitFor(get_password_input);
  await waitFor(get_login_button);

  change_input_value(
    get_email_input(),
    faker.internet.email('ricardo', 'onodera')
  );

  change_input_value(get_password_input(), faker.internet.password(10));
}
