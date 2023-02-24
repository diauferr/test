import { FolderContentModel } from './FolderContentModel';
import { ContentSearchResult } from '../ContentSearchResult';
import { ContentType } from '../../enums/ContentType';

export class FolderModel {
  static Empty = new FolderModel('', '', []);

  public get owner(): string {
    if (!this.associatedUsers || this.associatedUsers.length === 0) {
      return '';
    }

    return this.associatedUsers[0].email;
  }

  constructor(
    public id: string,
    public name: string,
    public associatedUsers: {
      name: string;
      email: string;
    }[],
    public contents: FolderContentModel[] = [],
    public lastContentInclusion = 0
  ) {}

  isContentAlreadyIncluded(result: ContentSearchResult) {
    return this.contents.some(
      (c) =>
        c.result.contentType === result.contentType &&
        c.result.title === result.title
    );
  }

  removeContent(contentType: ContentType, title: string) {
    this.contents = this.contents.filter(
      (c) => c.result.contentType !== contentType || c.result.title !== title
    );
  }
}
