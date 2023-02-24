import React from 'react';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { highlightWords as highlightWordsFunction } from '../../util/highlightWords';

interface IProps {
  textCharCountLimit: number;
  searchingWords: string;
  result: ContentSearchResult;
}

export const ContentDescription = ({
  textCharCountLimit,
  searchingWords,
  result
}: IProps) => {
  const { relevantWords } = result;

  function truncate(text: string) {
    if (!text) return '';
    if (text && text.length >= textCharCountLimit) {
      if (!!searchingWords) {
        return `...${text.substring(0, textCharCountLimit)}...`;
      }
      return `${text.substring(0, textCharCountLimit)}...`;
    } else {
      return text;
    }
  }

  return (
    <>
      <div
        className={'text'}
        dangerouslySetInnerHTML={{
          __html: relevantWords
            ? highlightWordsFunction(relevantWords, truncate(result.text))
            : truncate(result.text)
        }}
      />
    </>
  );
};
