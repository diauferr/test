import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { OnlyFolderOwner } from './OnlyFolderOwner';

interface IProps {
  children;
  onRemoveClick: () => any;
}

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const RemoveButtonContainer = styled.div`
  button {
    z-index: 99;
    top: 0;
    right: 0;
    position: absolute;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background: #fff;
    border: none;
    transform: translate3d(75px, 0, 0);
    transition: transform 0.4s;
    &:hover {
      cursor: pointer;
      transform: translate3d(0, 0, 0);
      svg {
        fill: #ff0000;
      }

      span {
      }
    }

    span {
      width: 70px;
    }
    svg {
      margin-right: 5px;
      transition: fill 0.4s;
      width: 16px;
      height: 16px;
      fill: var(--primary-color);
    }
  }
`;

export const FolderContentWrapper = ({ children, onRemoveClick }: IProps) => (
  <Container>
    <OnlyFolderOwner>
      <RemoveButtonContainer>
        <button onClick={onRemoveClick}>
          <Icon type={'delete'} theme="filled" />
          <span>Remover</span>
        </button>
      </RemoveButtonContainer>
    </OnlyFolderOwner>

    <div className={'folder-content'}>{children}</div>
  </Container>
);
