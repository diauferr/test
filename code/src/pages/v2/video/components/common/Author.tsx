import React from 'react';
import { Video } from '../../interfaces/Video';

import VoiceIcon from '../../../../../assets/images/icon-voice.svg';
import { VideoInnerFields } from '../../styles';

export const Author = ({ item }) => {
  const author = (el: Video) =>
    el.tags
      .filter((e) => e.prefix === 'author')
      .map((e) => e.title)
      .join(', ');

  return (
    <VideoInnerFields>
      <img src={VoiceIcon} />
      <span>{author(item)}</span>
    </VideoInnerFields>
  );
};
