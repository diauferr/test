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
// TODO: remover mocked data
import { mockedArticlesData, mockedLegislationData } from './mockedData';

export class LegislationRequests {
  static async getLegislationEditions(bookId: number) {
    const searchUrl = `${process.env.REACT_APP_CONTENT_BOOK_API}/books`;

    const result = await http_client.get<any>(`${searchUrl}/${bookId}`);

    if (result.status === 204) {
      return result.status;
    }

    const editions = await http_client.get<any>(
      `${searchUrl}/${bookId}/editions`
    );

    const edition: any =
      editions && editions.data && editions.data[0] ? editions.data[0] : {};

    let data: any = mockedLegislationData;
    if (result && result.data && result.data.num_id) {
      const bookSerie: any = result.data.book_serie.length
        ? result.data.book_serie[0]
        : {};
      const author: any = edition.authors.length ? edition.authors[0] : {};
      const tags: any = result.data.tags.length ? result.data.tags : [];
      const areaInterest: any = tags.find((t) =>
        t.id.includes('area-interest')
      );

      data = [
        {
          id: result.data.num_id || 0,
          title: result.data.title || '',
          subtitle: '',
          image: `/books/cover/${bookId}/editions/${
            edition && edition.num_id ? edition.num_id : 0
          }.jpg`,
          img: `/books/cover/${bookId}/editions/${
            edition && edition.num_id ? edition.num_id : 0
          }.jpg`,
          description: edition.description || '',
          cdd: result.data.cdd || '',
          cdu: result.data.cdu || '',
          numberOfPages: edition.pages || 0,
          isbn: edition.isbn || '',
          year: 2022,
          serie: bookSerie.title || '',
          author: author.title || '',
          editionId: edition.num_id || 0,
          editionNumber: edition.number || 1,
          editionDate: '',
          areasInterest: areaInterest.title || '',
          yearExibition: '2022'
        }
      ];
    }

    return data.map(
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

  static async getEditionChapters(bookId: number, editionId: number) {
    const searchUrl = `${process.env.REACT_APP_CONTENT_BOOK_API}/books/${bookId}`;

    const result = await http_client.get<ChapterDto[]>(
      `${searchUrl}/editions/${editionId}/chapters`
    );

    if (result.status === 204) {
      return result.status;
    }

    let data: any = mockedArticlesData;
    if (result.data.length) {
      data = result.data.map((c: any) => ({
        id: c.num_id || 0,
        pdfName: c.pdf || '',
        Title: c.title || '',
        type: this.GetChapterTypeNumber(c.chapter_type || ''),
        subType: 1,
        sumaryID: 0,
        coordinatorWork: 'False',
        author: '',
        titlePresentation: '',
        title: c.title || ''
      }));
    }

    return data
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
        return 'Artigos';
      case ChapterTypes.POS_TEXTUAL:
        return 'Pós textual';
    }
  }

  private static GetChapterTypeNumber(chapterType: string) {
    switch (chapterType) {
      case 'pre-textual':
        return ChapterTypes.PRE_TEXTUAL;
      case 'capitulo':
        return ChapterTypes.CAPITULO;
      case 'pos-textual':
        return ChapterTypes.POS_TEXTUAL;
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
