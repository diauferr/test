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
import React, { useCallback, useContext } from 'react';
import { withRouter } from 'react-router';
import { AsyncComponent } from '../../../components/AsyncComponent';
import { DotsContentMenu } from '../../../components/ContentMenu/DotsContentMenu';
import { EvenlySpacedItemsList } from '../../../components/EvenlySpacedItemsList';
import { ContentType } from '../../../enums/ContentType';
import { BookContextModel } from '../../../models/book/BookContextModel';
import { BookEditionChapterModel } from '../../../models/book/BookEditionChapterModel';
import { BookEditionModel } from '../../../models/book/BookEditionModel';
import { ContentSearchResult } from '../../../models/ContentSearchResult';
import { ArticleListItem } from '../../periodico/components/ArticleListItem';
import { LegislationContext } from '../LegislationContextProvider';

interface IProps {
  selectedChapterId?: number;
  match?: any;
  history?: any;
  book: BookEditionModel;
  editionId: number;
}

const _LegislationEditionChapterList = ({
  selectedChapterId,
  match,
  history,
  book
}: IProps) => {
  const { bookId, editionId } = match.params;
  const ctx = useContext<{ state: BookContextModel }>(
    LegislationContext as any
  );
  const { editionChaptersRequest } = ctx.state;

  const createContentSearchResultFromChapter = useCallback(
    (chapter: BookEditionChapterModel) => {
      if (!book) return ContentSearchResult.Empty;

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
        createChapterLink(chapter.id)
      );
    },
    [book]
  );

  const createChapterLink = useCallback(
    (chapterId: any) =>
      `/legislacao-comentada/${bookId || book.id}/${editionId}/${chapterId}`,
    [book, bookId, editionId]
  );

  return (
    <AsyncComponent
      error={
        editionChaptersRequest.error &&
        _.get(editionChaptersRequest.error, 'response.status') === 500
      }
      loading={editionChaptersRequest.loading}
      renderContent={() => {
        if (!editionChaptersRequest.result) return null;

        const groupedChaptersBySubtitle = _.groupBy(
          editionChaptersRequest.result,
          'subtitle'
        );

        return ['Pré textual', 'Artigos', 'Pós textual'].map((subtitle) => {
          const chapters = groupedChaptersBySubtitle[subtitle];

          if (!chapters) {
            console.warn('lista de capitulos vazia');
            return null;
          }

          return (
            <div key={subtitle}>
              <h3 style={{ marginTop: '1rem' }}>{subtitle}</h3>
              <EvenlySpacedItemsList>
                {chapters.map(
                  (chapter: BookEditionChapterModel, index: number) => (
                    <ArticleListItem
                      key={`${chapter.id}-${index}`}
                      article={chapter}
                      link={createChapterLink(chapter.id)}
                      active={selectedChapterId === chapter.id}
                      onClick={() =>
                        history.push(createChapterLink(chapter.id))
                      }
                      Menu={
                        <DotsContentMenu
                          result={createContentSearchResultFromChapter(chapter)}
                        />
                      }
                    />
                  )
                )}
              </EvenlySpacedItemsList>
            </div>
          );
        });
      }}
    />
  );
};

//@ts-ignore
export const LegislationEditionChapterList = withRouter(
  //@ts-ignore
  _LegislationEditionChapterList
);
