/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const http_client = {
  get: <T>(
    url: string,
    params = {},
    overrides: AxiosRequestConfigOverrides = {}
  ) => exec<T>('get', url, params, default_req_config, overrides),
  delete: <T>(
    url: string,
    params = {},
    overrides: AxiosRequestConfigOverrides = {}
  ) => exec<T>('delete', url, params, default_req_config, overrides),
  post: <T>(
    url: string,
    params = {},
    overrides: AxiosRequestConfigOverrides = {}
  ) => exec<T>('post', url, params, default_req_config, overrides),
  put: <T>(
    url: string,
    params = {},
    overrides: AxiosRequestConfigOverrides = {}
  ) => exec<T>('put', url, params, default_req_config, overrides)
};

let default_req_config: AxiosRequestConfig = {
  headers: {}
};

export function HttpClient() {
  return http_client;
}

HttpClient.set_token = (token: string) => {
  default_req_config = {
    ...default_req_config,
    headers: {
      ...default_req_config.headers,
      authorization: `Bearer ${token}`
    }
  };
};

type EvtName = 'unauthorized' | 'error';
type EvtCallback = (data: any) => any;

const evt_map = new Map<EvtName, Set<EvtCallback>>();

HttpClient.on = (evt_name: EvtName, cb: EvtCallback) => {
  if (!evt_map.has(evt_name)) {
    evt_map.set(evt_name, new Set());
  }

  evt_map.get(evt_name).add(cb);
};

function raise_event(name: EvtName, data?: any) {
  if (!evt_map.has(name)) {
    return;
  }

  const evt_callbacks = Array.from(evt_map.get(name));

  evt_callbacks.forEach((cb) => cb(data || null));
}

function exec<T>(
  method: 'post' | 'get' | 'delete' | 'put',
  url: string,
  // eslint-disable-next-line @typescript-eslint/default-param-last
  params = {},
  default_req_config: AxiosRequestConfig,
  overrides: AxiosRequestConfigOverrides
): Promise<AxiosResponse<T>> {
  const req_config = apply_req_config_defaults(default_req_config, overrides);

  let prom: Promise<AxiosResponse<T>>;

  switch (method) {
    case 'post':
      prom = axios.post<T>(url, params, req_config);
      break;

    case 'put':
      prom = axios.put<T>(url, params, req_config);
      break;

    case 'get':
      prom = axios.get<T>(url, {
        ...req_config,
        params
      });
      break;

    case 'delete':
      prom = axios.delete<T>(url, {
        ...req_config,
        params
      });
      break;

    default:
      throw new Error('metodo não identificado');
  }

  return prom.catch((error: AxiosError) => {
    // console.log({ x: error });
    if (error.isAxiosError && error.response && error.response.status === 401) {
      raise_event('unauthorized', error.response.data);
    }

    // console.log({ error }, "error ");
    throw error;
  });
}

function apply_req_config_defaults(
  default_req_config: AxiosRequestConfig,
  overrides: AxiosRequestConfigOverrides
): AxiosRequestConfig {
  const { authorization = '', ...other_headers } = {
    ...default_req_config.headers,
    ...(overrides.headers || {})
  };

  const defHeaders = {
    ...other_headers,
    authorization
  };

  const headers = overrides.unauthenticated ? other_headers : defHeaders;

  return {
    ...default_req_config,
    headers
  };
}

type AxiosRequestConfigOverrides = {
  unauthenticated?: boolean;
  headers?: any;
};
