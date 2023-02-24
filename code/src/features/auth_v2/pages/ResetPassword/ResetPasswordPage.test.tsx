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
import * as ResetPasswordSuccessMessage from '../../components/ResetPasswordSuccessMessage';
import { change_input_value, get_email_input } from '../../flows/test-utils';
import { AuthRoutePaths } from '../AuthRoutePaths.enum';

const history = createMemoryHistory();

const server = setupServer();

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error'
  })
);

beforeEach(() => {
  history.replace(`${AuthRoutePaths.ResetPasswordPage}`);
  server.resetHandlers();
});

afterAll(() => server.close());

const get_recover_button = () =>
  screen.getByRole('button', { name: /redefinir/i });

test(`Deve preencher campo de email se tiver um email na querystring.".`, async () => {
  const history = createMemoryHistory();
  const email = faker.internet.email();
  history.replace(`${AuthRoutePaths.ResetPasswordPage}?email=${email}`);

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

    await waitFor(get_recover_button);

    change_input_value(get_email_input(), value);

    fireEvent.click(get_recover_button());

    await waitFor(() => screen.findByText(/e-mail inválido/i));
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

  await fill_form();

  fireEvent.click(get_recover_button());

  await waitFor(() => screen.findByText(/inesperado/i));
});

test(`Deve mostrar mensagem de sucesso.`, async () => {
  server.use(rest.post(/auth0/i, (req, res, ctx) => res.once(ctx.status(200))));

  render(<App {...{ history }} />);

  await fill_form();

  fireEvent.click(get_recover_button());

  await waitFor(() => screen.getByTestId(ResetPasswordSuccessMessage.test_id));
});

/** HELPERS */

async function fill_form() {
  await waitFor(get_email_input);

  change_input_value(
    get_email_input(),
    faker.internet.email('ricardo', 'onodera')
  );
}
