import React from 'react';
import { DefaultContentListItem } from './DefaultContentListItem/DefaultContentListItem';
import { ArticleType } from '../pages/pesquisa/enums/ArticleType';
import { RoutesResolver } from '../util/RoutesResolver';

function getTag(type: ArticleType) {
  switch (type) {
    case ArticleType.DOUTRINA:
      return { text: 'Doutrina', color: 'red' };
    case ArticleType.JURISPRUDENCIA:
      return { text: 'Jurisprudência', color: 'green' };
    case ArticleType.TENDENCIA_JURISPRUDENCIAL:
      return { text: 'Jurisprudência', color: 'green' };
    default:
      return { text: '', color: '' };
  }
}

export const ArticleListItem = ({ result, ...props }: any) => {
  function getPeriodicCoverImage() {
    return `${result.img}`.match('http')
      ? result.img
      : `https://www.forumconhecimento.com.br${result.img}.jpg`;
  }

  return (
    // @ts-ignore
    <DefaultContentListItem
      {...{ ...props }}
      linkTo={`${RoutesResolver.getContentRoute(
        result
      )}?searchpage=1&keywords=${result.relevantWords}`}
      linkToParent={`/periodico/${result.parentId}/${result.editionId}`}
      result={{
        ...result,
        img: getPeriodicCoverImage(),
        tags: [getTag(result.articleType)]
      }}
    />
  );
};
