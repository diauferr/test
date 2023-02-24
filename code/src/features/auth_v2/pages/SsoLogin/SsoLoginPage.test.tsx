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
import { UpdateProfileDto } from '../../dtos/UpdateProfileDto';
import { create_sso_id, create_token } from '../../flows/test-utils';
import { useSessionInfoStorage } from '../../hooks/useSessionInfoStorage';
import { AuthRoutePaths } from '../../pages/AuthRoutePaths.enum';

const history = createMemoryHistory();

test(`Deve mostrar mensagem de erro quando parametro do token não estiver presente na querystring.`, async () => {
  history.replace(`${AuthRoutePaths.SsoLoginPage}?t=&c=${create_sso_id()}`);
  render(<App {...{ history }} />);

  await waitFor(() => screen.getByText(/"token"/i));
});

test(`Deve mostrar mensagem de erro quando parametro do cliente não estiver presente na querystring.`, async () => {
  history.replace(`${AuthRoutePaths.SsoLoginPage}?t=${create_token()}`);
  render(<App {...{ history }} />);

  await waitFor(() => screen.getByText(/"cliente"/i));
});
