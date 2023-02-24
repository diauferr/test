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
import React, { ReactNode, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';
import { Pdf } from '../../components/PdfReader/Pdf';
import { PdfContextProvider } from '../../components/PdfReader/PdfContextProvider';
import { ContentType } from '../../enums/ContentType';
import { useDoRequest } from '../../Hooks/useDoRequest';
import { useEffectIfNotNull } from '../../Hooks/useEffectIfNotNull';
import { useReturnUrlFromPdf } from '../../Hooks/useReturnUrlFromPdf';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { BookRequests } from '../../requests/book/BookRequests';
import { PeriodicRequests } from '../../requests/periodic/PeriodicRequests';
import { queryStringParser } from '../../util/QueryStringParser';

const GlobalOverrides = createGlobalStyle`
  body, html  {
    overflow: hidden !important;
  }
`;
const Container = styled.div<any>`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #cecece;
  z-index: 120;
`;

interface IProps {
  Summary?: ReactNode;
  pdfUrl: string;
  title: string;
  subtitle?: string;
  nextContentLink?: string;
  prevContentLink?: string;
  nextTitle?: string;
  prevTitle?: string;
  history?: any;
  match?: any;
  location?: any;
  result?: ContentSearchResult;
}

const ReadPage = ({
  Summary,
  pdfUrl,
  title,
  subtitle,
  nextTitle,
  prevTitle,
  nextContentLink,
  prevContentLink,
  match,
  location,
  history,
  result,
  ...props
}: IProps) => {
  const { getReturnUrl } = useReturnUrlFromPdf();
  const [show, setShow] = useState(false);
  const [, , , doRequest] = useDoRequest<any>();

  // serve para dar refresh do objeto de pdf quando alterar o pdf sendo visualizado.
  useEffect(() => {
    setShow(false);

    setTimeout(() => {
      setShow(true);
    }, 70);
  }, [pdfUrl]);

  useEffectIfNotNull(() => {
    if (result.contentType === ContentType.ARTICLE) {
      doRequest(() => PeriodicRequests.postLogArticle(result.id));
    }
    if (result.contentType === ContentType.CHAPTER) {
      doRequest(() => BookRequests.postLogChapter(result.id));
    }
  }, [result]);

  useEffect(() => {
    const element = document.getElementById('launcher');

    if (element && element.style) {
      element.style.zIndex = '110';
    }
  }, []);

  const pageQP = queryStringParser.fromQueryString(location.search);
  // @ts-ignore
  const pageIndex = 'page' in pageQP ? +pageQP.page : 0;

  return (
    <Container>
      <GlobalOverrides />
      {show ? (
        <PdfContextProvider
          pdfUrl={pdfUrl}
          result={result}
          onClose={() => history.replace(getReturnUrl())}
          summaryCmp={Summary}
          summaryTitle={_.get(props, 'summaryTitle')}
          title={title}
          subtitle={subtitle}
          pageIndex={pageIndex}
          prevContentTitle={prevTitle}
          prevContentLink={prevContentLink}
          nextContentTitle={nextTitle}
          nextContentLink={nextContentLink}>
          <Pdf />
        </PdfContextProvider>
      ) : null}
    </Container>
  );
};

//@ts-ignore
export default withRouter(ReadPage);
