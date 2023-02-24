import { FolderContextState } from './FolderContextState';
import { FolderModel } from '../../../models/folder/FolderModel';
import { ContentType } from '../../../enums/ContentType';

const SET_CURRENT_ID = 'SET_CURRENT_ID';
export const setCurrentFolderId = (folderId: string) => ({
  type: SET_CURRENT_ID,
  payload: folderId
});

const FOLDER_CREATED = 'FOLDER_CREATED';
export const addNewFolder = (folder: FolderModel) => ({
  type: FOLDER_CREATED,
  payload: folder
});

const FOLDER_RENAMED = 'FOLDER_RENAMED';
export const renameFolder = (folder: FolderModel) => ({
  type: FOLDER_RENAMED,
  payload: folder
});

const FOLDER_REMOVED = 'FOLDER_REMOVED';
export const removeFolder = (folderId: string) => ({
  type: FOLDER_REMOVED,
  payload: folderId
});

const CONTENT_REMOVED = 'CONTENT_REMOVED';
export const removeContentFromFolder = (
  folderId: string,
  contentType: ContentType,
  title: string
) => ({
  type: CONTENT_REMOVED,
  payload: { folderId, contentType, title }
});

export function folderReducer(
  state: FolderContextState,
  { type, payload }: any
) {
  switch (type) {
    case 'getFoldersRequest':
      return state.setFolderRequest(payload);

    case SET_CURRENT_ID:
      return state.setCurrentFolderId(payload);

    case FOLDER_CREATED:
      return state.addFolder(payload);

    case FOLDER_RENAMED:
      return state.updateFolder(payload);

    case FOLDER_REMOVED:
      return state.removeFolder(payload);

    case CONTENT_REMOVED:
      return state.removeContentFromFolder(
        payload.folderId,
        payload.contentType,
        payload.title
      );

    case 'updateAssociatedUsers':
      return state.updateAssociatedUsers(payload.folderId, payload.userEmail);

    default:
      return state;
  }
}
