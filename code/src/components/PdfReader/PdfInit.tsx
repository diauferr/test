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

import { useEffect } from 'react';
import { useAuthCtx } from '../../features/auth_v2/hooks/useAuthCtx';
import { useEffectIfNotNull } from '../../Hooks/useEffectIfNotNull';
import { useErrorLogger } from '../../Hooks/useErrorLogger';
import { useAnnotationPersistence } from './hooks/useAnnotationPersistence';
import { usePdfContext } from './hooks/usePdfContext';
import { InstantJson } from './Models/InstantJson';
import { PdfUIState } from './Models/PdfUIState';

declare var PSPDFKit;

const { REACT_APP_PSPDFKIT_LICENSE_KEY } = process.env;

interface IProps {
  pdfHtmlElementId: string;
}

export const PdfInit = ({ pdfHtmlElementId }: IProps) => {
  const {
    changeUiState,
    setPspdfkitInstance,
    pspdfkitInstance,
    title,
    pageIndex,
    setTotalPages,
    pdfUrl,
    result
  } = usePdfContext();
  const { is_authenticated_with_email } = useAuthCtx();
  const downloadBlocked = !is_authenticated_with_email();
  const logError = useErrorLogger();
  const { getAnnotations } = useAnnotationPersistence();

  useEffect(() => {
    if (!pspdfkitInstance) {
      init(pdfHtmlElementId)
        .then((instance: any) => {
          setPspdfkitInstance(instance);
        })
        .catch((error) => {
          logError(error);

          changeUiState((state) => state.setError());
        });
    }

    return () => {
      if (!pspdfkitInstance) return;

      PSPDFKit.unload(pspdfkitInstance);
      changeUiState(() => PdfUIState.Empty);
      setTotalPages(0);
      setPspdfkitInstance(null);
    };
  }, [pdfUrl, pspdfkitInstance]);

  async function init(pdfHtmlElementId: string) {
    const annotations = await getAnnotations(result);

    const config = {
      locale: 'pt',
      autoSaveMode: PSPDFKit.AutoSaveMode.IMMEDIATE,
      container: `#${pdfHtmlElementId}`,
      document: pdfUrl,
      licenseKey: REACT_APP_PSPDFKIT_LICENSE_KEY,
      instant: false,
      instantJSON: new InstantJson(annotations),
      toolbarItems: [],
      theme: PSPDFKit.Theme.DARK
    };

    const instance = await PSPDFKit.load(config);

    return instance;
  }

  useEffectIfNotNull(() => {
    setupStyles(pspdfkitInstance);

    pspdfkitInstance.setViewState((viewState) =>
      viewState
        .set('viewportPadding', {
          vertical: title.length * 1.2,
          horizontal: 0
        })
        .set('allowPrinting', downloadBlocked === false)
    );

    setTotalPages(pspdfkitInstance.totalPageCount);
    changeUiState((state) => state.setTitleVisibility(true));
  }, [pspdfkitInstance]);

  useEffectIfNotNull(() => {
    pspdfkitInstance.setViewState((viewState) =>
      viewState.set('currentPageIndex', pageIndex)
    );
  }, [pspdfkitInstance, pageIndex]);

  return null;
};

function setupStyles(instance: any) {
  const document = instance.contentDocument;

  if (!document) return;

  const css =
    ' .PSPDFKit-Page-Indicator > div button span { display: block !important; } ' +
    ' .PSPDFKit-Page-Indicator  > div input[type="number"] {display: none ;}' +
    ' .PSPDFKit-Page-Indicator  div span:first-child {display: none ;}' +
    ' .PSPDFKit-Page-Indicator  div span:last-child {display: none ;}' +
    ' .PSPDFKit-Search  {left:0;}' +
    ' .PSPDFKit-Input-Dropdown span  {max-width: 3rem ; overflow: hidden;}';

  const style = document.createElement('style');
  style.appendChild(document.createTextNode(css));

  if (document.head.append) {
    document.head.append(style);
  } else {
    document.head.appendChild(style);
  }
}
