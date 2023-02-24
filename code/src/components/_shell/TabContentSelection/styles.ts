import styled from 'styled-components';

import { Tabs as tabs } from 'antd';

const tabPane = tabs.TabPane;

export const Tabs = styled(tabs)`
  height: auto;

  .ant-tabs-tab {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #a9a6a5;

    &-active {
      color: #d7282f !important;
    }

    &:hover {
      color: #d7282f !important;
    }
  }

  .ant-tabs-ink-bar {
    background-color: #d7282f;
  }
`;

export const TabPane = styled(tabPane)``;

export const Container = styled.div`
  width: 100%;
  z-index: 3;
  height: 48px;
  justify-content: center;
  align-items: center;
`;
