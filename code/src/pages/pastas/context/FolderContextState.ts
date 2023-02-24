import { RequestProgressInfo } from '../../../models/RequestProgressInfo';
import { FolderModel } from '../../../models/folder/FolderModel';
import { ContentType } from '../../../enums/ContentType';

export class FolderContextState {
  constructor(
    public getFoldersRequest = new RequestProgressInfo<FolderModel[]>(
      null,
      true
    ),
    public currentFolderId: string = '',
    public currentFolder = FolderModel.Empty,
    public folders: FolderModel[] = []
  ) {}

  addFolder(folder: FolderModel) {
    this.folders.push(folder);
    return this.clone();
  }

  updateFolder(folder: FolderModel) {
    const newState = this.removeFolder(folder.id).addFolder(folder);
    newState.currentFolder = folder;
    return newState;
  }

  removeFolder(folderId: string) {
    this.folders = this.folders.filter((f) => f.id !== folderId);
    return this.clone();
  }

  setCurrentFolderId(folderId: string) {
    this.currentFolderId = folderId;
    this.currentFolder = this.findSelectedFolder();
    return this.clone();
  }

  setFolderRequest(request: RequestProgressInfo<FolderModel[]>) {
    this.getFoldersRequest = request;
    this.folders = request.result || [];
    this.currentFolder = this.findSelectedFolder();
    return this.clone();
  }

  removeContentFromFolder(
    folderId: string,
    contentType: ContentType,
    title: string
  ) {
    const folder = this.findFolder(folderId);
    folder.removeContent(contentType, title);
    return this.clone();
  }

  updateAssociatedUsers(folderId: string, userEmail: string) {
    const folder = this.folders.find((f) => f.id === folderId);

    folder.associatedUsers = folder.associatedUsers.filter(
      (associatedUser) => associatedUser.email !== userEmail
    );

    return this.clone();
  }

  private clone = () =>
    new FolderContextState(
      this.getFoldersRequest,
      this.currentFolderId,
      this.currentFolder,
      this.folders
    );

  private findSelectedFolder = () => this.findFolder(this.currentFolderId);

  private findFolder = (folderId: string) =>
    this.folders.find((f) => f.id === folderId) || FolderModel.Empty;
}
