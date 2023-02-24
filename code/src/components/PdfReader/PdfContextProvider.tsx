import React, { ReactNode, useState } from 'react';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { PdfUIState } from './Models/PdfUIState';

// @ts-ignore
export const PdfContext = React.createContext();

interface IProps {
  onClose: () => any;
  children: any;
  result: ContentSearchResult;
  pdfUrl: string;
  summaryTitle?: ReactNode;
  summaryCmp?: ReactNode;
  title: string;
  subtitle: string;
  pageIndex?: number;
  prevContentTitle?: string;
  prevContentLink?: string;
  nextContentTitle?: string;
  nextContentLink?: string;
}

export const PdfContextProvider = ({
  children,
  onClose,
  result,
  pdfUrl,
  summaryTitle,
  summaryCmp,
  title,
  subtitle,
  pageIndex = 0,
  prevContentTitle,
  prevContentLink,
  nextContentTitle,
  nextContentLink
}: IProps) => {
  const [totalPages, setTotalPages] = useState<any>(0);
  const [uiState, setUIState] = useState<any>(PdfUIState.Empty);
  const [pspdfkitInstance, setPspdfkitInstance] = useState<any>(null);

  return (
    <PdfContext.Provider
      value={
        {
          pspdfkitInstance,
          setPspdfkitInstance,
          uiState,
          changeUiState: (change: (currentState: PdfUIState) => PdfUIState) => {
            const newState = change(uiState);
            setUIState(newState);
          },
          pdfUrl,
          result,
          onClose,
          summaryTitle,
          summaryCmp,
          title,
          subtitle,
          pageIndex,
          prevContentTitle,
          prevContentLink,
          nextContentTitle,
          nextContentLink,
          totalPages,
          setTotalPages
        } as IPdfContextProviderValues
      }>
      {children}
    </PdfContext.Provider>
  );
};

export interface IPdfContextProviderValues extends IProps {
  pspdfkitInstance: any;
  setPspdfkitInstance: (instance: any) => any;
  uiState: PdfUIState;
  changeUiState: (change: (currentState: PdfUIState) => PdfUIState) => any;
  totalPages: number;
  setTotalPages: (total: number) => any;
}
