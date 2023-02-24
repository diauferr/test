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

import { Badge, Icon } from 'antd';
import React, { ReactNode, useState } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { SearchFilter } from '../../models/search/SearchFilter';
import { useSearchFilter } from '../../pages/pesquisa/hooks/useSearchFilter';
import { contentSelectionHeight } from '../_shell/TabContentSelection';
import { topbarHeight } from '../_shell/Navbar';
import { CenteredContent } from './CenteredContent';
import { ClearFilterButton } from './ClearFilterButton';
import { ContentBelowHeader } from './ContentBelowHeader';
import { ContentWithAllAvailableSpace } from './ContentWithAllAvailableSpace';

const filterWidth = 340;

interface IProps {
  Filter?: ReactNode;
  Content: ReactNode;
}

export const contentDivId = 'content-container';

const ContentWithFilter = ({ Filter, Content: ContentCmp }: IProps) => {
  const { filter } = useSearchFilter();
  const [filterOpen, setFilterOpen] = useState(window.innerWidth > 1330);
  const filterCls = filterOpen ? 'open' : 'closed';
  const activeFiltersCount = filter
    ? SearchFilter.getSumOfActiveFilters(filter.getBadgeCount())
    : 0;

  return (
    <Container>
      <CenteredContent className={'content-container'}>
        <div>{ContentCmp}</div>
      </CenteredContent>
    </Container>
  );
};

const Container = styled.div``;

//@ts-ignore
export default withRouter(ContentWithFilter);
