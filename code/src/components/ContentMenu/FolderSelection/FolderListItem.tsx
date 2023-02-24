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

import React from 'react';
import { Icon } from 'antd';
import { ModalMenuListItem } from '../../ModalMenuListItem';
import { FolderModel } from '../../../models/folder/FolderModel';
import { withRouter } from 'react-router';
import { Button } from '../../Button';

interface IProps {
  folder: FolderModel;
  loading: boolean;
  contentAlreadyInsideFolder: boolean;
  addedContentSuccessfully: boolean;
  onClick: (folderId: string) => any;
  history?: any;
}

const _FolderListItem = ({
  folder,
  onClick,
  loading,
  addedContentSuccessfully,
  contentAlreadyInsideFolder,
  history
}: IProps) => {
  const icons = {
    success: (
      <Icon
        type="check-circle"
        theme="twoTone"
        twoToneColor="#52c41a"
        style={{ fontSize: '2rem', color: 'green' }}
      />
    ),
    loading: <Icon type="loading" />,
    default: (
      <Icon
        type="folder"
        theme="filled"
        style={{
          color: contentAlreadyInsideFolder
            ? '#cecece'
            : 'var(--primary-color-dark)'
        }}
      />
    )
  };

  return (
    <ModalMenuListItem
      Icon={(() => {
        if (addedContentSuccessfully) return icons.success;

        if (loading) return icons.loading;

        return icons.default;
      })()}
      disabled={contentAlreadyInsideFolder && !addedContentSuccessfully}
      onClick={() => {
        if (!addedContentSuccessfully) {
          onClick(folder.id);
        }
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          paddingRight: '.5rem'
        }}>
        {folder.name}
        {addedContentSuccessfully && (
          <div style={{ display: 'flex', fontSize: '.8rem' }}>
            <Button
              onClick={() => history.push(`/pastas/${folder.id}`)}
              style={{ fontSize: '.9rem', fontWeight: 700 }}>
              Ir para a pasta{' '}
              <Icon
                type={'arrow-right'}
                style={{
                  fontSize: '.9rem',
                  color: 'var(--primary-color)'
                }}
              />
            </Button>
          </div>
        )}

        {contentAlreadyInsideFolder && !addedContentSuccessfully && (
          <span style={{ display: 'block', fontSize: '.8rem' }}>
            Conteúdo já adicionado
          </span>
        )}
      </div>
    </ModalMenuListItem>
  );
};

//@ts-ignore
export const FolderListItem = withRouter(_FolderListItem);
