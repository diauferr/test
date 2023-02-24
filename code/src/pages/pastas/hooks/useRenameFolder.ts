import { useDoRequest } from '../../../Hooks/useDoRequest';
import { FolderRequests } from '../../../requests/folder/FolderRequests';
import { useFolderContext } from './useFolderContext';
import { useCallback } from 'react';
import { FolderModel } from '../../../models/folder/FolderModel';

export function useRenameFolder(callback = () => null) {
  const ctx = useFolderContext();
  const [, loading, , doRequest] = useDoRequest<any>(null);

  const renameFolder = useCallback(
    (folderId: string, newName: string) => {
      if (loading) return;

      doRequest(() =>
        FolderRequests.renameFolder(folderId, newName).then(
          (folder: FolderModel) => {
            ctx.renameFolder(folder);
            callback();
          }
        )
      );
    },
    [loading]
  );

  return [renameFolder, loading] as [
    (folderId: string, newName: string) => any,
    boolean
  ];
}
