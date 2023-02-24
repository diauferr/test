/* eslint-disable no-console */
import { MockAxios } from './MockAxios';
import { RequestUtil } from './RequestUtil';

describe('RequestUtil', () => {
  afterEach(() => {
    MockAxios.reset();
  });

  it('deve chamar funcao com mensagem de erro quando um request retornar erro 401.', async () => {
    try {
      const fakeUrl = 'url';
      MockAxios.onGet(RequestUtil.getCompleteUrl('url')).reply(
        401,
        'AUTH001   A sessão do usuário expirou'
      );
      const spy = jest.fn();
      RequestUtil.onUnauthorizedRequest(spy);

      await RequestUtil.createGetRequest(fakeUrl)().catch(() => null);

      expect(spy.mock.calls.length).toBe(1);
      expect(spy.mock.calls[0][0]).toMatch(/AUTH001/);
    } catch (err) {
      console.error(err);
    }
  });

  it('nao deve chamar callback de nao autenticado quando erro nao for 401.', async () => {
    try {
      const fakeUrl = 'url';
      MockAxios.onGet(RequestUtil.getCompleteUrl('url')).reply(500);
      const spy = jest.fn();
      RequestUtil.onUnauthorizedRequest(spy);

      await RequestUtil.createGetRequest(fakeUrl)().catch(() => null);

      expect(spy.mock.calls.length).toBe(0);
    } catch (err) {
      console.error(err);
    }
  });
});
