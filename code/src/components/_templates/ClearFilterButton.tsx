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

import { Icon } from 'antd';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { SearchFilter } from '../../models/search/SearchFilter';
import { Button } from '../Button';

interface IProps {
  activeFiltersCount: number;
}

export const ClearFilterButton = ({ activeFiltersCount }: IProps) => {
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <Button
      type="danger"
      style={{ marginBottom: '1rem' }}
      onClick={() => {
        const [, pathPart1, pathPart2, pathPart3] = match.url.split('/');

        const filter = SearchFilter.createFromQueryString(pathPart3);
        if (filter.words) {
          const newFilter = new SearchFilter(filter.words);
          history.push(
            `/${pathPart1}/${pathPart2}/${newFilter.convertToQueryString()}`
          );
        } else {
          history.push(`/${pathPart1}/${pathPart2}/`);
        }
      }}>
      <span>Limpar {activeFiltersCount} filtros</span>
    </Button>
  );
};
