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
import { useHistory, useRouteMatch } from 'react-router-dom';
import { AsyncComponent } from '../../../components/AsyncComponent';
import { ContentMenuOptionType } from '../../../components/ContentMenu/createDefaultContentMenuOptions';
import { DotsContentMenu } from '../../../components/ContentMenu/DotsContentMenu';
import { EvenlySpacedItemsList } from '../../../components/EvenlySpacedItemsList';
import { ContentType } from '../../../enums/ContentType';
import { ContentSearchResult } from '../../../models/ContentSearchResult';
import { PeriodicContextModel } from '../../../models/periodic/PeriodicContextModel';
import { PeriodicEditionArticle } from '../../../models/periodic/PeriodicEditionArticle';
import { PeriodicInfoModel } from '../../../models/periodic/PeriodicInfoModel';
import { ArticleType } from '../../pesquisa/enums/ArticleType';
import { PeriodicContext } from '../PeriodicContextProvider';
import { ArticleListItem } from './ArticleListItem';

interface IProps {
  selectedArticleId?: number;
  periodicInfo?: PeriodicInfoModel;
  editionId?: number;
  formatedDate?: string;
}

const PeriodicEditionArticlesList = ({
  selectedArticleId,
  periodicInfo,
  formatedDate
}: IProps) => {
  const history = useHistory();
  const match = useRouteMatch();
  const periodicId = _.get(match, 'params.periodicId');
  const editionId = +_.get(match, 'params.editionId', null);
  const ctx = useContext<{ state: PeriodicContextModel }>(
    PeriodicContext as any
  );
  const request = ctx.state.articlesRequest;

  const createContentSearchResultFromArticle = useCallback(
    (article: PeriodicEditionArticle) => {
      if (!periodicInfo) return ContentSearchResult.Empty;

      return new ContentSearchResult(
        ContentType.ARTICLE,
        article.id,
        article.title,
        periodicInfo.title,
        periodicInfo.description,
        null,
        editionId,
        periodicInfo.id,
        `/Uploads/ImgPeriodico/${periodicInfo.image}`,
        article.author,
        null,
        formatedDate,
        null,
        article.articleType,
        null,
        generateArticleLink(article.id)
      );
    },
    [periodicInfo]
  );

  const generateArticleLink = useCallback(
    (articleId: any) => `/periodico/${periodicId}/${editionId}/${articleId}`,
    [periodicId, editionId]
  );

  return (
    <AsyncComponent
      error={request.error}
      loading={request.loading}
      renderContent={() =>
        request.result ? (
          <EvenlySpacedItemsList>
            {request.result
              //@ts-ignore
              .map((a: PeriodicEditionArticle, index: number) => (
                <ArticleListItem
                  key={`${a.id}-${index}`}
                  article={a}
                  active={+selectedArticleId === a.id}
                  onClick={() => history.push(generateArticleLink(a.id))}
                  link={generateArticleLink(a.id)}
                  Menu={
                    <DotsContentMenu
                      result={createContentSearchResultFromArticle(a)}
                      disabledMenuOptions={
                        a.articleType !== ArticleType.DOUTRINA
                          ? [ContentMenuOptionType.QuoteModel]
                          : []
                      }
                    />
                  }
                />
              ))}
          </EvenlySpacedItemsList>
        ) : null
      }
    />
  );
};

export default PeriodicEditionArticlesList;
