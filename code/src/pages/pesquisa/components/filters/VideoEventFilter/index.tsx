import React from 'react';
import { FilterFieldContainer } from '../../FilterFieldContainer';
import { EventSelect } from './EventSelect';
import { useSearchFilter } from '../../../hooks/useSearchFilter';

export const VideoEventFilter = () => {
  const { filter, badgeCount, changeFilter } = useSearchFilter();

  const eventIdListValue = `${filter.eventsIdList}`
    .split(',')
    .filter((v) => !!v)
    .join(',');

  return (
    <FilterFieldContainer
      title={'Eventos'}
      badgeCount={badgeCount.eventsIdList}>
      {(open) => (
        <EventSelect
          open={open}
          value={eventIdListValue}
          onChange={(value = []) => {
            filter.eventsIdList = value;
            changeFilter(filter);
          }}
        />
      )}
    </FilterFieldContainer>
  );
};
