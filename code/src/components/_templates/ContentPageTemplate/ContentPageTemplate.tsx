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

import React, { ReactNode } from 'react';
import { useHistory, useLocation } from 'react-router';
import { ContentType } from '../../../enums/ContentType';
import { ContentSearchResult } from '../../../models/ContentSearchResult';
import { Qualis } from '../../../pages/periodico/components/Qualis';
import { queryStringParser } from '../../../util/QueryStringParser';
import { ContentMenuHorizontal } from '../../ContentMenu/ContentMenuHorizontal';
import { ContentSection } from '../../ContentSection';
import { ImageWithLightbox } from '../../ImageWithLightbox';
import { SearchInContentButton } from '../../SearchInContentButton';
import { Subtitle } from '../../Subtitle';
import { Tabs } from '../../Tabs';
import { Loading } from '../../_shell/Loading';
import { Title } from '../../_shell/Title';
import { CenteredContent } from '../CenteredContent';
import {
  Container,
  Content,
  EditionsSelectContainer,
  TabsContainer
} from './styled-components';

interface IProps {
  title: string;
  contentType?: string;
  imageSrc: string;
  DescriptionContent: ReactNode;
  DetailsContent: ReactNode;
  BottomContent: ReactNode;
  editions: any[];
  selectedEditionId: number;
  onEditionClick: (p: any) => any;
  loading?: boolean;
  subtitle?: string;
  qualis?: string;
  result?: ContentSearchResult;
  onSearch?: (words: string) => any;
  buttonSearchText?: string;
}

export const ContentPageTemplate = ({
  title,
  contentType,
  imageSrc,
  DescriptionContent,
  DetailsContent,
  BottomContent,
  loading = true,
  editions = [],
  selectedEditionId,
  onEditionClick,
  subtitle,
  qualis,
  result,
  onSearch,
  buttonSearchText
}: IProps) => {
  const history = useHistory();
  const location = useLocation();
  const queryString = location.search;
  const tabNameFromQuery: any = queryStringParser.fromQueryString(queryString);

  let tabNameActive: tabName;

  if (tabNameFromQuery.tab === tabName.EDICOES || queryString === '') {
    tabNameActive = tabName.EDICOES;
  } else {
    tabNameActive = tabName.INFORMACOES;
  }

  return (
    <Container>
      <CenteredContent style={{ position: 'relative' }}>
        <br />
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '70vh',
              alignItems: 'center'
            }}>
            <Loading />
          </div>
        ) : (
          <>
            {contentType && <span className={'title-info'}>{contentType}</span>}

            <Title
              dontAnimate={true}
              style={{ marginBottom: subtitle ? 0 : '.5rem' }}>
              {title}
            </Title>

            {subtitle && <h3>{subtitle}</h3>}

            <div style={{ marginBottom: '2rem' }}>
              <ContentMenuHorizontal result={result} />
            </div>

            <TabsContainer>
              <span>
                <Tabs
                  tabName="Edições"
                  active={tabNameActive === tabName.EDICOES}
                  onClick={() => {
                    history.push(`?tab=${tabName.EDICOES}`);
                  }}
                />
                <Tabs
                  tabName="Informações"
                  active={tabNameActive === tabName.INFORMACOES}
                  onClick={() => {
                    history.push(`?tab=${tabName.INFORMACOES}`);
                  }}
                />
              </span>
              <span>
                <SearchInContentButton
                  onSearch={onSearch}
                  buttonText={buttonSearchText}
                />
              </span>
            </TabsContainer>

            {tabNameActive === tabName.EDICOES ? (
              <>
                {editions.length > 1 && (
                  <EditionsSelectContainer>
                    <label htmlFor={'editionNumber'}>Selecione a edição:</label>

                    <select
                      name={'editionNumber'}
                      onChange={(evt) => onEditionClick(evt.target.value)}
                      value={selectedEditionId}>
                      {editions.map((e: any) => (
                        <option key={e.id} value={e.id}>
                          {result.contentType === ContentType.BOOK
                            ? `${e.editionNumber}ª edição`
                            : `Número ${e.editionNumber}, ${e.editionDate}`}
                        </option>
                      ))}
                    </select>
                  </EditionsSelectContainer>
                )}
                <ContentSection>{BottomContent}</ContentSection>
              </>
            ) : (
              <Content>
                <div className="img-container" style={{ flexFlow: 'column' }}>
                  <ImageWithLightbox
                    style={{
                      maxWidth: '283px',
                      margin: 'auto'
                    }}
                    imageSrc={imageSrc}
                    title="Capa"
                  />

                  <Qualis qualis={qualis} />
                </div>

                <div className="description-container">
                  <Subtitle>Descrição</Subtitle>
                  {DescriptionContent}

                  <Subtitle>Detalhes</Subtitle>

                  <div className="details-container">{DetailsContent}</div>
                </div>
              </Content>
            )}
          </>
        )}
      </CenteredContent>
    </Container>
  );
};

enum tabName {
  EDICOES = 'edicoes',
  INFORMACOES = 'informacoes'
}
