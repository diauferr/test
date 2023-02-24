/* eslint-disable no-console */
import { message } from 'antd';
import _ from 'lodash';

export async function doRequestAndDispatchProgressActions(
  requestName: string,
  state: any,
  dispatch: (action: any) => any,
  requestPromise: any
) {
  const progressInfo = state[requestName];

  try {
    dispatch({ type: requestName, payload: progressInfo.setLoading() });
    dispatch({
      type: requestName,
      payload: progressInfo.setResult(await requestPromise())
    });
  } catch (error) {
    if (
      _.get(error, 'response.status') !== 401 &&
      _.get(error, 'response.status') !== 403 &&
      _.get(error, 'response.status') !== 404
    ) {
      message.error('Desculpe, ocorreu um erro inesperado.');
      console.error(error);
    }

    dispatch({ type: requestName, payload: progressInfo.setError(error) });
  }
}
