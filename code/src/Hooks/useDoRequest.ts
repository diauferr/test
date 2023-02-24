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

import { useCallback, useState } from 'react';
import { message } from 'antd';
import _ from 'lodash';

export function useDoRequest<TResult>(
  initialResult?: TResult,
  initialLoading = false,
  showErrorMessage = true
): [TResult, boolean, any, (request: any) => any] {
  const [loading, setLoading] = useState(initialLoading);
  const [result, setResult] = useState(initialResult);
  const [error, setError] = useState(null);

  const exec = useCallback(function exec(request: () => Promise<any>) {
    async function doAsync() {
      try {
        setError(null);
        setLoading(true);
        const result = await request();
        setResult(result);
        setLoading(false);
      } catch (error) {
        console.dir(error);

        if (
          showErrorMessage &&
          _.get(error, 'response.status') !== 401 &&
          _.get(error, 'response.status') !== 403 &&
          _.get(error, 'response.status') !== 404
        ) {
          message.error('Desculpe, ocorreu um erro inesperado.');
        }
        setResult(initialResult);
        setError(error);
        setLoading(false);
      }
    }

    doAsync();
  }, []);

  return [result, loading, error, exec];
}
