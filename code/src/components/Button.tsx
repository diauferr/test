import React from 'react';
import styled from 'styled-components';
import { Button as AntButton } from 'antd';
import { ButtonProps } from 'antd/lib/button';

const ButtonContainer = styled.div`
  font-weight: 500;
  border: 0 !important;

  &:focus,
  &:active,
  &:hover {
    border-color: var(--primary-color-light) !important;
    color: var(--primary-color-light) !important;
  }

  &:active.ant-btn.active:not(.ant-btn-primary) {
    color: var(--primary-color-light) !important;
  }

  &.ant-btn-primary {
    font-weight: 700;
    background: var(--primary-color);

    color: #fff;

    &:hover {
      color: #fff !important;

      i,
      span {
        color: #fff !important;
      }

      background: var(--primary-color-light);
    }
  }

  &.ant-btn-secondary {
    font-weight: 700;
    background: var(--secondary-color);
    color: #fff;

    i,
    span {
      color: #fff !important;
    }

    &:hover {
      i,
      span {
        color: #fff !important;
      }

      background: var(--secondary-color-light);
    }

    &:active,
    &:focus {
      color: #fff;
      background: var(--secondary-color-light);
    }
  }

  &.ant-btn-danger {
    &:hover {
      color: #fff !important;
    }

    &:focus:hover {
      color: #323232 !important;
    }
  }
`;

export const Button = (props: ButtonProps) => (
  <ButtonContainer>
    <AntButton {...props} />
  </ButtonContainer>
);
