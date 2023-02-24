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

import _get from 'lodash/get';
import qs from 'query-string';
import React, { useContext } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { ErrorMessage } from '../../components/ErrorMessage';
import { FullscreenOverlay } from '../../components/_shell/FullscreenOverlay';
import { Loading } from '../../components/_shell/Loading';
import { ContentType } from '../../enums/ContentType';
import { BookContextModel } from '../../models/book/BookContextModel';
import { BookEditionChapterModel } from '../../models/book/BookEditionChapterModel';
import { BookEditionModel } from '../../models/book/BookEditionModel';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import ReadPage from '../leitura/ReadPage';
import { LegislationContext } from './LegislationContextProvider';
import { LegislationEditionChapterList } from './components/LegislationEditionChapterList';

export const ReadChapterPage = () => {
  const match = useRouteMatch();
  const bookId = _get(match, 'params.bookId');
  const editionId = _get(match, 'params.editionId');
  const chapterId = _get(match, 'params.chapterId');
  const queryparams = qs.parse(location.search);

  const ctx = useContext<{ state: BookContextModel }>(
    LegislationContext as any
  );

  const { editionChaptersRequest, bookEditionsRequest } = ctx.state;

  if (editionChaptersRequest.error)
    return <ErrorMessage error={editionChaptersRequest.error} />;

  if (editionChaptersRequest.loading || bookEditionsRequest.loading) {
    return (
      <FullscreenOverlay style={{ background: '#cecece' }}>
        <Loading />
      </FullscreenOverlay>
    );
  }

  const chapters = editionChaptersRequest.result as BookEditionChapterModel[];

  if (!chapters) return <ErrorMessage />;

  const currentEdition = bookEditionsRequest.result.find(
    (e) => +e.editionId === Number(editionId || 0)
  );

  if (!currentEdition) return <ErrorMessage />;

  const currentIndex = chapters.findIndex(
    (e) => String(e.id) === String(chapterId)
  );

  if (currentIndex < 0) return <ErrorMessage />;

  const currentChapter = chapters[currentIndex];

  const next = chapters[currentIndex + 1];
  const prev = chapters[currentIndex - 1];

  const keywords = _get(queryparams, 'keywords', '')
    //@ts-ignore
    .split(' ')
    .filter((k) => !!k);

  const pdfUrl = currentChapter.pdfName;

  function getContentSearchResult(
    chapter: BookEditionChapterModel,
    book: BookEditionModel
  ) {
    return new ContentSearchResult(
      ContentType.CHAPTER,
      chapter.id,
      chapter.title,
      book.title,
      book.description,
      null,
      editionId,
      book.id,
      book.image,
      chapter.author,
      null,
      `Atualizado em: ${book.year}`,
      null,
      null,
      book.areasInterest,
      `/legislacao-comentada/${book.id}/${editionId}/${chapter.id}`
    );
  }
  return (
    <ReadPage
      //@ts-ignore
      summaryTitle={
        <SummaryTitleContainer>
          <h2>
            <NavLink
              to={`/legislacao-comentada/${bookId}/${bookEditionsRequest.result[0].editionId}`}
              onClick={() => window.scrollTo(0, 0)}>
              {currentEdition.title}
            </NavLink>
          </h2>
          <h3>{`Edição ${currentEdition.editionNumber}, ${currentEdition.editionDate} `}</h3>
        </SummaryTitleContainer>
      }
      Summary={
        <LegislationEditionChapterList
          //@ts-ignore
          selectedChapterId={Number(currentChapter.id)}
        />
      }
      keywords={keywords}
      pdfUrl={pdfUrl}
      title={`${currentEdition.title} - Ed: ${currentEdition.editionNumber}`}
      subtitle={currentChapter.title}
      nextTitle={next ? next.title : null}
      prevTitle={prev ? prev.title : null}
      nextContentLink={
        next ? `/legislacao-comentada/${bookId}/${editionId}/${next.id}` : null
      }
      prevContentLink={
        prev ? `/legislacao-comentada/${bookId}/${editionId}/${prev.id}` : null
      }
      result={getContentSearchResult(
        currentChapter,
        bookEditionsRequest.result[0]
      )}
    />
  );
};

const SummaryTitleContainer = styled.div`
  h2 {
    margin-bottom: 0.5rem;
    a {
      &:visited {
        color: var(--primary-color) !important;
      }
    }
  }

  h3 {
    margin-bottom: 3rem;
  }
`;
