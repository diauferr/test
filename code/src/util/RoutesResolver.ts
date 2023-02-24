import { ContentSearchResult } from '../models/ContentSearchResult';
import { ContentType } from '../enums/ContentType';

export class RoutesResolver {
  static getContentRoute(result: ContentSearchResult) {
    switch (result.contentType) {
      case ContentType.BOOK:
        if (result.editionId) return `/livro/${result.id}/${result.editionId}`;

        return `/livro/${result.id}`;

      case ContentType.CHAPTER:
        return `/livro/${result.parentId}/${result.editionId}/${result.id}?searchpage=1&keywords=${result.relevantWords}`;

      case ContentType.ARTICLE:
        return `/periodico/${result.parentId}/${result.editionId}/${result.id}`;

      case ContentType.PERIODIC:
        if (result.editionId)
          return `/periodico/${result.id}/${result.editionId}`;

        return `/periodico/${result.id}`;

      case ContentType.VIDEO:
        return `/video/${result.id}`;

      case ContentType.LEGISLATION:
        if (result.editionId)
          return `/legislacao-comentada/${result.id}/${result.editionId}`;

        return `/legislacao-comentada/${result.id}`;

      default:
        return '';
    }
  }
}
