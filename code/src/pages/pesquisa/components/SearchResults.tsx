/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';
import styled from 'styled-components';
import { SearchResultItemRenderer } from '../../../components/SearchResultItemRenderer';
import { useSearchContext } from '../hooks/useSearchContext';
import { Pagination } from './Pagination';
import { ResultsBar } from './ResultsBar';
import { SearchResultList } from './SearchResultList';
import { useSearchFilter } from '../hooks/useSearchFilter';
import { ErrorMessage } from '../../../components/ErrorMessage';

interface IProps {
  loading: boolean;
  error: any;
}

const Container = styled.div<any>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchResults = ({ loading, error }: IProps) => {
  const { state } = useSearchContext();
  const { filter, changeFilter } = useSearchFilter();

  const loadingSearchResultsByTitle = false;
  const acc = state.getGlobalSearchAcumulator();
  const totalCount = state.getTotalCount();

  if (error) return <ErrorMessage />;

  return (
    <Container>
      {loading || loadingSearchResultsByTitle ? null : (
        <ResultsBar totalCount={totalCount} />
      )}

      {state.titleSearchResults.length > 0 && (
        <SearchResultList loading={loadingSearchResultsByTitle || loading}>
          {state.titleSearchResults.map((item, index) => (
            <SearchResultItemRenderer
              result={item}
              key={`${index}conteudo${item.id}`}
            />
          ))}
        </SearchResultList>
      )}

      <SearchResultList loading={loadingSearchResultsByTitle || loading}>
        {acc &&
          acc.items.map((item, index) => (
            <SearchResultItemRenderer
              result={item.result}
              key={`${index}conteudo${item.result.id}`}
              otherProps={item.otherProps}
            />
          ))}
      </SearchResultList>

      <Pagination
        currentPage={filter.page}
        total={totalCount}
        onChange={(page: number) => {
          if (window.scrollTo) {
            window.scrollTo(0, 0);
          }

          changeFilter(filter, page);
        }}
      />
    </Container>
  );
};
