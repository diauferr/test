import { useState } from 'react';
import { AnnotationsState } from './AnnotationsState';
import { AnnotationRequests } from '../../../requests/annotation/AnnotationRequests';

export function useAnnotationsState() {
  const [state, setState] = useState(new AnnotationsState());

  return {
    state,
    getAnnotations: (page: number = 1, words: string = '') => {
      if (state.requestProgress.loading) return;

      setState(state.setRequestLoading());

      AnnotationRequests.getUserAnnotations(page, words)
        .then((result) => setState(state.setRequestResult(result)))
        .catch((error) => setState(state.setRequestError(error)));
    }
  };
}
