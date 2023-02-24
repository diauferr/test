import React from 'react';
import { FilterFieldContainer } from '../../FilterFieldContainer';
import { GlobalFilter } from '../GlobalFilter/GlobalFilter';
import { LegislationSelect } from './LegislationSelect';
import { LegislationSerieSuggestion } from './LegislationSerieSuggestion';
import { useSearchFilter } from '../../../hooks/useSearchFilter';

export const LegislationFilter = () => {
  const { filter, changeFilter, badgeCount } = useSearchFilter();

  return (
    <>
      <GlobalFilter />

      <FilterFieldContainer
        title={'Título do livro'}
        badgeCount={badgeCount.bookIdList}>
        {(open) => (
          <LegislationSelect
            open={open}
            value={filter.bookIdList}
            onChange={(value = []) => {
              filter.bookIdList = value;
              changeFilter(filter);
            }}
          />
        )}
      </FilterFieldContainer>

      <FilterFieldContainer
        title={'Séries'}
        badgeCount={badgeCount.seriesIdList}>
        {(open) => (
          <LegislationSerieSuggestion
            open={open}
            value={filter.seriesIdList}
            onChange={(value: string) => {
              filter.seriesIdList = value;
              changeFilter(filter);
            }}
          />
        )}
      </FilterFieldContainer>
    </>
  );
};
