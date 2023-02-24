import { useDoRequest } from '../../../../Hooks/useDoRequest';
import { FolderModel } from '../../../../models/folder/FolderModel';
import { FolderRequests } from '../../../../requests/folder/FolderRequests';
import { useCallback } from 'react';

export function useGetFoldersFormDb() {
  const [, loading, , doGetFolders] = useDoRequest<FolderModel[]>([]);

  const getFoldersFromDb = useCallback(
    (inicializeFolders: (folders: FolderModel[]) => any) => {
      doGetFolders(() =>
        FolderRequests.getFolders().then((folders) =>
          inicializeFolders(folders)
        )
      );
    },
    [loading]
  );

  return { getFoldersFromDb, loading };
}
