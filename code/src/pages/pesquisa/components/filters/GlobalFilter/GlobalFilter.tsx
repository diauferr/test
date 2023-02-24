import React from 'react';
import { useSearchFilter } from '../../../hooks/useSearchFilter';
import { FilterFieldContainer } from '../../FilterFieldContainer';
import { AreaOfInterestSelect } from '../AuthorFilter/AreaOfInterestSelect';
import { AuthorsSelect } from '../AuthorFilter/AuthorsSelect';
import { SearchScopeRadio } from './SearchScopeSelect';

interface Props {
  authorSelectTitle?: string;
  showAuthorSelect?: boolean;
  authorSelectPlaceholder?: string;
}

export const GlobalFilter = ({
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

      {filter.words && (
        <FilterFieldContainer
          title={'Buscar em'}
          open
          otherProps={{ style: { gridRow: 6 } }}
          badgeCount={badgeCount.searchScope}>
          {() => (
            <SearchScopeRadio
              value={`${filter.searchScope}`}
              onChange={(value: any) => {
                filter.searchScope = value;
                changeFilter(filter);
              }}
            />
          )}
        </FilterFieldContainer>
      )}
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
