import React from 'react';

import { Badge } from 'antd';
import { Image as SCImage } from '../../styles';

type IImgError = React.SyntheticEvent<HTMLImageElement, Event>;

export const Image = ({ item }) => {
  const base = `https://${process.env.REACT_APP_PUBLIC_BUCKET}.s3-sa-east-1.amazonaws.com`;
  const placeholder = `${base}/books/cover/no-cover.jpg`;
  const onImgError = (e: IImgError) => (e.currentTarget.src = placeholder);
  const idSplited = String(item.id || '').split('-');
  const bookNumId = idSplited && idSplited[0] ? idSplited[0] : '';
  const editionNumId = idSplited && idSplited[1] ? idSplited[1] : '';
  const imgUrl = `books/cover/${bookNumId}/editions/${editionNumId}.jpg`;
  return (
    <Badge
      count={'Livro'}
      offset={[-16, 0]}
      style={{ borderRadius: '4px', backgroundColor: '#063A93' }}>
      <SCImage
        src={`${base}/${imgUrl}`}
        alt={item.title}
        onError={onImgError}
      />
    </Badge>
  );
};
