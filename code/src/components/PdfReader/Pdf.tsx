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

import { notification } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthCtx } from '../../features/auth_v2/hooks/useAuthCtx';
import { useEffectIfNotNull } from '../../Hooks/useEffectIfNotNull';
import { usePspkitLoaderContext } from '../../Hooks/usePspkitLoaderContext';
import { CenteredContent } from '../_templates/CenteredContent';
import { ContentMenuModal } from './ContentMenuModal';
import { ErrorMessage } from './ErrorMessage';
import { usePdfContext } from './hooks/usePdfContext';
import { usePdfToolbar } from './hooks/usePdfToolbar';
import { NextContentBottomButton } from './NextContentBottomButton';
import { PdfEvents } from './PdfEvents';
import { PdfInit } from './PdfInit';
import { PdfTitle } from './PdfTitle';
import { PrevNextButton } from './PrevNextButton';
import { PrintModalLoading } from './PrintModalLoading';
import { ScreenOnTopOfPdf } from './ScreenOnTopOfPdf';

export const Pdf = () => {
  const { loaded: pspkitLibraryLoaded, userSettings } =
    usePspkitLoaderContext();
  const pdfHtmlElementId = 'pdf-document';
  const [pdfDivRendered, setPdfDivRendered] = useState(null);

  const { is_authenticated_with_email, go_to_login } = useAuthCtx();

  const {
    pspdfkitInstance,
    uiState,
    changeUiState,
    onClose,
    pdfUrl,
    result,
    summaryCmp,
    summaryTitle,
    title,
    subtitle,
    prevContentTitle,
    prevContentLink,
    nextContentTitle,
    nextContentLink,
    totalPages
  } = usePdfContext();

  const { updateToolbar } = usePdfToolbar(
    _.get(userSettings, 'downloadBlocked', !is_authenticated_with_email())
  );

  useEffectIfNotNull(() => {
    updateToolbar();
  }, [pspdfkitInstance, uiState]);

  useEffect(() => {
    if (!is_authenticated_with_email()) {
      show_not_saving_annotations_warning(go_to_login);
    }
  }, []);

  if (!pdfUrl || uiState.error) {
    return <ErrorMessage close={onClose} />;
  }

  return (
    <>
      {uiState.summaryVisible && (
        <ScreenOnTopOfPdf>
          <CenteredContent
            fullscreen={false}
            center={true}
            style={{
              background: 'none',
              margin: '0 auto '
            }}>
            {summaryTitle}

            {summaryCmp}
          </CenteredContent>
        </ScreenOnTopOfPdf>
      )}

      {result && (
        <ContentMenuModal
          result={result}
          modalIsVisible={uiState.showContentMenu}
          onCancel={() => {
            changeUiState((state) => state.setContentMenuVisibility(false));
          }}
        />
      )}
      <PrintModalLoading
        modalIsVisible={uiState.showPrintLoading}
        onCancel={() => {
          changeUiState((state) => state.setShowPrintLoading(false));
        }}
      />
      <PdfTitle
        title={title}
        subtitle={subtitle}
        onClick={() => {
          changeUiState((state) => state.setTitleVisibility(false));
        }}
        hidden={!uiState.showTitle}
      />
      {uiState.showNextPrevButtons && prevContentTitle && (
        <PrevNextButton
          title={prevContentTitle}
          linkTo={prevContentLink}
          isNext={false}
        />
      )}
      {nextContentTitle && pspdfkitInstance && (
        <NextContentBottomButton
          visible={totalPages === 1 || uiState.showBottomNextContentButton}
          linkTo={nextContentLink}
        />
      )}
      {pdfDivRendered && pspkitLibraryLoaded && (
        <>
          <PdfInit pdfHtmlElementId={pdfHtmlElementId} />
          <PdfEvents />
        </>
      )}
      <Container id={pdfHtmlElementId} ref={setPdfDivRendered} />
    </>
  );
};

const Container = styled.div`
  height: 100%;
  p {
    color: #fff;
  }
`;

const AuthButton = styled.button`
  background: var(--primary-color);
  color: #fff;
  border: 0;
  outline: none;
  padding: 5px 30px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 5px;
  text-align: center;

  &:hover {
    background: var(--primary-color-light);
  }
`;

function show_not_saving_annotations_warning(go_to_login: () => void) {
  notification.warning({
    placement: 'topLeft',
    message: <h1 style={{ fontWeight: 700 }}>Alerta de autenticação</h1>,
    description: (
      <>
        <p>
          Você não está autenticado. Portanto, as anotações realizadas não serão
          salvas.
        </p>
        <AuthButton
          onClick={() => {
            go_to_login();
          }}>
          Login
        </AuthButton>
      </>
    ),
    duration: 10
  });
}
