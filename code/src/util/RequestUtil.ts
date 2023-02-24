/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosRequestConfig } from 'axios';
import _ from 'lodash';
import { Subject } from 'rxjs';

const { REACT_APP_LEGACY_API } = process.env;

class _RequestUtil {
  _token: string;

  private onUnauthorizedRequestCallback = new Subject();

  setToken = (token: string) => {
    this._token = token;
  };

  getCompleteUrl(url: string, baseUrl?: string) {
    if (url.includes('http')) {
      return url;
    }
    if (baseUrl) {
      return `${baseUrl}/${url}`;
    }
    return `${REACT_APP_LEGACY_API}/${url}`;
  }

  createGetRequest(
    url: string,
    params: any = {},
    withAuthentication = true,
    otherConfig: AxiosRequestConfig = {}
  ) {
    let withAuth = withAuthentication;
    const isLegacy = !!String(REACT_APP_LEGACY_API).includes('msproduction');
    if (isLegacy) {
      withAuth = false;
    }
    return this.createRequest('get', url, params, withAuth, otherConfig);
  }

  createPostRequest(
    url: string,
    params: any = {},
    withAuthentication = true,
    otherConfig: AxiosRequestConfig = {}
  ) {
    return this.createRequest(
      'post',
      url,
      params,
      withAuthentication,
      otherConfig
    );
  }

  createPutRequest(
    url: string,
    params: any = {},
    withAuthentication = true,
    otherConfig: AxiosRequestConfig = {}
  ) {
    return this.createRequest(
      'put',
      url,
      params,
      withAuthentication,
      otherConfig
    );
  }

  createDeleteRequest(
    url: string,
    params: any = {},
    withAuthentication = true,
    otherConfig: AxiosRequestConfig = {}
  ) {
    return this.createRequest(
      'delete',
      url,
      params,
      withAuthentication,
      otherConfig
    );
  }

  onUnauthorizedRequest(callback: (message: string) => any) {
    this.onUnauthorizedRequestCallback.subscribe(callback);
  }

  private errorCatcher = (error: any) => {
    if (_.get(error, 'response.status') === 401) {
      this.onUnauthorizedRequestCallback.next(
        `${_.get(error, 'response.data')}`
      );
    }

    throw error;
  };

  private createRequest(
    method: string,
    url: string,
    params: any = {},
    withAuthentication = true,
    otherConfig: AxiosRequestConfig = {}
  ) {
    otherConfig.headers = otherConfig.headers || {};
    otherConfig.headers = {
      ...otherConfig.headers,
      ...this.getAuthorizationHeader(this._token, withAuthentication)
    };
    const baseUrl =
      otherConfig && otherConfig.baseURL ? otherConfig.baseURL : '';
    const finalUrl = this.getCompleteUrl(url, baseUrl);

    return () => {
      switch (method) {
        case 'delete':
          return axios
            .delete(finalUrl, { params, ...otherConfig })
            .catch(this.errorCatcher);
        case 'put':
          return axios
            .put(finalUrl, params, { ...otherConfig })
            .catch(this.errorCatcher);
        case 'post':
          return axios
            .post(finalUrl, params, { ...otherConfig })
            .catch(this.errorCatcher);
        default:
          return axios
            .get(finalUrl, { params, ...otherConfig })
            .catch(this.errorCatcher);
      }
    };
  }

  private getAuthorizationHeader(token: string, withAuthentication: boolean) {
    const trueAuth = { Authorization: `Bearer ${this._token}` };
    return token && withAuthentication ? trueAuth : {};
  }
}

export const RequestUtil = new _RequestUtil();
