import React from 'react';
import { Video } from '../../interfaces/Video';

import TagIcon from '../../../../../assets/images/icon-tag.svg';
import { VideoInnerFields } from '../../styles';

export const Tags = ({ item }) => {
  const tags = (el: Video) =>
    el.tags
      .filter((e) => e.prefix === 'kwrd')
      .map((e) => e.title)
      .join(', ');

  return (
    <VideoInnerFields>
      <img src={TagIcon} />
      <span>{tags(item)}</span>
    </VideoInnerFields>
  );
};
