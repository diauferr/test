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
import _ from 'lodash';
import { useRef } from 'react';
import { useEffectIfNotNull } from '../../Hooks/useEffectIfNotNull';
import { useErrorLogger } from '../../Hooks/useErrorLogger';
import { useAnnotationPersistence } from './hooks/useAnnotationPersistence';
import { usePdfContext } from './hooks/usePdfContext';

export const PdfEvents = () => {
  const { changeUiState, pspdfkitInstance } = usePdfContext();
  const lastTextSelected = useRef('');

  const { saveAnnotation, removeAnnotations } = useAnnotationPersistence();

  const logError = useErrorLogger();

  /**** Pdf scroll event ****/

  const onPdfScroll = useRef(
    _.debounce((evt) => {
      if (!evt) return;

      if (
        evt.target.scrollHeight -
          evt.target.scrollTop -
          evt.target.clientHeight <=
        135
      ) {
        changeUiState((state) => state.setNextButtonVisibility(true));
      } else {
        changeUiState((state) =>
          state
            .setNextButtonVisibility(false)
            .setTitleVisibility(evt.target.scrollTop < 135)
        );
      }
    }, 300)
  );

  const onAnnotationDidSave = useRef<() => any>(() => null);
  const onAnnotationDelete = useRef<(annotations: any) => any>(() => null);
  const onTextSelectionChange = useRef<(textSelection: any) => Promise<any>>(
    async () => null
  );

  useEffectIfNotNull(() => {
    addPdfScrollEventListener(pspdfkitInstance, onPdfScroll.current);

    pspdfkitInstance.addEventListener('annotations.willSave', () => {});

    onAnnotationDidSave.current = () => {
      saveAnnotation(lastTextSelected.current).catch((error) => {
        message.error('Ocorreu um erro ao tentar salvar anotação.');
        logError(error);
      });
    };

    pspdfkitInstance.addEventListener(
      'annotations.didSave',
      onAnnotationDidSave.current
    );

    onAnnotationDelete.current = (annotations: any) => {
      removeAnnotations(annotations).catch((error) => {
        logError(error);
      });
    };
    pspdfkitInstance.addEventListener(
      'annotations.delete',
      onAnnotationDelete.current
    );
    pspdfkitInstance.addEventListener('annotations.update', (annotation) => {
      //		console.log(annotation)
    });

    onTextSelectionChange.current = async (textSelection) => {
      if (textSelection) {
        changeUiState((state) => state.setTitleVisibility(false));

        const text = await textSelection.getText();
        lastTextSelected.current = `${text}`.replace(/(\r\n|\n|\r)/gm, '');
      }
    };

    pspdfkitInstance.addEventListener(
      'textSelection.change',
      onTextSelectionChange.current
    );
  }, [pspdfkitInstance]);

  return null;
};

function addPdfScrollEventListener(pspdfkitInstance: any, onPdfScroll: any) {
  const { contentDocument } = pspdfkitInstance;
  if (!contentDocument) return;

  const elements = contentDocument.getElementsByClassName('PSPDFKit-Scroll');
  if (!elements) return;

  const element = elements[0];
  if (!element) return;

  // setScrollElement(element)
  element.addEventListener('scroll', onPdfScroll);
}
