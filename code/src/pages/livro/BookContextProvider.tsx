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

import React, { useEffect, useReducer } from 'react';
import _ from 'lodash';
import { BookContextModel } from '../../models/book/BookContextModel';
import { BookRequests } from '../../requests/book/BookRequests';

// @ts-ignore
export const BookContext = React.createContext();

interface IProps {
  match: any;
  children: any;
}

export const BookContextProvider = ({ match, children }: IProps) => {
  const bookId = +_.get(match, 'params.bookId');
  const editionId = +_.get(match, 'params.editionId');

  const [state, dispatch]: [BookContextModel, (action: any) => any] =
    useReducer(
      (state, action) => ({ ...state, ...action }),
      new BookContextModel()
    );

  // Carrega as edicoes de livros.
  useEffect(() => {
    if (!bookId) return;

    (async () => {
      try {
        dispatch({
          bookEditionsRequest: state.bookEditionsRequest.setLoading()
        });
        const editions = await BookRequests.getBookEditions(bookId);
        dispatch({
          bookEditionsRequest: state.bookEditionsRequest.setResult(editions)
        });
      } catch (error) {
        console.error(error);
        dispatch({
          bookEditionsRequest: state.bookEditionsRequest.setError(error)
        });
      }
    })();
  }, [bookId]);

  // carrega os capitulos da edicao
  useEffect(() => {
    if (editionId && bookId) {
      (async () => {
        try {
          dispatch({
            editionChaptersRequest: state.editionChaptersRequest.setLoading()
          });
          const chapters = await BookRequests.getEditionChapters(editionId);

          dispatch({
            editionChaptersRequest:
              state.editionChaptersRequest.setResult(chapters)
          });
        } catch (error) {
          console.error(error);
          dispatch({
            editionChaptersRequest: state.editionChaptersRequest.setError(error)
          });
        }
      })();
    }
  }, [editionId, bookId]);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};
