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

import { Avatar, message } from 'antd';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useDoRequest } from '../Hooks/useDoRequest';
import { FolderRequests } from '../requests/folder/FolderRequests';
import { useEffectIfNotNull } from '../Hooks/useEffectIfNotNull';
import { IFolderContextProviderValue } from '../pages/pastas/context/IFolderContextProviderValue';
import { FolderContext } from '../pages/pastas/context/FolderContextProvider';
import { OnlyFolderOwner } from '../pages/pastas/components/OnlyFolderOwner';
import { useAuthCtx } from '../features/auth_v2/hooks/useAuthCtx';
import { useConfirm } from '../Hooks/useConfirm';

interface IProps {
  email: string;
  folderId: string;
  name?: string;
}

export const UserInFolder = ({ email, name, folderId }: IProps) => {
  const { session } = useAuthCtx();
  const [result, , error, doRequest] = useDoRequest();
  const ctx = useContext<IFolderContextProviderValue>(FolderContext as any);

  useEffectIfNotNull(() => {
    ctx.updateAssociatedUsers(folderId, email);

    message.success('Usuário removido com sucesso.');
  }, [result]);

  useEffectIfNotNull(() => {
    message.error('Erro ao remover usuário da pasta.');
  }, [error]);

  const showRemoveUserConfirm = useConfirm(
    'Deseja remover este usuário da pasta?',
    '',
    () => {
      doRequest(() => FolderRequests.removeUserFromFolder(folderId, email));
    }
  );

  return (
    <Container>
      <Avatar icon="user" />
      <div className="content">
        {name && <span>{name}</span>}
        <OnlyFolderOwner>
          {session.email !== email ? (
            <div className="remove-user-container">
              <button
                onClick={() => {
                  showRemoveUserConfirm();
                }}>
                <img src="/assets/images/trash-can.svg" alt="remover usuário" />
                <span>Remover</span>
              </button>
            </div>
          ) : (
            <div className="remove-user-container"></div>
          )}
        </OnlyFolderOwner>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 42px 0.8fr;
  width: 100%;
  padding: 0.2rem;
  grid-column-gap: 0.5rem;
  align-items: center;
  margin: 0;

  .ant-avatar {
    background: var(--primary-color);
  }

  .content {
    display: flex;
    flex-direction: column;
    margin: 0;
    align-items: start;

    span {
      font-size: 0.9rem;
    }

    img,
    button {
      padding: 0;
    }
  }

  .remove-user-container {
    display: flex;
    justify-content: flex-end;

    button {
      border: 0;
      background: transparent;
      cursor: pointer;
      outline: none;

      &:hover {
        text-decoration: underline;
      }

      img {
        width: 16px;
        margin-right: 3px;
      }
    }
  }
`;
