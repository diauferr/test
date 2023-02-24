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

import { message } from 'antd';
import closeIconSrc from '../../../assets/images/close-icon.png';
import dotsIcon from '../../../assets/images/dots.svg';
import downloadIconSrc from '../../../assets/images/download-icon.svg';
import searchResultsIconSrc from '../../../assets/images/pdf-search-results-icon.svg';
import printIconSrc from '../../../assets/images/print-icon.svg';
import { ContentType } from '../../../enums/ContentType';
import { useAuthCtx } from '../../../features/auth_v2/hooks/useAuthCtx';
import { useContentDownload } from '../../../Hooks/useContentDownload';
import { useErrorLogger } from '../../../Hooks/useErrorLogger';
import { useShowAuthModal } from '../../../Hooks/useShowAuthModal';
import { ContentSearchResult } from '../../../models/ContentSearchResult';
import { RequestUtil } from '../../../util/RequestUtil';
import { usePdfContext } from './usePdfContext';

declare var PSPDFKit;

export function usePdfToolbar(downloadBlocked: boolean) {
  const {
    pspdfkitInstance,
    uiState,
    changeUiState,
    onClose,
    result,
    summaryCmp,
    pdfUrl,
    title
  } = usePdfContext();

  const { is_authenticated_with_email } = useAuthCtx();
  const { try_download } = useContentDownload();
  const showAuthModal = useShowAuthModal();
  const logError = useErrorLogger();

  function pdfDownloadHandler(
    pdfUrl: string,
    title: string,
    logError: (error: any) => void
  ) {
    try {
      const element = document.createElement('a');
      element.setAttribute('href', pdfUrl);
      element.setAttribute('target', '_blank');
      element.setAttribute('download', `${title}.pdf`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (e) {
      logError(e);
      message.error('Ocorreu um erro ao tentar fazer download do arquivo.');
    }
  }

  function on_download_limit_exceded(error_msg: string) {
    message.warning(error_msg);
  }

  return {
    updateToolbar: () => {
      const toolbarButtons = {
        backButton: new ToolbarButton('VOLTAR', 'back-button', () => {
          changeUiState((state) => state.showContent());
        }),
        closeButton: new ToolbarButton(
          'Fechar',
          'btn-close',
          () => {
            // if (!is_authenticated_with_email()) {
            // 	alert(
            // 		"Você não esta autenticado, logo as alterações feitas no arquivo não serão salvas!"
            // 	);
            // }
            onClose();
          },
          closeIconSrc
        ),
        printButton: new ToolbarButton(
          'Imprimir',
          'btn-print',
          () => {
            if (!is_authenticated_with_email()) {
              postDownloadTryLog(result);

              return showAuthModal();
            }

            postDownloadLog(result);
            pspdfkitInstance.print(PSPDFKit.PrintMode.DOM);
          },
          printIconSrc
        ),
        summaryButton: new ToolbarButton(
          'Sumário',
          'summary-button',
          () => {
            changeUiState((uiState) => uiState.showSummary());
          }
          // className: 'summary-icon',
        ),
        searchResultsButton: new ToolbarButton(
          'Resultado da busca',
          'search-results-content',
          () => {
            //    dispatch({showSearchResults: true} as PdfReaderState);
          },
          searchResultsIconSrc
        ),
        showContentMenuButton: new ToolbarButton(
          'Menu de conteúdos',
          'content-menu',
          () => {
            changeUiState((state) => state.setContentMenuVisibility(true));
          },
          dotsIcon
        ),
        downloadButton: new ToolbarButton(
          'Download',
          'btn-download',
          () => {
            if (!is_authenticated_with_email) {
              postDownloadTryLog(result);

              return showAuthModal();
            }

            try_download(pdfUrl, {
              on_success: () => {
                postDownloadLog(result);
                pdfDownloadHandler(pdfUrl, title, logError);
              },
              on_limit_exceded: on_download_limit_exceded
            }).catch((error) => {
              logError(error);
              message.error(error || 'Ocorreu um erro inesperado');
            });
          },
          downloadIconSrc
        )
      };

      const hasResult = !!result;
      const HIDDEN_TOOLBAR_BUTTON_TYPES = {
        'sidebar-thumbnails': true,
        'sidebar-document-outline': true,
        'sidebar-annotations': true,
        'sidebar-bookmarks': true,
        'ink-signature': true,
        image: true,
        stamp: true,
        print: true,
        pan: true,
        pager: !hasResult,
        ink: !hasResult,
        highlighter: !hasResult,
        'text-highlighter': !hasResult,
        note: !hasResult,
        text: !hasResult,
        line: !hasResult,
        arrow: !hasResult,
        rectangle: !hasResult,
        ellipse: !hasResult,
        polygon: !hasResult,
        polyline: !hasResult
      };

      const {
        closeButton,
        summaryButton,
        downloadButton,
        showContentMenuButton,
        backButton,
        printButton
      } = toolbarButtons;

      if (uiState.summaryVisible)
        return pspdfkitInstance.setToolbarItems([{ ...backButton }]);

      let items = [];

      if (!!result) items = items.concat({ ...showContentMenuButton });

      if (!!summaryCmp) items = items.concat({ ...summaryButton });

      // se tem palavras vindas da busca.
      // if (keywords || textToSearch) items = items.concat(getSearchSuggestionsToolbarButtons(keywords, textToSearch));

      items = items
        .concat([{ type: 'search' }])
        .concat(
          PSPDFKit.defaultToolbarItems.filter((a: any) => a.type !== 'search')
        )
        .filter(({ type }) => !HIDDEN_TOOLBAR_BUTTON_TYPES[type]);

      if (!downloadBlocked) {
        items = items.concat([{ ...downloadButton }, { ...printButton }]);
      }

      items = items.concat([{ ...closeButton }]);
      pspdfkitInstance.setToolbarItems(items);
    }
  };
}

function postDownloadLog(result: ContentSearchResult) {
  RequestUtil.createPostRequest(
    `api/log/postDownload/${
      result.contentType === ContentType.ARTICLE ? 'periodic' : 'book'
    }/${result.parentId}/${result.editionId}/${result.id}`
  )();
}

function postDownloadTryLog(result: ContentSearchResult) {
  RequestUtil.createPostRequest(
    `api/log/postDownloadTry/${
      result.contentType === ContentType.ARTICLE ? 'periodic' : 'book'
    }/${result.parentId}/${result.editionId}/${result.id}`
  )();
}

class ToolbarButton {
  type: string = 'custom';

  constructor(
    public readonly title: string,
    public readonly id: string,
    public readonly onPress: () => any,
    public readonly icon: string = null
  ) {}
}
