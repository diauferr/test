/* eslint-disable @typescript-eslint/naming-convention */
import { compose, rest, RestRequest } from 'msw';
import { setupServer } from 'msw/node';
import { HttpClient, http_client } from './http_client';

const base_url = '/test';
const headers_test_url = '/test/headers';
const unauthorized_test_url = '/test/unauthorized';
const session_expired_message = `sua sessao expirou`;

const methods = ['post', 'get', 'put', 'delete'];

const server = setupServer(
  // Teste dos parametros
  rest.get(base_url, (req, res, ctx) => {
    const search_params = req.url.searchParams;
    return res(
      ctx.json({
        username: search_params.get('username'),
        email: search_params.get('email')
      })
    );
  }),
  rest.delete(base_url, (req, res, ctx) => {
    const search_params = req.url.searchParams;
    return res(
      ctx.json({
        username: search_params.get('username'),
        email: search_params.get('email')
      })
    );
  }),
  rest.post(base_url, (req, res, ctx) => res(ctx.json(req.body))),
  rest.put(base_url, (req, res, ctx) => res(ctx.json(req.body))),

  // Testes do header do request
  ...methods.map((method) =>
    rest[method](headers_test_url, (req: RestRequest, res, ctx) => {
      const req_headers = req.headers.all();

      return res(ctx.json(req_headers));
    })
  ),

  // Testes de callback de nao autorizado
  ...methods.map((method) =>
    rest[method](unauthorized_test_url, (req: RestRequest, res, ctx) =>
      res(compose(ctx.status(401), ctx.text(session_expired_message)))
    )
  )
);

beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});

test('Deve sempre ter somente uma instancia de HttpClient.', async () => {
  const inst_1 = HttpClient();
  const inst_2 = HttpClient();
  const inst_3 = http_client;

  expect(inst_1).toBe(inst_2);
  expect(inst_2).toBe(inst_3);
});

test('Deve realizar um request GET.', async () => {
  const params = { username: 'ricardo', email: 'rick.onodera@gmail.com' };
  const r = await http_client.get(base_url, params);

  expect(r.data).toEqual(params);
});

test('Deve realizar um request POST.', async () => {
  const params = {
    username: 'ricardo',
    email: 'rick.onodera@gmail.com',
    password: 'senha',
    picture: 'https://image.com/pic.jpg'
  };

  const r = await http_client.post(base_url, params);

  expect(r.data).toEqual(params);
});

test('Deve realizar um request PUT.', async () => {
  const params = { username: 'ricardo', email: 'rick.onodera@gmail.com' };
  const r = await http_client.put(base_url, params);

  expect(r.data).toEqual(params);
});

test('Deve realizar um request DELETE.', async () => {
  const params = { username: 'ricardo', email: 'rick.onodera@gmail.com' };
  const r = await http_client.delete<{ username: string; email: string }>(
    base_url,
    params
  );

  expect(r.data).toEqual(params);
});

methods.forEach((method) => {
  test(`Deve setar o auth token do request para o metodo ${method}.`, async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    HttpClient.set_token(token);

    const r = await http_client[method](headers_test_url);

    expect(r.data.authorization).toBe(`Bearer ${token}`);
  });

  test(`Deve retirar o token do metodo ${method}.`, async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    HttpClient.set_token(token);

    const r = await http_client[method](
      headers_test_url,
      {},
      {
        unauthenticated: true
      }
    );

    expect(r.data.authorization).toBeFalsy();
  });

  test(`Deve conseguir setar headers para o request de metodo ${method}.`, async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    HttpClient.set_token(token);

    const r = await http_client[method](
      headers_test_url,
      {},
      {
        headers: {
          test: 'valor teste'
        }
      }
    );

    expect(r.data.test).toBe('valor teste');
    // manteve outros headers
    expect(r.data.authorization).toBe(`Bearer ${token}`);
  });

  test(`Deve chamar callbacks de request nao autorizados ${method}.`, (done) => {
    const on_not_authorized_cb_1 = jest.fn();
    const on_not_authorized_cb_2 = jest.fn();

    HttpClient.on('unauthorized', on_not_authorized_cb_1);
    HttpClient.on('unauthorized', on_not_authorized_cb_1);
    HttpClient.on('unauthorized', on_not_authorized_cb_2);

    http_client[method](unauthorized_test_url)
      .then(() => done('nao deveria completar'))
      .catch((r) => {
        expect(r.response.status).toBe(401);
        expect(on_not_authorized_cb_1).toBeCalledTimes(1);
        expect(on_not_authorized_cb_1).toBeCalledWith(session_expired_message);
        expect(on_not_authorized_cb_2).toBeCalledTimes(1);
        expect(on_not_authorized_cb_2).toBeCalledWith(session_expired_message);
        done();
      });
  });
});
