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
import qs from 'query-string';
import React, { useContext } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ErrorMessage } from '../../components/ErrorMessage';
import { FullscreenOverlay } from '../../components/_shell/FullscreenOverlay';
import { Loading } from '../../components/_shell/Loading';
import { ContentType } from '../../enums/ContentType';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { PeriodicContextModel } from '../../models/periodic/PeriodicContextModel';
import { PeriodicEditionArticle } from '../../models/periodic/PeriodicEditionArticle';
import { PeriodicEditionModel } from '../../models/periodic/PeriodicEditionModel';
import { PeriodicInfoModel } from '../../models/periodic/PeriodicInfoModel';
import { PeriodicRequests } from '../../requests/periodic/PeriodicRequests';
import ReadPage from '../leitura/ReadPage';
import PeriodicEditionArticlesList from './components/PeriodicEditionArticlesList';
import { PeriodicContext } from './PeriodicContextProvider';

interface IProps {
  location: any;
  match;
}

const ReadArticlePage = ({
  match,

  location
}: IProps) => {
  const periodicId = _.get(match, 'params.periodicId');
  const editionId = _.get(match, 'params.editionId');
  const articleId = _.get(match, 'params.articleId');
  const ctx = useContext<{ state: PeriodicContextModel }>(
    PeriodicContext as any
  );

  const { articlesRequest, periodicRequest, editionsRequest } = ctx.state;
  const queryparams = qs.parse(_.get(location, 'search'));
  const keywords = _.get(queryparams, 'keywords', '')
    //@ts-ignore
    .split(' ')
    .filter((k) => !!k);

  if (articlesRequest.error || periodicRequest.error) return <ErrorMessage />;

  if (articlesRequest.loading || periodicRequest.loading) {
    return (
      <FullscreenOverlay style={{ background: '#cecece' }}>
        <Loading />
      </FullscreenOverlay>
    );
  }

  const periodic = periodicRequest.result as PeriodicInfoModel;
  const articles = articlesRequest.result as PeriodicEditionArticle[];
  const editions = editionsRequest.result as PeriodicEditionModel[];

  const currentEdition = editions.find((e) => +e.id === +editionId);

  if (!articles || articles.length === 0 || !currentEdition)
    return <ErrorMessage />;

  const currentIndex = articles.findIndex((a) => a.id === +articleId);

  if (currentIndex < 0) return <ErrorMessage />;

  const currentArticle = articles[currentIndex];
  const nextArticle = articles[currentIndex + 1];
  const prevArticle = articles[currentIndex - 1];

  const pdfUrl = `https://www.forumconhecimento.com.br/Uploads/Artigos/${periodicId}/${editionId}/${currentArticle.pdfName}.pdf`;

  function getContentSearchResult(
    article: PeriodicEditionArticle,
    periodicInfo: PeriodicInfoModel,
    currentEdition: PeriodicEditionModel
  ) {
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
      `Número ${currentEdition.editionNumber}, Ano ${currentEdition.year}, ${currentEdition.editionDate}`,
      null,
      article.articleType,
      null,
      `/periodico/${periodicInfo.id}/${editionId}/${article.id}`
    );
  }

  return (
    //@ts-ignore
    <ReadPage
      //@ts-ignore
      saveAnnotations={(annotationJson: string) => {
        PeriodicRequests.saveArticleAnnotations(
          pdfUrl,
          annotationJson,
          periodic.title,
          +periodicId,
          `${currentEdition.editionNumber} - ${currentEdition.editionDate}`,
          +editionId,
          currentArticle.title,
          +currentArticle.id
        );
      }}
      summaryTitle={
        <SummaryTitleContainer>
          <h2>
            <NavLink to={`/periodico/${periodicId}/${editionId}`}>
              {periodic.title}
            </NavLink>
          </h2>
          <h3>
            {`Número ${currentEdition.editionNumber}, Ano ${currentEdition.year}, ${currentEdition.editionDate}`}
          </h3>
        </SummaryTitleContainer>
      }
      Summary={
        //@ts-ignore
        <PeriodicEditionArticlesList selectedArticleId={articleId} />
      }
      keywords={keywords}
      pdfUrl={pdfUrl}
      title={periodic.title}
      subtitle={null}
      nextTitle={nextArticle ? nextArticle.title : null}
      prevTitle={prevArticle ? prevArticle.title : null}
      nextContentLink={
        nextArticle
          ? `/periodico/${periodicId}/${editionId}/${nextArticle.id}`
          : null
      }
      prevContentLink={
        prevArticle
          ? `/periodico/${periodicId}/${editionId}/${prevArticle.id}`
          : null
      }
      result={getContentSearchResult(currentArticle, periodic, currentEdition)}
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

//@ts-ignore
export default withRouter(ReadArticlePage);
