import styled from 'styled-components';

import { Badge as badge, Popover as popover } from 'antd';

import 'antd/dist/antd.css';

export const Button = styled.button`
  margin-right: 16px;
  min-height: 40px;
  color: #003a70;
  border: 2px solid #003a70;
  background-color: transparent;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  padding: 0 20px 0 20px;
  cursor: pointer;
`;

export const Icon = styled.img`
  margin: 0 8px 0 0 !important;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8;
  width: 100%;
  margin-top: 0;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  min-width: 880px;
`;

export const Badge = styled(badge)`
  .ant-badge-count {
    background-color: #d7282f;
    color: #fff;
  }

  .ant-scroll-number-only-unit {
    color: #fff;
  }
`;

export const Popover = styled(popover)`
  .ant-popover {
  }
  .ant-popover-inner {
    padding: 8px;
    border-radius: 16px;
  }

  .ant-popover-arrow {
    display: none;
  }
`;

export const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
`;
