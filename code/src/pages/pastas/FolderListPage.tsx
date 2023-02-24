import React, { useContext, useEffect, useState } from 'react';
import { ContentWithTitleTemplate } from '../../components/_templates/ContentWithTitleTemplate';
import { Title } from '../../components/_shell/Title';
import { FolderList } from './components/FolderList';
import { ButtonsBar } from '../../components/_shell/ButtonsBar';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loading } from '../../components/_shell/Loading';
import { FolderContext } from './context/FolderContextProvider';
import { UpdateFolderModal } from './components/UpdateFolderModal';
import { Button } from '../../components/Button';
import { IFolderContextProviderValue } from './context/IFolderContextProviderValue';
import { AcceptInvitationList } from './components/AcceptInvitationList';

export const FolderListPage = () => {
  const ctx = useContext<IFolderContextProviderValue>(FolderContext as any);
  const { folders, getFoldersRequest } = ctx.state;
  const { error, loading } = getFoldersRequest;
  const [updateFolderModalVisible, setUpdateFolderModalVisible] =
    useState(false);

  useEffect(() => {
    ctx.setCurrentFolderId('');
  }, []);

  return (
    <ContentWithTitleTemplate
      TitleContent={loading ? <Loading /> : <Title>Minhas pastas</Title>}
      Content={
        error ? (
          <ErrorMessage error={error} />
        ) : (
          <div>
            <ButtonsBar>
              <Button
                {...{
                  type: 'primary',
                  icon: 'folder-add',
                  children: <> Nova pasta</>,
                  onClick: () => setUpdateFolderModalVisible(true)
                }}
              />
            </ButtonsBar>

            <AcceptInvitationList onInviteAccepted={ctx.getFoldersFromApi} />

            {!loading && <FolderList folders={folders} />}

            <UpdateFolderModal
              visible={updateFolderModalVisible}
              onCancel={() => {
                setUpdateFolderModalVisible(false);
              }}
            />
          </div>
        )
      }
    />
  );
};
