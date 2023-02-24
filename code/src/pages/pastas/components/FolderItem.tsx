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

/* eslint-disable indent */
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';
import { FolderModel } from '../../../models/folder/FolderModel';

const Container = styled.div<any>`
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: all 0.4s;
    padding: 2rem 0;

    i {
      transition: all 0.4s;
      color: #ffb142;
    }

    &:focus {
      background: #f4f4f4;
      outline: 1px solid #cecece;
    }

    &:hover {
      i {
        color: #ffb142;
      }
      background: #f4f4f4;
      color: var(--primary-color-light);
      text-decoration: underline;
    }

    .empty-message {
      color: #cecece;
      font-size: 0.8rem;
      display: block;
      text-transform: uppercase;
    }
  }

  .card-folder {
    h4 {
      margin-bottom: 0;
    }
    span {
      opacity: 0.7;
      font-size: 0.9rem;
    }
  }
`;

interface IProps {
  folder?: FolderModel;
}

export const FolderItem = ({ folder }: IProps) => {
  const folderContentsLenght = folder.contents.length;

  return (
    <Container>
      <NavLink to={`/pastas/${folder.id}`}>
        <div className={'card-folder'}>
          <Icon type="folder" theme="filled" style={{ fontSize: '3rem' }} />
          <h4>{`${folder.name} (${folderContentsLenght})`}</h4>
          <span>
            {+folder.lastContentInclusion
              ? `atualizada ${moment(
                  folder.lastContentInclusion * 1000
                ).fromNow()}`
              : null}
          </span>
        </div>
      </NavLink>
    </Container>
  );
};
