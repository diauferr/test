import React from 'react';
import { FilterFieldContainer } from '../../FilterFieldContainer';
import { VideoSerieSuggestion } from './VideoSerieSuggestion';
import { useSearchFilter } from '../../../hooks/useSearchFilter';

export const VideoSerieFilter = () => {
  const { filter, badgeCount, changeFilter } = useSearchFilter();

  const videoSeriesIdListValue = `${filter.videoSeriesIdList}`
    .split(',')
    .filter((v) => !!v)
    .join(',');

  return (
    <FilterFieldContainer
      title={'Séries'}
      badgeCount={badgeCount.videoSeriesIdList}>
      {() => (
        <VideoSerieSuggestion
          value={videoSeriesIdListValue}
          onChange={(value: any) => {
            filter.videoSeriesIdList = value;
            changeFilter(filter);
          }}
        />
      )}
    </FilterFieldContainer>
  );
};
