import React from 'react';
import { ContentSearchResult } from '../models/ContentSearchResult';
import { DefaultContentListItem } from './DefaultContentListItem/DefaultContentListItem';
import { RoutesResolver } from '../util/RoutesResolver';

interface IProps {
  result: ContentSearchResult;
}

export const LegislationListItem = ({ result, ...props }: IProps) => {
  function getCoverImage() {
    return `${result.img}`.match('http')
      ? result.img
      : `https://www.forumconhecimento.com.br${result.img}.jpg`;
  }

  return (
    <DefaultContentListItem
      {...props}
      linkTo={RoutesResolver.getContentRoute(result)}
      result={{
        ...result,
        img: getCoverImage(),
        tags: [{ text: 'Legislação Comentada', color: 'purple' }]
      }}
    />
  );
};
