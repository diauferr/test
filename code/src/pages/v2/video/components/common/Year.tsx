import React from 'react';
import CalendarIcon from '../../../../../assets/images/icon-calendar.svg';
import { VideoInnerFields } from '../../styles';
import { dateShort } from '../../../../../util/i18n';

export const Year = ({ item }) => (
  <VideoInnerFields>
    <img src={CalendarIcon} />
    <span>{dateShort(item.event_date)}</span>
  </VideoInnerFields>
);
