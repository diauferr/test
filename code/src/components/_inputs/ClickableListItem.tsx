import styled from 'styled-components';
import { List } from 'antd';

export const ClickableListItem = styled(List.Item)`
  background: #fff;
  font-size: 0.9rem;
  padding: 6px 0;
  border-bottom: none !important;
  &:hover {
    cursor: pointer;
    background: #f4f4f4;
  }

  .ant-list-item-meta-avatar {
    padding-left: 0.5rem;
  }

  .ant-list-item-meta-avatar,
  .ant-list-item-meta-content,
  .ant-list-item-meta {
    display: flex;
    align-items: center;
  }

  .ant-list-item-meta-description {
    color: #323232;
  }
`;
