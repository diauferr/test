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

import { useRef, useEffect } from 'react';
import { useAuthCtx } from '../../../features/auth_v2/hooks/useAuthCtx';
import { ContentSearchResult } from '../../../models/ContentSearchResult';
import { AnnotationRequests } from '../../../requests/annotation/AnnotationRequests';
import { IPersistor } from '../AnnotationPersistence/IPersistor';
import { RealAnnotationPersistor } from '../AnnotationPersistence/Persistors/RealAnnotationPersistor';
import { StubAnnotationPersistor } from '../AnnotationPersistence/Persistors/StubAnnotationPersistor';
import { usePdfContext } from './usePdfContext';

export function useAnnotationPersistence() {
  const { pdfUrl, result, pspdfkitInstance } = usePdfContext();

  const { is_authenticated_with_email } = useAuthCtx();
  const persistorRef = useRef<IPersistor>(new StubAnnotationPersistor());

  useEffect(() => {
    persistorRef.current =
      !!result && is_authenticated_with_email()
        ? new RealAnnotationPersistor(pspdfkitInstance, pdfUrl, result)
        : new StubAnnotationPersistor();
  }, [pspdfkitInstance, pdfUrl, result]);

  return {
    saveAnnotation: async (lastTextSelected: string) => {
      const instantJson = await pspdfkitInstance.exportInstantJSON();
      return persistorRef.current.save(instantJson, lastTextSelected);
    },
    removeAnnotations: async (annotations: any) =>
      persistorRef.current.remove(annotations),
    getAnnotations: (contentResult: ContentSearchResult) => {
      if (!contentResult || !is_authenticated_with_email()) {
        return [];
      }

      return AnnotationRequests.getUserContentAnnotations(
        contentResult.id,
        contentResult.contentType
      )
        .then((annotationsDtos) =>
          annotationsDtos.map((dto) => JSON.parse(dto.json))
        )
        .catch((e) => {
          console.error(e);
          return [];
        });
    }
  };
}
