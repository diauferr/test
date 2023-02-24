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
import { PeriodicSelect } from './PeriodicSelect';
import { useSearchFilter } from '../../../hooks/useSearchFilter';

interface Props {
  selectTitle?: string;
  selectPlaceholder?: string;
}

export const PeriodicFilter = ({
  selectTitle = 'Título da revista',
  selectPlaceholder = 'Digite o nome da revista...'
}: Props) => {
  const { filter, badgeCount, changeFilter } = useSearchFilter();

  return (
    <FilterFieldContainer
      title={selectTitle}
      badgeCount={badgeCount.periodicIdList}>
      {(open) => (
        <PeriodicSelect
          placeholder={selectPlaceholder}
          open={open}
          value={filter.periodicIdList}
          onChange={(value: any) => {
            filter.periodicIdList = value;
            changeFilter(filter);
          }}
        />
      )}
    </FilterFieldContainer>
  );
};
