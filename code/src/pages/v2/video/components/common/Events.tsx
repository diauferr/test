import React from 'react';
import { Video } from '../../interfaces/Video';

import EventIcon from '../../../../../assets/images/icon-event.svg';
import { VideoInnerFields } from '../../styles';

export const Events = ({ item }) => {
  const events = (el: Video) =>
    el.tags
      .filter((e) => e.prefix === 'event')
      .map((e) => e.title)
      .join(', ');

  const eventItems = events(item);

  return eventItems.length ? (
    <VideoInnerFields>
      <img src={EventIcon} />
      <span>{eventItems}</span>
    </VideoInnerFields>
  ) : null;
};
