import React from 'react';

import { Badge } from 'antd';
import { Image as SCImage } from '../../styles';

type IImgError = React.SyntheticEvent<HTMLImageElement, Event>;

export const Image = ({ item }) => {
  const base = `https://${process.env.REACT_APP_PUBLIC_BUCKET}.s3-sa-east-1.amazonaws.com`;
  const placeholder = `${base}/videos/thumbs/placeholder.jpg`;
  const onImgError = (e: IImgError) => (e.currentTarget.src = placeholder);

  return (
    <Badge
      count={'Video'}
      offset={[-16, 0]}
      style={{ borderRadius: '4px', backgroundColor: '#D7282F' }}>
      <SCImage
        src={`${base}/${item.image}`}
        alt={item.title}
        onError={onImgError}
      />
    </Badge>
  );
};
