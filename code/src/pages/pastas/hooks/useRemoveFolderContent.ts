import { useDoRequest } from '../../../Hooks/useDoRequest';
import { FolderRequests } from '../../../requests/folder/FolderRequests';
import { useFolderContext } from './useFolderContext';
import { useCallback } from 'react';
import { ContentType } from '../../../enums/ContentType';

export function useRemoveFolderContent(callback = () => null) {
  const ctx = useFolderContext();
  const [, loading, , doRequest] = useDoRequest<any>(null);

  const removeFolderContent = useCallback(
    (folderId: string, contentType: ContentType, title: string) => {
      if (loading) return;

      doRequest(() =>
        FolderRequests.removeContentFromFolder(
          folderId,
          contentType,
          title
        ).then(() => {
          ctx.removeContentFromFolder(folderId, contentType, title);
          callback();
        })
      );
    },
    [loading]
  );

  return [removeFolderContent, loading] as [
    (folderId: string, contentType: ContentType, title: string) => any,
    boolean
  ];
}
