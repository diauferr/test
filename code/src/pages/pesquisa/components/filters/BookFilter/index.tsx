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
import { BookSelect } from './BookSelect';
import { useSearchFilter } from '../../../hooks/useSearchFilter';

export const BookFilter = () => {
  const { filter, changeFilter, badgeCount } = useSearchFilter();

  return (
    <>
      <FilterFieldContainer
        title={'Título do livro'}
        badgeCount={badgeCount.bookIdList}>
        {(open) => (
          <BookSelect
            open={open}
            value={filter.bookIdList}
            onChange={(value = []) => {
              filter.bookIdList = value;
              changeFilter(filter);
            }}
          />
        )}
      </FilterFieldContainer>
    </>
  );
};
