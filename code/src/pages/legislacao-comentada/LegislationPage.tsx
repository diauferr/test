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
import React, { useCallback, useContext, useEffect } from 'react';
import 'react-image-lightbox/style.css';
import { RouteComponentProps } from 'react-router';
import { ContentNotAvailable } from '../../components/ContentNotAvailable';
import { ErrorMessage } from '../../components/ErrorMessage';
import { StartReadingButton } from '../../components/StartReadingButton';
import { MultipleFilteredSelectParser } from '../../components/_inputs/MultipleFilteredSelect';
import { BackToTopButton } from '../../components/_shell/BackToTopButton';
import { ContentBelowHeader } from '../../components/_templates/ContentBelowHeader';
import { ContentPageTemplate } from '../../components/_templates/ContentPageTemplate/ContentPageTemplate';
import { ContentType } from '../../enums/ContentType';
import { useReturnUrlFromPdf } from '../../Hooks/useReturnUrlFromPdf';
import { BookContextModel } from '../../models/book/BookContextModel';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { SearchFilter } from '../../models/search/SearchFilter';
import { LegislationContext } from './LegislationContextProvider';
import { LegislationEditionChapterList } from './components/LegislationEditionChapterList';

export const LegislationPage = ({ match, history }: RouteComponentProps) => {
  const { returnToHereFromPdf } = useReturnUrlFromPdf();
  const ctx = useContext<{ state: BookContextModel }>(
    LegislationContext as any
  );
  const { bookEditionsRequest, editionChaptersRequest } = ctx.state;
  const editions =
    bookEditionsRequest.result !== 204 ? bookEditionsRequest.result || [] : [];
  const editionId = +_.get(match, 'params.editionId', null);

  const book = editions.filter(
    (edition: { editionId: number }) =>
      String(edition.editionId) === String(editionId)
  )[0];

  const bookId: number = _.get(match, 'params.bookId') || 0;
  const firstChapterOfEdition = _.get(editionChaptersRequest, 'result[0]');

  useEffect(() => {
    if (editionId) return;

    if (editions.length > 0) {
      history.replace(
        `/legislacao-comentada/${bookId}/${editions[0].editionId}`
      );
    }
  }, [editions]);

  useEffect(() => {
    // Se nao est?? indo direto para o capitulo, exemplo: vindo da busca.
    // entao o retorno do pdf ?? a pagina de livro.
    if (!_.get(match, 'params.chapterId')) {
      returnToHereFromPdf();
    }
  }, [editionId]);

  function getEditionTitle(editionId: number) {
    let currentEdition;

    if (editions) {
      currentEdition = editions.filter(
        (item) => item.editionId === editionId
      )[0];

      if (currentEdition) {
        return `Conte??do da ${currentEdition.editionNumber}?? edi????o, Ano ${currentEdition.year}`;
      }
    }
  }

  const onSearch = useCallback(
    (words: string) => {
      const filter = new SearchFilter(words);
      filter.bookIdList = MultipleFilteredSelectParser.encodeValue({
        value: bookId,
        text: book.title
      });

      history.push(
        `/pesquisa/legislacao-comentada?${filter.convertToQueryString()}`
      );
    },
    [book, bookId]
  );

  // TODO Alterar link da imagem.
  const bookImageSrc = `https://bid1006-staging-public.s3.sa-east-1.amazonaws.com/books/cover/${bookId}/editions/${editionId}.jpg`;

  const convertBookToContentSearchResult = useCallback(
    () =>
      !book
        ? ContentSearchResult.Empty
        : new ContentSearchResult(
            ContentType.LEGISLATION,
            bookId,
            book.title,
            book.subtitle,
            book.description,
            null,
            editionId,
            null,
            bookImageSrc,
            book.author,
            null,
            `${book.year}`,
            ''
          ),
    [bookId, book, editionId]
  );

  if (bookEditionsRequest.error) {
    return (
      <ContentBelowHeader fullscreen={false}>
        <ErrorMessage error={bookEditionsRequest.error} />
      </ContentBelowHeader>
    );
  }

  if (
    bookEditionsRequest.result === 204 ||
    editionChaptersRequest.result === 204
  ) {
    return <ContentNotAvailable />;
  }

  return (
    <>
      <ContentPageTemplate
        result={convertBookToContentSearchResult()}
        loading={bookEditionsRequest.loading}
        title={_.get(book, 'title')}
        imageSrc={bookImageSrc}
        editions={editions.map((e) => ({ ...e, id: e.editionId } || []))}
        selectedEditionId={editionId}
        contentType="Legisla????o Comentada"
        subtitle={_.get(book, 'subtitle')}
        onEditionClick={(editionId: number) => {
          history.push(`/legislacao-comentada/${bookId}/${editionId}`);
          window.scroll(0, 0);
        }}
        DescriptionContent={<p>{_.get(book, 'description')}</p>}
        onSearch={onSearch}
        buttonSearchText="Pesquisar neste livro"
        DetailsContent={
          <>
            <ul>
              <li>
                <b>Autor:</b> {_.get(book, 'author')}
              </li>
              <li>
                <b>CDD:</b> {_.get(book, 'cdd')}
              </li>
              <li>
                <b>CDU: </b> {_.get(book, 'cdu')}
              </li>
              <li>
                <b>N?? de p??ginas: </b> {_.get(book, 'numberOfPages')}
              </li>
              <li>
                <b>ISBN: </b> {_.get(book, 'isbn')}
              </li>
              <li>
                <b>Ano: </b> {_.get(book, 'year')}
              </li>
              <li>
                <b>{_.get(book, 'serie')}</b>
              </li>
              <li>
                <b>{`${_.get(book, 'editionNumber')}??`} Edi????o</b>
              </li>
            </ul>

            <div className="buttons-container">
              <StartReadingButton
                disabled={!firstChapterOfEdition}
                onClick={() => {
                  if ('localStorage' in window) {
                    localStorage.setItem(
                      'pdfReturnTo',
                      `/legislacao-comentada/${bookId}/${editionId}`
                    );
                  }
                  history.push(
                    `/legislacao-comentada/${bookId}/${editionId}/${firstChapterOfEdition.id}`
                  );
                }}>
                Iniciar leitura
              </StartReadingButton>
            </div>
          </>
        }
        BottomContent={
          <>
            <h2>{getEditionTitle(editionId)}</h2>

            {editionId && (
              <LegislationEditionChapterList {...{ book, editionId }} />
            )}
          </>
        }
      />
      <BackToTopButton />
    </>
  );
};
