/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { BookEditionChapterModel } from '../../models/book/BookEditionChapterModel';
import { BookEditionModel } from '../../models/book/BookEditionModel';
import { ChapterTypes } from '../../pages/livro/enums/ChapterTypes';
import { http_client } from '../../util/http_client';
import { RequestUtil } from '../../util/RequestUtil';

export class BookRequests {
  static async getBookEditions(bookId: number) {
    const searchUrl = `${process.env.REACT_APP_SEARCH_API}/book`;

    const result = await http_client.get<any>(`${searchUrl}/${bookId}`);

    if (result.status === 204) {
      return result.status;
    }

    return result.data.map(
      (item: BookEditionModel) =>
        new BookEditionModel(
          item.id,
          item.title,
          item.subtitle,
          item.image,
          item.description,
          item.cdd,
          item.cdu,
          item.numberOfPages,
          item.isbn,
          item.year,
          item.serie,
          item.author,
          item.editionId,
          item.editionNumber,
          item.areasInterest,
          result.status,
          item.yearExibition
        )
    );
  }

  static async getEditionChapters(editionId: number) {
    const searchUrl = `${process.env.REACT_APP_SEARCH_API}/book`;

    const result = await http_client.get<ChapterDto[]>(
      `${searchUrl}/edition/${editionId}/chapters`
    );

    if (result.status === 204) {
      return result.status;
    }

    return result.data
      .map(
        (item: any) =>
          new BookEditionChapterModel(
            item.id,
            item.title,
            item.author,
            this.GetChapterType(item.type),
            item.pdfName,
            item.titlePresentation
          )
      )
      .sort((a: BookEditionChapterModel, b: BookEditionChapterModel) =>
        a.subtitle === 'Pré textual' && b.subtitle !== 'Pré textual' ? 1 : -1
      )
      .sort((a: BookEditionChapterModel, b: BookEditionChapterModel) =>
        a.subtitle === 'Pós textual' && b.subtitle !== 'Pós textual' ? 1 : -1
      );
  }

  static async postLogChapter(chapterId: number) {
    return RequestUtil.createPostRequest(
      `api/book/postLogViewChapter/${chapterId}`
    )();
  }

  private static GetChapterType(chapterType: number) {
    switch (chapterType) {
      case ChapterTypes.PRE_TEXTUAL:
        return 'Pré textual';
      case ChapterTypes.CAPITULO:
        return 'Capítulo';
      case ChapterTypes.POS_TEXTUAL:
        return 'Pós textual';
    }
  }
}

type ChapterDto = {
  id: number;
  pdfName: string;
  title: string;
  type: number;
  subType: number;
  sumaryID: number;
  coordinatorWork: string;
  author: string;
  titlePresentation: string;
};
