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

import { AxiosError } from 'axios';
import { http_client } from '../../../util/http_client';
import { AssociatedClientsDto } from '../dtos/AssociatedClientsDto';
import { AuthSuccessDto } from '../dtos/AuthSuccessDto';
import { CreateSessionDto } from '../dtos/CreateSessionDto';
import { GetAssociatedClientsQueryDto } from '../dtos/GetAssociatedClientsQueryDto';
import { LogoutSuccessDto } from '../dtos/LogoutSuccessDto';
import { RestoreSessionDto } from '../dtos/RestoreSessionDto';
import { ErrorCodes } from '../model/ErrorCodes.enum';

export const login_api_url = `${process.env.REACT_APP_AUTH_LOGIN_API}/login`;
export const restore_api_url = `${process.env.REACT_APP_AUTH_LOGIN_API}/restore`;
export const logout_api_url = `${process.env.REACT_APP_AUTH_LOGIN_API}/logout`;
export const clients_url = `${process.env.REACT_APP_AUTH_LOGIN_API}/clients`;
const get_contract_manager_ui_url = `${process.env.REACT_APP_AUTH_LOGIN_API}/contract-manager-ui-url`;

export function useAuthApi() {
  return {
    login: (dto: CreateSessionDto) =>
      http_client
        .post<AuthSuccessDto>(login_api_url, dto)
        .then((r) => r.data)
        .catch((error: AxiosError) => {
          throw get_error_from(error);
        }),

    restore: (dto: RestoreSessionDto) =>
      http_client
        .get<AuthSuccessDto>(restore_api_url, dto)
        .then((r) => r.data)
        .catch((error: AxiosError) => {
          throw get_error_from(error);
        }),
    logout: () =>
      http_client.delete<LogoutSuccessDto>(logout_api_url).then((r) => r.data),
    get_clients: (dto: GetAssociatedClientsQueryDto) =>
      http_client
        .get<AssociatedClientsDto>(clients_url, dto)
        .catch((error: AxiosError) => {
          throw get_error_from(error);
        }),
    get_contract_manager_ui_url: () =>
      http_client
        .get<string>(get_contract_manager_ui_url)
        .catch((error: AxiosError) => {
          throw get_error_from(error);
        })
  };
}

function get_error_from(r: AxiosError) {
  if (r && r.isAxiosError) {
    if (`${r.message}`.match(/network/i)) {
      return ErrorCodes.NetworkError;
    }

    if (r.response.status === 401 || r.response.status === 403) {
      const error_msg = `${r.response.data}`;

      if (error_msg.match(ErrorCodes.EmailNotVerified)) {
        return ErrorCodes.EmailNotVerified;
      }

      if (error_msg.match(ErrorCodes.TokenExpired)) {
        return ErrorCodes.TokenExpired;
      }

      if (error_msg.match(ErrorCodes.ExpiredSession)) {
        return ErrorCodes.ExpiredSession;
      }

      if (error_msg.match(ErrorCodes.MaxSimultaneosUsersLimitReached)) {
        return ErrorCodes.MaxSimultaneosUsersLimitReached;
      }
    }

    return `${r.response.data}`;
  }

  return `${r}`;
}
