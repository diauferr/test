import { useContext } from 'react';
import { IPdfContextProviderValues, PdfContext } from '../PdfContextProvider';

export function usePdfContext() {
  return useContext<IPdfContextProviderValues>(PdfContext as any);
}
