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
import { Pagination as AntPagination } from 'antd';
import styled from 'styled-components';

const Container = styled.nav`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  .ant-pagination-item {
    &:hover {
      border-color: var(--primary-color);
    }
  }

  .ant-pagination-item-active {
    border: 0;
    color: #fff;
    background: var(--primary-color);

    a {
      color: #fff !important;
    }
  }
`;

interface IProps {
  onChange: (page: number) => any;
  currentPage: number;
  total: number;
  pageSize?: number;
  props: any;
}

export const Pagination = ({
  onChange,
  currentPage,
  total,
  pageSize = 20,
  ...props
}: IProps | any) => (
  <Container>
    <AntPagination
      defaultPageSize={20}
      pageSize={pageSize}
      hideOnSinglePage={true}
      current={parseInt(currentPage)}
      total={total}
      onChange={(page: number, _: number) => onChange(page)}
      {...props}
    />
  </Container>
);
