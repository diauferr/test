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

import { http_client } from '../../../util/http_client';
import { UpdateProfileDto } from '../dtos/UpdateProfileDto';

export const user_profile_api_url = process.env.REACT_APP_USER_PROFILE_API;

export function useUserProfileApi() {
  return {
    update: (dto: UpdateProfileDto) =>
      http_client.put(user_profile_api_url, dto).catch((error) => {
        // Erro na atualização do perfil não deve impedir usuário de fazer login.
        console.error(error);
      })
  };
}
