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

import React, { useContext } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import 'react-image-lightbox/style.css';
import ReadPage from '../leitura/ReadPage';
import { PeriodicContextModel } from '../../models/periodic/PeriodicContextModel';
import { PeriodicContext } from './PeriodicContextProvider';
import { PeriodicInfoModel } from '../../models/periodic/PeriodicInfoModel';
import { FullscreenOverlay } from '../../components/_shell/FullscreenOverlay';
import { Loading } from '../../components/_shell/Loading';
import { ErrorMessage } from '../../components/ErrorMessage';

interface IProps {
  location: any;
  history: any;
  match: any;
  type: string;
}

const ReadEspecialPage = ({ history, type }: IProps) => {
  const ctx = useContext<{ state: PeriodicContextModel }>(
    PeriodicContext as any
  );
  const { periodicRequest } = ctx.state;
  const periodic = periodicRequest.result as PeriodicInfoModel;

  if (periodicRequest.error) return <ErrorMessage />;

  if (periodicRequest.loading) {
    return (
      <FullscreenOverlay style={{ background: '#cecece' }}>
        <Loading />
      </FullscreenOverlay>
    );
  }

  function GetPdfUrl() {
    if (type === 'normas') {
      return `https://www.forumconhecimento.com.br/Uploads/Normas-Publicacao/${periodic.normasPdf}.pdf`;
    } else if (type === 'expediente') {
      return `https://www.forumconhecimento.com.br/Uploads/Expediente/${periodic.expedientePdf}.pdf`;
    }
  }

  return (
    // @ts-ignore
    <ReadPage
      //@ts-ignore
      keywords={[]}
      pdfUrl={GetPdfUrl()}
      title={periodic.title}
      onClose={() => {
        history.goBack();
      }}
    />
  );
};

//@ts-ignore
export default withRouter(ReadEspecialPage);
