import { ContentType } from '../enums/ContentType';
import { ArticleType } from '../pages/pesquisa/enums/ArticleType';

export class ContentSearchResult {
  static Empty = new ContentSearchResult(
    ContentType.BOOK,
    0,
    '',
    '',
    '',
    [],
    0,
    0,
    '',
    '',
    0,
    null,
    '',
    undefined,
    undefined,
    undefined
  );

  constructor(
    public contentType: ContentType,
    public id: number,
    public title: string,
    public subTitle: string,
    public text: string,
    public tags: any[] = [],
    public editionId?: number,
    public parentId?: number,
    public img?: string,
    public author?: string,
    public total?: number,
    public formattedDate?: string,
    public relevantWords: string = '',
    public articleType?: ArticleType,
    public areasInterest?: string,
    public url?: string
  ) {}
}
