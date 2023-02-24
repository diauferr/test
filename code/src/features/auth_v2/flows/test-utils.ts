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

import { fireEvent, screen, waitFor } from '@testing-library/react';
import * as _faker from 'faker';
import {
  compose,
  DefaultRequestBody,
  RequestParams,
  rest,
  RestRequest
} from 'msw';
import { AssociatedClientsDto } from '../dtos/AssociatedClientsDto';
import { AuthSuccessDto } from '../dtos/AuthSuccessDto';
import { CreateSessionDto } from '../dtos/CreateSessionDto';
import { LogoutSuccessDto } from '../dtos/LogoutSuccessDto';
import { RestoreSessionDto } from '../dtos/RestoreSessionDto';
import { UpdateProfileDto } from '../dtos/UpdateProfileDto';
import {
  clients_url,
  login_api_url,
  logout_api_url,
  restore_api_url
} from '../hooks/useAuthApi';
import { user_profile_api_url } from '../hooks/useUserProfileApi';
import { AssociatedBy } from '../model/AssociatedBy.enum';
import { Client } from '../model/Client';
import { password_input_default_label } from './auth0_flow/_components/inputs/PasswordInput';

export const faker = _faker;

/** ASSERTS */

/**
 * Faz o assert de quando a aplicação renderiza para o usuário logado
 */
export function wait_for_protected_content_to_be_rendered() {
  return waitFor(() => screen.findByTestId('protected')).catch((error) => {
    screen.debug();

    throw error;
  });
}

/** FORMS */

/**
 * Muda o valor de um input.
 * @param el
 * @param value
 */
export const change_input_value = (
  el: Document | Node | Element | Window,
  value: string
) =>
  fireEvent.change(el, {
    target: { value }
  });

export const get_email_input = () => screen.getByLabelText('E-mail');

export const get_password_input = () =>
  screen.getByLabelText(password_input_default_label);

export function fail_get_clients(status: 400 | 401 | 500, error_msg: string) {
  return rest.get(clients_url, (req, res, ctx) =>
    res.once(compose(ctx.status(status), ctx.text(error_msg)))
  );
}

/** REQUESTS */

export function success_get_associated_clients(
  clients: AssociatedClientsDto,
  assert_on_req: (
    req: RestRequest<DefaultRequestBody, RequestParams>
  ) => any = () => {}
) {
  return rest.get(clients_url, (req, res, ctx) => {
    assert_on_req(req);
    return res(ctx.json(clients));
  });
}

export function empty_associated_clients() {
  return rest.get(clients_url, (req, res, ctx) => {
    const dto: AssociatedClientsDto = [];
    return res.once(ctx.json(dto));
  });
}

export function success_login(args: {
  created_at: number;
  client: Client;
  email?: string;
  intranet_session_id?: string;
  spy?: jest.Mock<any, [CreateSessionDto]>;
  name?: string;
  picture?: string;
}) {
  return rest.post(login_api_url, (req, res, ctx) => {
    const r_dto = req.body as CreateSessionDto;

    if (args.spy) {
      args.spy(r_dto);
    }

    const dto = create_success_authentication_dto(
      args.created_at,
      args.client,
      args.email,
      args.intranet_session_id,
      args.name,
      args.picture
    );
    return res.once(ctx.json(dto));
  });
}

export function failed_login(status: number, error_msg = '') {
  return rest.post(login_api_url, (req, res, ctx) =>
    res(compose(ctx.status(status), ctx.text(error_msg)))
  );
}

export function netword_erorr_login() {
  return rest.post(login_api_url, (req, res, ctx) =>
    res.networkError('Network error')
  );
}

export function success_restore(args: {
  created_at: number;
  client: Client;
  email?: string;
  intranet_session_id?: string;
  sso_token?: string;
  spy: jest.Mock<any, [RestoreSessionDto]>;
}) {
  return rest.get(restore_api_url, (req, res, ctx) => {
    const { searchParams } = req.url;

    const req_dto: RestoreSessionDto = {
      client_id: searchParams.get('client_id'),
      created_at: +searchParams.get('created_at'),
      auth0_token: searchParams.get('auth0_token'),
      intranet_session_id: searchParams.get('intranet_session_id'),
      sso_id: searchParams.get('sso_id'),
      sso_token: searchParams.get('sso_token')
    };

    args.spy(req_dto);

    const dto = create_success_authentication_dto(
      args.created_at,
      args.client,
      args.email,
      args.intranet_session_id
    );
    return res.once(ctx.json(dto));
  });
}

export function failed_restore(error_message = '') {
  return rest.get(restore_api_url, (req, res, ctx) =>
    res.once(compose(ctx.status(401), ctx.text(error_message)))
  );
}

export function success_logout(dto?: LogoutSuccessDto) {
  return rest.delete(logout_api_url, (req, res, ctx) =>
    res.once(ctx.json(dto || {}))
  );
}

export function failed_logout() {
  return rest.delete(logout_api_url, (req, res, ctx) =>
    res.once(ctx.status(500))
  );
}

export function cant_call_logout(spy: jest.Mock) {
  return rest.delete(logout_api_url, (req, res, ctx) => {
    spy();
    return res.once(ctx.status(500));
  });
}

function create_success_authentication_dto(
  created_at: number,
  client: Client,
  email?: string,
  intranet_session_id?: string,
  name?: string,
  picture?: string
): AuthSuccessDto {
  return {
    created_at,
    intranet_session_id,
    email: email || faker.internet.email(),
    name: name || '',
    picture: picture || '',
    platform_token: 'jwt token',
    roles: [],
    token_legacy: 'jwt token',
    client: {
      ...client,
      contracted_products: client.contractedProducts
    }
  };
}

export function success_update_user_profile(
  spy: jest.Mock<any, [UpdateProfileDto]>
) {
  return rest.put(user_profile_api_url, (req, res, ctx) => {
    spy(req.body as UpdateProfileDto);
    return res.once(ctx.status(200));
  });
}

/** FAKE DATA */

export function create_client_id() {
  return `${faker.random.alpha({ count: 4 })}`;
}

export function create_sso_id() {
  return faker.random.alpha({
    count: 3,
    upcase: false
  });
}

export function create_token() {
  return faker.random.alphaNumeric(30);
}

export function create_client(blocked = false): Client {
  return {
    contractedProducts: [],
    associated_by: AssociatedBy.Domain,
    id: `${faker.datatype.number(8000)}`,
    name: faker.company.companyName(),
    sso_id: faker.random.alpha({ count: 4, upcase: false }),
    sso_login_url: faker.internet.url(),
    initials: faker.random.alpha({ count: 3 }),
    unlimited: true,
    blocked
  };
}

export function create_intranet_session_id() {
  return faker.datatype.uuid();
}

/** NAV */

export const expect_logging_out = (history: any) =>
  waitFor(() => expect(history.location.pathname).toMatch(/logout/i));
