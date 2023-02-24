import React from 'react';
import { ContentSearchResult } from '../models/ContentSearchResult';
import { DefaultContentListItem } from './DefaultContentListItem/DefaultContentListItem';
import { ContentType } from '../enums/ContentType';

interface IProps {
  result: ContentSearchResult;
}

export const CodeListItem = ({ result, ...props }: IProps) => {
  function getCoverImage() {
    return `${result.img}`.match('http')
      ? result.img
      : `https://www.forumconhecimento.com.br${result.img}`;
  }

  return (
    <DefaultContentListItem
      {...props}
      linkTo={
        result.contentType === ContentType.CODE
          ? `https://codigos.forumconhecimento.com.br/${result.editionId}.html`
          : `https://codigos.forumconhecimento.com.br/itenscodigo${result.url}`
      }
      linkToParent={`https://codigos.forumconhecimento.com.br/${result.editionId}.html`}
      result={{
        ...result,
        img: getCoverImage(),
        tags: []
      }}
    />
  );
};
