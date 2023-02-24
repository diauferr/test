import { ContentSearchResult } from '../ContentSearchResult';

export class FolderContentModel {
  constructor(
    public dateIncluded: number,
    public result: ContentSearchResult
  ) {}
}
