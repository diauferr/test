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
import _ from 'lodash';
import { http_client } from '../util/http_client';

const api_url = process.env.REACT_APP_CONTENT_DOWNLOAD_API;

export function useContentDownload() {
  return {
    try_download: (
      pdfUrl: string,
      cbs: {
        on_success: () => any;
        on_limit_exceded: (error: string) => any;
      }
    ) => {
      const url = `${pdfUrl}`.split('Uploads')[1] || pdfUrl;
      return http_client
        .get(api_url, { url })
        .then(() => cbs.on_success())
        .catch((error: AxiosError) => {
          if (_.get(error, 'response.status') === 429) {
            return cbs.on_limit_exceded(error.response.data);
          }

          throw _.get(error, 'response.data');
        });
    }
  };
}
