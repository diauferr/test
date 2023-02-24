import React from 'react';
import { Book } from '../../interfaces/Book';

import TagIcon from '../../../../../assets/images/icon-tag.svg';
import { BookInnerFields } from '../../styles';

export const Tags = ({ item }) => {
  const tags = (el: Book) =>
    el.tags
      .filter((e) => e.id.includes('kwrd'))
      .map((e) => e.title)
      .join(', ');

  return (
    <BookInnerFields>
      <img src={TagIcon} />
      <span>{tags(item)}</span>
    </BookInnerFields>
  );
};
