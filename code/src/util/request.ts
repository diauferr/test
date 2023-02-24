import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource
} from 'axios';
import _ from 'lodash';

const reqMap = new Map<string, CancelTokenSource>();

export function request() {
  function doRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    p: ReqParams
  ): Promise<AxiosResponse<T>> {
    let config: AxiosRequestConfig = {
      method,
      url: p.url
    };

    if (method === 'GET') {
      config.params = p.params;
    } else {
      config.data = p.params;
    }

    if (p.reqId) {
      if (reqMap.has(p.reqId)) {
        const t = reqMap.get(p.reqId);
        if (!!t) {
          t.cancel();
        }
      }

      const cancelToken = axios.CancelToken.source();
      reqMap.set(p.reqId, cancelToken);
      config.cancelToken = cancelToken.token;
    }

    return axios.request(config);
  }

  return {
    get: <T>(p: ReqParams) => doRequest<T>('GET', p),
    put: <T>(p: ReqParams) => doRequest<T>('PUT', p),
    post: <T>(p: ReqParams) => doRequest<T>('POST', p),
    delete: <T>(p: ReqParams) => doRequest<T>('DELETE', p),
    patch: <T>(p: ReqParams) => doRequest<T>('PATCH', p)
  };
}

export type ReqParams = {
  url: string;
  params?: any;
  reqId?: string;
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
request.set_token = (_forum_token: string) => {};

request.on_unauthorized = (cb: (err: any) => any) => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error: AxiosError) {
      if (_.get(error, 'response?.status') === 401) {
        cb(error.response.data);
      }

      return Promise.reject(error);
    }
  );
};
