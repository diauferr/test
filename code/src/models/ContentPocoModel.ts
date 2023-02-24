import { ContentType } from '../enums/ContentType';
import { ArticleType } from '../pages/pesquisa/enums/ArticleType';

export class ContentPoco<T> {
  static DateFormat = 'YYYY-MM-DD HH:mm:ss';

  id: string;

  parentId: string;

  editionId: string;

  isbn: string;

  publishDate: string;

  text: string;

  text2: string;

  text3: string;

  title: string;

  author: string[];

  tags: string[];

  areasInterest: string[];

  createdAt: string;

  subTitle: string;

  lastModified: string;

  contentType: ContentType;

  published: boolean;

  articleType: ArticleType;

  metadata: T;
}
