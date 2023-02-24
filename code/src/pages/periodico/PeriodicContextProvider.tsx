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

/* eslint-disable no-console */
import _ from 'lodash';
import React, { useEffect, useReducer } from 'react';
import { PeriodicContextModel } from '../../models/periodic/PeriodicContextModel';
import { PeriodicRequests } from '../../requests/periodic/PeriodicRequests';

// @ts-ignore
export const PeriodicContext = React.createContext();

interface IProps {
  match: any;
  children: any;
}

export const PeriodicContextProvider = ({ match, children }: IProps) => {
  const periodicId = +_.get(match, 'params.periodicId');
  const editionId = +_.get(match, 'params.editionId');

  const [state, dispatch]: [PeriodicContextModel, (action: any) => any] =
    useReducer(
      (state, action) => ({ ...state, ...action }),
      new PeriodicContextModel()
    );

  // Carrega dados do periodico.
  useEffect(() => {
    if (!periodicId) return;

    (async () => {
      try {
        dispatch({
          periodicRequest: state.periodicRequest.setLoading()
        });

        const [periodic, editions]: any = await Promise.all([
          PeriodicRequests.getPeriodicInfo(periodicId),
          PeriodicRequests.getPeriodicEditions(periodicId)
        ]);

        dispatch({
          periodicRequest: state.periodicRequest.setResult(periodic),
          editionsRequest: state.editionsRequest.setResult(editions)
        });
      } catch (error) {
        console.error(error);
        dispatch({
          periodicRequest: state.periodicRequest.setError(error)
        });
      }
    })();
  }, [periodicId]);

  // Carrega artigos da edicao.
  useEffect(() => {
    if (!editionId) return;

    (async () => {
      try {
        dispatch({
          articlesRequest: state.articlesRequest.setLoading()
        });
        const result = await PeriodicRequests.getPeriodicEditionArticles(
          editionId
        );
        dispatch({
          articlesRequest: state.articlesRequest.setResult(result)
        });
      } catch (error) {
        console.error(error);
        dispatch({
          articlesRequest: state.articlesRequest.setError(error)
        });
      }
    })();
  }, [editionId]);

  return (
    <PeriodicContext.Provider value={{ state, dispatch }}>
      {children}
    </PeriodicContext.Provider>
  );
};
