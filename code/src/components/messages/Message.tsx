import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Icon as AntIcon } from 'antd';

const Container = styled.div`
  padding: 1rem;
  border: 1px solid #cecece;
  border-radius: 0.5rem;
  background: #fbfbfb;
  margin-top: 2rem;
  margin-bottom: 2rem;
  position: relative;

  .icon-container {
    position: absolute;
    left: 10px;
    top: 18px;
  }

  .content {
    margin-left: 2rem;
  }

  span {
    font-size: 0.9rem;
  }
`;

interface IProps {
  Icon?: ReactNode;
  containerStyle?: object;
  children: any;
}

export const Message = ({
  Icon = (
    <AntIcon type="info-circle" theme="twoTone" style={{ fontSize: 22 }} />
  ),
  children,
  containerStyle = {}
}: IProps) => (
  <Container style={containerStyle}>
    <div className="icon-container">{Icon}</div>

    <div className="content">{children}</div>
  </Container>
);
