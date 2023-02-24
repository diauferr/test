import { FolderModel } from '../../../../models/folder/FolderModel';

export class FolderModalState {
  constructor(
    public folders: FolderModel[] = [],
    public lastClickedFolderId = '',
    public successFolderIds = []
  ) {}

  inicializeFolders(folders: FolderModel[]) {
    this.folders = folders;

    return this.clone();
  }

  addNewFolder(folder: FolderModel) {
    this.folders.push(folder);

    return this.clone();
  }

  setLastClickedFolderId(folderId: string) {
    this.lastClickedFolderId = folderId;

    return this.clone();
  }

  setSuccessFolderIds(folderId: string) {
    this.successFolderIds.push(folderId);

    return this.clone();
  }

  private clone() {
    return new FolderModalState(
      this.folders,
      this.lastClickedFolderId,
      this.successFolderIds
    );
  }
}
