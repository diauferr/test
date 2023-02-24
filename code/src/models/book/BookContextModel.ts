import { RequestProgressInfo } from '../RequestProgressInfo';
import { BookEditionModel } from './BookEditionModel';
import { BookEditionChapterModel } from './BookEditionChapterModel';

/**
 * Estrutura de dados que o contexto de livros armazena.
 *
 * @see BookContextProvider
 */
export class BookContextModel {
  bookEditionsRequest = new RequestProgressInfo<BookEditionModel[] | any>(
    null,
    true
  );

  editionChaptersRequest = new RequestProgressInfo<
    BookEditionChapterModel[] | any
  >();
}
