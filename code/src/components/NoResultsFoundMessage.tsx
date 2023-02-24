import React from 'react';
import styled from 'styled-components';
import { Empty } from 'antd';

const Container = styled.div`
  width: 100%;
  text-align: center;

  .ant-empty-image {
    height: auto !important;
  }
`;

interface IProps {
  message?: string;
}

export const NoResultsFoundMessage = ({
  message = 'Nenhum registro encontrado'
}: IProps) => (
  <Container>
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={message} />
  </Container>
);
