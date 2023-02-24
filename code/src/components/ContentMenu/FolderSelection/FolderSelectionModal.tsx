import React from 'react';
import { useEffectIfNotNull } from '../../../Hooks/useEffectIfNotNull';
import { ContentSearchResult } from '../../../models/ContentSearchResult';
import { FolderModel } from '../../../models/folder/FolderModel';
import { Modal } from '../../Modal';
import { ModalMenuList } from '../../ModalMenuList';
import { NoResultsFoundMessage } from '../../NoResultsFoundMessage';
import { Loading } from '../../_shell/Loading';
import { AddNewFolderButton } from './AddIntoNewFolderButton';
import { FolderListItem } from './FolderListItem';
import { useAddContentToFolder } from './hooks/useAddContentToFolder';
import { useFolderModalState } from './hooks/useFolderModalState';
import { useGetFoldersFormDb } from './hooks/useGetFoldersFormDb';

interface IProps {
  result: ContentSearchResult;
  onCancel: () => any;
  visible: any;
}

export const FolderSelectionModal = ({ result, onCancel, visible }: IProps) => {
  const {
    folderModalState,
    addNewFolder,
    setLastClickedFolderId,
    setSuccessFolderIds,
    inicializeFolders
  } = useFolderModalState();
  const { getFoldersFromDb, loading } = useGetFoldersFormDb();
  const { addContentToFolder, awaitingAddingContent } = useAddContentToFolder(
    setSuccessFolderIds,
    folderModalState
  );

  useEffectIfNotNull(() => {
    getFoldersFromDb(inicializeFolders);
  }, [visible]);

  function renderMenuListContent() {
    if (loading) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '50vh'
          }}>
          <Loading />
        </div>
      );
    }

    if (folderModalState.folders.length === 0) {
      return (
        <div style={{ paddingTop: '3rem' }}>
          <NoResultsFoundMessage message={'Nenhuma pasta encontrada.'} />
        </div>
      );
    }

    return folderModalState.folders
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

        return 0;
      })
      .map((folder) => {
        const successfullyAddedInsideThisFolder =
          folderModalState.successFolderIds.indexOf(folder.id) >= 0;
        const contentAlreadyInsideFolder =
          folder.isContentAlreadyIncluded(result) ||
          successfullyAddedInsideThisFolder;

        return (
          <FolderListItem
            key={folder.id}
            // @ts-ignore
            folder={folder}
            loading={
              awaitingAddingContent &&
              folder.id === folderModalState.lastClickedFolderId
            }
            contentAlreadyInsideFolder={contentAlreadyInsideFolder}
            addedContentSuccessfully={successfullyAddedInsideThisFolder}
            onClick={(folderId: string) => {
              if (awaitingAddingContent) return;

              setLastClickedFolderId(folder.id);
              addContentToFolder(folderId, result);
            }}
          />
        );
      });
  }

  return (
    <Modal
      title={'Selecione a pasta'}
      visible={visible}
      onCancel={onCancel}
      maskClosable={true}
      footer={[
        <AddNewFolderButton
          key={'add-button'}
          onFolderCreated={(newFolder: FolderModel) => {
            addNewFolder(newFolder);
          }}
          doAddContentToFolder={(folderId: string) => {
            if (awaitingAddingContent) return;

            setLastClickedFolderId(folderId);
            addContentToFolder(folderId, result);
          }}
        />
      ]}>
      <div>
        <ModalMenuList>{renderMenuListContent()}</ModalMenuList>
      </div>
    </Modal>
  );
};
