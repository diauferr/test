import React from 'react';
import { ContentSearchResult } from '../models/ContentSearchResult';
import { DefaultContentListItem } from './DefaultContentListItem/DefaultContentListItem';

interface IProps {
  result: ContentSearchResult;
}

export const VideoListItem = ({ result, ...props }: IProps) => {
  function getCoverImage() {
    return (result.img as string).match('http')
      ? result.img
      : `https://www.forumconhecimento.com.br${result.img}.jpg`;
  }

  return (
    <DefaultContentListItem
      {...props}
      linkTo={`/conteudo/videos/${result.id}`}
      result={{
        ...result,
        img: getCoverImage(),
        tags: [{ text: 'Vídeo', color: 'red' }]
      }}
    />
  );
};
