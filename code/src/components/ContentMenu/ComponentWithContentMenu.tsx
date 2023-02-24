import React from 'react';
import { ContentType } from '../../enums/ContentType';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { ArticleType } from '../../pages/pesquisa/enums/ArticleType';
import { ContentModals } from './ContentModals';
import { ContentMenuOptionType } from './createDefaultContentMenuOptions';
import { ModalState, useContentModalState } from './useContentModalState';

export interface IRenderProps {
  state: ModalState;
  setEmailModalVisibility: (isVisible: boolean) => any;
  setFolderModalVisibility: (isVisible: boolean) => any;
  setQuoteModalVisibility: (isVisible: boolean) => any;
  closeAllModals: () => any;
  disabledOptions: ContentMenuOptionType[];
}

interface IProps {
  result: ContentSearchResult;
  children: (renderProps: IRenderProps) => any;
}

export const ComponentWithContentMenu = ({ result, children }: IProps) => {
  const {
    state,
    setEmailModalVisibility,
    setFolderModalVisibility,
    setQuoteModalVisibility,
    closeAllModals
  } = useContentModalState();

  if (!result || result === ContentSearchResult.Empty) {
    return null;
  }

  let disabledOptions: ContentMenuOptionType[] = [];

  if (
    result.contentType === ContentType.CODE ||
    result.contentType === ContentType.CODE_ITEM ||
    result.articleType === ArticleType.JURISPRUDENCIA
  ) {
    disabledOptions = [...disabledOptions, ContentMenuOptionType.QuoteModel];
  }

  return (
    <>
      {children({
        state,
        setEmailModalVisibility,
        setFolderModalVisibility,
        setQuoteModalVisibility,
        closeAllModals,
        disabledOptions
      })}

      <ContentModals result={result} state={state} onClose={closeAllModals} />
    </>
  );
};
