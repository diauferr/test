import { useDoRequest } from '../../../Hooks/useDoRequest';
import { FolderRequests } from '../../../requests/folder/FolderRequests';
import { useFolderContext } from './useFolderContext';
import { useCallback } from 'react';
import { FolderModel } from '../../../models/folder/FolderModel';

export function useCreateFolder(callback = () => null) {
  const ctx = useFolderContext();
  const [, loading, , doRequest] = useDoRequest<any>(null);

  const createFolder = useCallback(
    (folderName: string) => {
      if (loading) return;

      doRequest(() =>
        FolderRequests.createNewFolder(folderName).then(
          (folder: FolderModel) => {
            ctx.addNewFolder(folder);
            callback();
          }
        )
      );
    },
    [loading]
  );

  return [createFolder, loading] as [(folderName: string) => any, boolean];
}
