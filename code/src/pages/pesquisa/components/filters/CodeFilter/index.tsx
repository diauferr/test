import React from 'react';
import { FilterFieldContainer } from '../../FilterFieldContainer';
import { SearchScopeRadio } from '../GlobalFilter/SearchScopeSelect';
import { CodeFilterSuggestion } from './CodeFilterSuggestion';
import { useSearchFilter } from '../../../hooks/useSearchFilter';

export const CodeFilter = () => {
  const { filter, changeFilter, badgeCount } = useSearchFilter();

  const codeIdListValue = `${filter.codeIdList}`
    .split(',')
    .filter((v) => !!v)
    .join(',');

  return (
    <>
      <FilterFieldContainer
        title={'No Código'}
        open={true}
        badgeCount={badgeCount.codeIdList}>
        {(open) => (
          <CodeFilterSuggestion
            open={open}
            value={codeIdListValue}
            onChange={(value: string) => {
              filter.codeIdList = value;
              changeFilter(filter);
            }}
          />
        )}
      </FilterFieldContainer>
      {filter.words && (
        <FilterFieldContainer
          title={'Buscar em'}
          open
          otherProps={{ style: { gridRow: 2 } }}>
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
    </>
  );
};
