import React from 'react';
import { Book } from '../../interfaces/Book';

import VoiceIcon from '../../../../../assets/images/icon-voice.svg';
import { BookInnerFields } from '../../styles';

export const Author = ({ item }) => {
  const author = (el: Book) =>
    el.tags
      .filter((e) => String(e.id).includes('author'))
      .map((e) => e.title)
      .join(', ');

  return (
    <BookInnerFields>
      <img src={VoiceIcon} />
      <span>{author(item)}</span>
    </BookInnerFields>
  );
};
