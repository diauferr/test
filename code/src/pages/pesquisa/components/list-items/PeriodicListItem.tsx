import React from 'react';
import { ContentSearchResult } from '../../../../models/ContentSearchResult';
import { DefaultContentListItem } from '../../../../components/DefaultContentListItem/DefaultContentListItem';

interface IProps {
  result: ContentSearchResult;
}

export const PeriodicListItem = ({ result, ...props }: IProps) => {
  function getPeriodicCoverImage(periodicId: number) {
    return `https://www.forumconhecimento.com.br/Uploads/ImgPeriodico/imgPeriodicoListagem_${periodicId}_record.jpg`;
  }

  return (
    <DefaultContentListItem
      {...props}
      linkTo={`/periodico/${result.id}`}
      result={{
        ...result,
        img: getPeriodicCoverImage(result.id),
        tags: [{ text: 'Revista', color: 'purple' }]
      }}
    />
  );
};
