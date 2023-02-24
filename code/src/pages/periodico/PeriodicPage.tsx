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

/* eslint-disable prefer-destructuring */
import { Icon } from 'antd';
import _ from 'lodash';
import React, { useCallback, useContext, useEffect } from 'react';
import 'react-image-lightbox/style.css';
import { RouteComponentProps } from 'react-router';
import { Button } from '../../components/Button';
import { ContentNotAvailable } from '../../components/ContentNotAvailable';
import { MultipleFilteredSelectParser } from '../../components/_inputs/MultipleFilteredSelect';
import { BackToTopButton } from '../../components/_shell/BackToTopButton';
import { ContentPageTemplate } from '../../components/_templates/ContentPageTemplate/ContentPageTemplate';
import { ContentType } from '../../enums/ContentType';
import { useReturnUrlFromPdf } from '../../Hooks/useReturnUrlFromPdf';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { PeriodicContextModel } from '../../models/periodic/PeriodicContextModel';
import { PeriodicEditionModel } from '../../models/periodic/PeriodicEditionModel';
import { SearchFilter } from '../../models/search/SearchFilter';
import { NotFound } from '../NotFound';
import PeriodicEditionArticlesList from './components/PeriodicEditionArticlesList';
import { PeriodicContext } from './PeriodicContextProvider';

export const PeriodicPage = ({ match, history }: RouteComponentProps) => {
  const ctx = useContext<{ state: PeriodicContextModel }>(
    PeriodicContext as any
  );
  const { returnToHereFromPdf } = useReturnUrlFromPdf();
  const { periodicRequest, editionsRequest } = ctx.state;
  const periodicInfo = periodicRequest.result;
  const periodicEditions = (editionsRequest.result ||
    []) as PeriodicEditionModel[];
  const periodicId = _.get(match, 'params.periodicId');
  const editionId = +_.get(match, 'params.editionId', null);

  let currentEdition: PeriodicEditionModel;

  if (periodicEditions) {
    currentEdition = periodicEditions.filter(
      (item) => item.id === editionId
    )[0];
  }

  useEffect(() => {
    if (!!editionId) return;

    if (periodicEditions.length > 0) {
      history.replace(`/periodico/${periodicId}/${periodicEditions[0].id}`);
    }
  }, [periodicEditions]);

  useEffect(() => {
    // Se nao está indo direto para o artigo, exemplo: vindo da busca.
    // entao o retorno do pdf é a pagina da revista.
    if (!_.get(match, 'params.articleId')) returnToHereFromPdf();
  }, [editionId]);

  function colectionOrPeriodic(type: any) {
    if (type == 0) {
      return 'Revista';
    } else {
      return 'Coleção';
    }
  }

  function GetPeriodicity(type: any, periodicity: any) {
    if (type == 0) {
      return (
        <li>
          <b>Periodicidade:</b> {periodicity}
        </li>
      );
    }

    return null;
  }

  const seachInPeriodic = useCallback(
    (words: string) => {
      const filter = new SearchFilter(words);
      filter.periodicIdList = MultipleFilteredSelectParser.encodeValue({
        value: periodicId,
        text: _.get(periodicInfo, 'title')
      });

      history.push(`/pesquisa/revistas?${filter.convertToQueryString()}`);
    },
    [periodicInfo, periodicId]
  );

  if (periodicRequest.error) {
    return <NotFound />;
  }

  if (!!editionsRequest.result && periodicEditions.length === 0) {
    return <ContentNotAvailable />;
  }

  const base = 'https://www.forumconhecimento.com.br/Uploads/ImgPeriodico/';
  const img = _.get(periodicInfo, 'image');
  const imageSrc = `${base}${img}.jpg`;

  return (
    <>
      <ContentPageTemplate
        result={
          new ContentSearchResult(
            ContentType.PERIODIC,
            periodicId,
            _.get(periodicInfo, 'title'),
            null,
            _.get(periodicInfo, 'description')
          )
        }
        loading={periodicRequest.loading}
        title={`${_.get(periodicInfo, 'sigla')} - ${_.get(
          periodicInfo,
          'title'
        )}`}
        contentType={colectionOrPeriodic(_.get(periodicInfo, 'type'))}
        imageSrc={imageSrc}
        editions={periodicEditions}
        selectedEditionId={editionId}
        onEditionClick={(editionId: number) => {
          history.push(`/periodico/${periodicId}/${editionId}`);
        }}
        qualis={_.get(periodicInfo, 'qualis')}
        DescriptionContent={<p>{_.get(periodicInfo, 'description')}</p>}
        onSearch={seachInPeriodic}
        buttonSearchText="Pesquisar nesta revista"
        DetailsContent={
          <>
            <ul>
              <li>
                <b>CDD:</b> {_.get(periodicInfo, 'cdd')}
              </li>
              <li>
                <b>CDU: </b> {_.get(periodicInfo, 'cdu')}
              </li>
              <li>
                <b>ISSN digital:</b> {_.get(periodicInfo, 'issn')}
              </li>
              {GetPeriodicity(
                _.get(periodicInfo, 'type'),
                _.get(periodicInfo, 'periodicity')
              )}
              <li>
                <b>Doutrinas:</b> {_.get(periodicInfo, 'doutrinas')}
              </li>
              <li>
                <b>Jurisprudências:</b> {_.get(periodicInfo, 'jurisprudencias')}
              </li>
            </ul>

            <div className="buttons-container">
              <Button
                type={'primary'}
                onClick={() =>
                  history.push(`/expediente/periodico/${periodicId}`)
                }>
                <Icon type="eye" /> Expediente
              </Button>

              {_.get(periodicInfo, 'normasPdf') && (
                <Button
                  type={'primary'}
                  onClick={() =>
                    history.push(`/normas/periodico/${periodicId}`)
                  }>
                  <Icon type="book" /> Normas de publicação
                </Button>
              )}
            </div>
          </>
        }
        BottomContent={
          <>
            {currentEdition && (
              <h2>
                {`Número ${currentEdition.editionNumber}, Ano ${currentEdition.year}, ${currentEdition.editionDate}`}
              </h2>
            )}

            {editionId && (
              <PeriodicEditionArticlesList
                {...{
                  periodicInfo,
                  editionId,
                  formatedDate:
                    currentEdition &&
                    `Número ${currentEdition.editionNumber}, Ano ${currentEdition.year}, ${currentEdition.editionDate}`
                }}
              />
            )}
          </>
        }
      />
      <BackToTopButton />
    </>
  );
};
