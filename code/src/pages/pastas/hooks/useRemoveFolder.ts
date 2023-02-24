import { useDoRequest } from '../../../Hooks/useDoRequest';
import { FolderRequests } from '../../../requests/folder/FolderRequests';
import { useFolderContext } from './useFolderContext';
import { useCallback } from 'react';

export function useRemoveFolder(callback = () => null) {
  const ctx = useFolderContext();
  const [, loading, , doRequest] = useDoRequest<any>(null);

  const removeFolder = useCallback(
    (folderId: string) => {
      if (loading) return;

      doRequest(() =>
        FolderRequests.removeFolder(folderId).then(() => {
          ctx.removeFolder(folderId);
          callback();
        })
      );
    },
    [loading]
  );

  return [removeFolder, loading] as [(folderId: string) => any, boolean];
}
