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
import { useSearchFilter } from '../../../hooks/useSearchFilter';
import { FilterFieldContainer } from '../../FilterFieldContainer';
import { AuthorsSelect } from './AuthorsSelect';

interface Props {
  authorSelectTitle?: string;
  showAuthorSelect?: boolean;
  authorSelectPlaceholder?: string;
}

export const AuthorFilter = ({
  authorSelectTitle = 'Autor',
  authorSelectPlaceholder = 'Digite o nome do autor...',
  showAuthorSelect = true
}: Props) => {
  const { filter, badgeCount, changeFilter } = useSearchFilter();

  return (
    <>
      {showAuthorSelect && (
        <FilterFieldContainer
          title={authorSelectTitle}
          badgeCount={badgeCount.authorsIdList}>
          {(open) => (
            <AuthorsSelect
              placeholder={authorSelectPlaceholder}
              open={open}
              value={filter.authorsIdList}
              onChange={(value: any) => {
                filter.authorsIdList = value;
                changeFilter(filter);
              }}
            />
          )}
        </FilterFieldContainer>
      )}
    </>
  );
};
