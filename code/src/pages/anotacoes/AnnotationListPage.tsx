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

import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AsyncComponent } from '../../components/AsyncComponent';
import { ContentAnnotationList } from '../../components/ContentAnnotationList';
import { DefaultContentListItemPlaceholder } from '../../components/DefaultContentListItem/DefaultContentListItemPlaceholder';
import { NoResultsFoundMessage } from '../../components/NoResultsFoundMessage';
import { SearchResultItemRenderer } from '../../components/SearchResultItemRenderer';
import { SearchInput } from '../../components/_inputs/SearchInput';
import { Title } from '../../components/_shell/Title';
import { ContentWithTitleTemplate } from '../../components/_templates/ContentWithTitleTemplate';
import { useReturnUrlFromPdf } from '../../Hooks/useReturnUrlFromPdf';
import { queryStringParser } from '../../util/QueryStringParser';
import { Pagination } from '../pesquisa/components/Pagination';
import { useAnnotationsState } from './hooks/useAnnotationsState';

export const AnnotationListPage = (props: RouteComponentProps) => {
  const { state, getAnnotations } = useAnnotationsState();
  const { returnToHereFromPdf } = useReturnUrlFromPdf();
  const history = useHistory();
  const words = useRef('');
  const page: number = _.get(props.match.params, 'page') || 0;
  const queryString: any = queryStringParser.fromQueryString(location.search);
  const [textToSearch, setTextToSearch] = useState('');

  useEffect(() => {
    if (words.current !== queryString.words) {
      words.current = queryString.words;

      setTextToSearch(queryString.words);

      returnToHereFromPdf();

      getAnnotations(page, queryString.words);
    }
  }, [queryString]);

  useEffect(() => {
    getAnnotations(page);
    returnToHereFromPdf();
  }, [page]);

  return (
    <ContentWithTitleTemplate
      TitleContent={<Title key="1">Minhas anotações</Title>}
      Content={
        <Container>
          <ClippingSearchContainer>
            <SearchInput
              labelText="Pesquisar nas anotações:"
              doSearch={(textInput: string) => {
                const search = queryStringParser.toQueryString({
                  words: textInput
                });

                history.push(`/anotacoes/1?${search}`);
              }}
              onChange={setTextToSearch}
              value={textToSearch}
            />
            <span>Ordenado por data (decrescente)</span>
          </ClippingSearchContainer>

          <AsyncComponent
            error={state.requestProgress.error}
            loading={state.requestProgress.loading}
            renderPlaceholder={() => (
              <div style={{ width: '100%' }}>
                <DefaultContentListItemPlaceholder
                  style={{ marginBottom: '2rem' }}
                />
                <DefaultContentListItemPlaceholder
                  style={{ marginBottom: '2rem' }}
                />
                <DefaultContentListItemPlaceholder
                  style={{ marginBottom: '2rem' }}
                />
              </div>
            )}
            renderContent={() => (
              <>
                {!!(state.total === 0) && (
                  <NoResultsFoundMessage message="Você ainda não possui anotações" />
                )}
                <Ul>
                  {(state.annotations || []).map((contentAnnotations) => (
                    <SearchResultItemRenderer
                      result={contentAnnotations.content}
                      key={`groupAnnotationsByContent_${contentAnnotations.content.id}`}
                      otherProps={{
                        className: 'content-item',
                        Content: (
                          <ContentAnnotationList
                            annotations={contentAnnotations.annotations}
                          />
                        )
                      }}
                    />
                  ))}
                </Ul>

                <PaginationContainer>
                  <Pagination
                    {...{
                      onChange: (page: number) =>
                        props.history.push(`/anotacoes/${page}`),
                      currentPage: page,
                      total: state.total,
                      pageSize: 40
                    }}
                  />
                </PaginationContainer>
              </>
            )}
          />
        </Container>
      }
    />
  );
};

const Container = styled.div`
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ClippingSearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const PaginationContainer = styled.div`
  padding: 2rem 0;
`;

const Ul = styled.ul`
  width: 100%;

  li.content-item {
    margin-bottom: 5rem;
  }
`;
