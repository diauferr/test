import { message } from 'antd';
import { useDoRequest } from '../../../../Hooks/useDoRequest';
import { useEffectIfNotNull } from '../../../../Hooks/useEffectIfNotNull';
import { FolderRequests } from '../../../../requests/folder/FolderRequests';
import { FolderModalState } from '../context/FolderModalState';
import { ContentSearchResult } from '../../../../models/ContentSearchResult';

export function useAddContentToFolder(
  setSuccessFolderIds: (lastClickedFolderId: string) => any,
  folderModalState: FolderModalState
) {
  const [
    awaitingAddingContentResult,
    awaitingAddingContent,
    errorAddingContent,
    doAddContentToFolder
  ] = useDoRequest<any>();

  useEffectIfNotNull(() => {
    // se adicionou conteudo com sucesso, altera o array de pastas que tiveram adicao de conteudo com sucesso.
    if (awaitingAddingContentResult.status === 200) {
      setSuccessFolderIds(folderModalState.lastClickedFolderId);
    }
  }, [awaitingAddingContentResult]);

  useEffectIfNotNull(() => {
    message.error(
      'Ocorreu um erro ao tentar adicionar este conteúdo na pasta.'
    );
  }, [errorAddingContent]);

  const addContentToFolder = (
    folderId: string,
    result: ContentSearchResult
  ) => {
    doAddContentToFolder(() =>
      FolderRequests.addContentToFolder(folderId, result)
    );
  };

  return { addContentToFolder, awaitingAddingContent };
}
