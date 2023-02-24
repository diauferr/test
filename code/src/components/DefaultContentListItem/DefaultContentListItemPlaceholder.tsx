import { Skeleton } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .ant-skeleton-avatar-square {
    width: 150px;
    height: 170px;
  }
`;

interface IProps {
  style?: object;
}

export const DefaultContentListItemPlaceholder = ({ style = {} }: IProps) => (
  <Container style={style}>
    <Skeleton
      loading={true}
      active
      avatar={{
        shape: 'square',
        size: 'large'
      }}
      title
      paragraph={{
        rows: 3
      }}
    />
  </Container>
);
