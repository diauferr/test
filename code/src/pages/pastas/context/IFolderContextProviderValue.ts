import { FolderContextState } from './FolderContextState';
import { FolderModel } from '../../../models/folder/FolderModel';
import { ContentType } from '../../../enums/ContentType';

export interface IFolderContextProviderValue {
  state: FolderContextState;
  setCurrentFolderId: (folderId: string) => any;
  addNewFolder: (folder: FolderModel) => any;
  renameFolder: (folder: FolderModel) => any;
  removeFolder: (folderId: string) => any;
  getFoldersFromApi: () => any;
  removeContentFromFolder: (
    folderId: string,
    contentType: ContentType,
    title: string
  ) => any;
  updateAssociatedUsers: (folderId: string, userEmail: string) => any;
}
