import { useState } from 'react';
import { FolderModel } from '../../../../models/folder/FolderModel';
import { FolderModalState } from '../context/FolderModalState';

export function useFolderModalState() {
  const [folderModalState, setFolderModalState] = useState(
    new FolderModalState()
  );

  return {
    folderModalState,
    inicializeFolders: (folders: FolderModel[]) =>
      setFolderModalState(folderModalState.inicializeFolders(folders)),
    addNewFolder: (folder: FolderModel) =>
      setFolderModalState(folderModalState.addNewFolder(folder)),
    setLastClickedFolderId: (folderId: string) =>
      setFolderModalState(folderModalState.setLastClickedFolderId(folderId)),
    setSuccessFolderIds: (folderId: string) =>
      setFolderModalState(folderModalState.setSuccessFolderIds(folderId))
  };
}
