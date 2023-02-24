/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import React from 'react';
import { FilterFieldContainer } from '../../FilterFieldContainer';
import { BookSerieSuggestion } from './BookSerieSuggestion';
import { useSearchFilter } from '../../../hooks/useSearchFilter';

export const BookSerieFilter = () => {
  const { filter, changeFilter, badgeCount } = useSearchFilter();

  return (
    <FilterFieldContainer title={'Séries'} badgeCount={badgeCount.seriesIdList}>
      {(open) => (
        <BookSerieSuggestion
          open={open}
          value={filter.seriesIdList}
          onChange={(value: string) => {
            filter.seriesIdList = value;
            changeFilter(filter);
          }}
        />
      )}
    </FilterFieldContainer>
  );
};
