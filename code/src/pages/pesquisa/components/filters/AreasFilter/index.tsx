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

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSearchFilter } from '../../../hooks/useSearchFilter';
import { FilterFieldContainer } from '../../FilterFieldContainer';
import { AreaOfInterestSelect } from '../AuthorFilter/AreaOfInterestSelect';

interface Props {
  authorSelectTitle?: string;
  showAuthorSelect?: boolean;
  authorSelectPlaceholder?: string;
}

export const AreasFilter = ({
  authorSelectTitle = 'Autor',
  authorSelectPlaceholder = 'Digite o nome do autor...',
  showAuthorSelect = true
}: Props) => {
  const { filter, badgeCount, changeFilter } = useSearchFilter();

  const areaOfInterestValue = `${filter.areasInterestIdsList}`
    .split(',')
    .filter((v) => !!v)
    .join(',');

  return (
    <>
      <FilterFieldContainer
        title={'Áreas de interesse'}
        badgeCount={badgeCount.areasInterestIdsList}>
        {(open) => (
          <AreaOfInterestSelect
            open={open}
            onChange={(value: string) => {
              filter.areasInterestIdsList = value;
              changeFilter(filter);
            }}
            value={areaOfInterestValue}
          />
        )}
      </FilterFieldContainer>
    </>
  );
};
