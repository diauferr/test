import React from 'react';
import { Book } from '../../interfaces/Book';

import CalendarIcon from '../../../../../assets/images/icon-calendar.svg';
import { BookInnerFields } from '../../styles';

export const Year = ({ item }) => {
  const year = (el: Book) => new Date(el.publish_date).getFullYear();

  return (
    <BookInnerFields>
      <img src={CalendarIcon} />
      <span>{year(item)}</span>
    </BookInnerFields>
  );
};
