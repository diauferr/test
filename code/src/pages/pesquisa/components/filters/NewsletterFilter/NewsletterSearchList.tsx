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

import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { ClippingRequests } from '../../../../../requests/clipping/ClippingRequests';
import { Loader } from './NewsletterSearchResult';
import { Pagination } from '../../Pagination';
import { ResultsBar } from '../../ResultsBar';
import { useSearchFilter } from '../../../hooks/useSearchFilter';
import { useDoRequest } from '../../../../../Hooks/useDoRequest';
import { useSearchContext } from '../../../hooks/useSearchContext';

const Container = styled.div<any>`
  margin-bottom: 3rem;

  h3 {
    cursor: pointer;
  }

  p {
    padding: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    em {
      background: yellow;
    }
  }
`;

export const NewsletterSearchList = () => {
  const { clippingsInfo } = useSearchContext();
  const { filter, changeFilter } = useSearchFilter();
  const queryString = filter.convertToQueryString();
  const [searchResults, loading, , doRequest] = useDoRequest();

  useEffect(() => {
    doRequest(() =>
      ClippingRequests.clippingSearch(
        filter.page,
        filter.words,
        filter.clippingId
      )
    );
  }, [queryString]);

  function getTitle(publishDate: string, clippingId: string) {
    if (clippingId === 'abradt') {
      return `ABRADT - ${moment(publishDate).format('MMMM [de] YYYY')}`;
    }
    if (clippingId === 'jacoby') {
      return `Jacoby - ${moment(publishDate).format('DD [de] MMMM [de] YYYY')}`;
    }
  }

  const goToClipping = useCallback(
    (publishDate: string, clippingId: string) => {
      if (!clippingsInfo.result) return;
      const selectedClipping = clippingsInfo.result.find(
        (c) => c.id === clippingId
      );
      const formattedDate = moment(publishDate).format('YYYY-MM-DD');
      filter.words = '';
      filter.clippingId = clippingId;
      filter.clippingDate = formattedDate;
      filter.clippingMonthly = selectedClipping.monthly;
      changeFilter(filter);
    },
    [filter]
  );

  return loading ? (
    <Loader />
  ) : (
    <>
      {!loading && (
        <ResultsBar
          totalCount={
            !!searchResults && searchResults[0] ? searchResults[0].total : 0
          }
        />
      )}

      {!!searchResults &&
        //@ts-ignore
        searchResults.map((item) => (
          <Container>
            <h3 onClick={() => goToClipping(item.publishDate, item.parentId)}>
              {getTitle(item.publishDate, item.parentId)}
            </h3>
            {item.highlight.map((text: string) => (
              <p dangerouslySetInnerHTML={{ __html: text }} />
            ))}
          </Container>
        ))}
      <Pagination
        currentPage={filter.page}
        total={!!searchResults && searchResults[0] ? searchResults[0].total : 0}
        onChange={(page: number) => {
          changeFilter(filter, page);
        }}
      />
    </>
  );
};
