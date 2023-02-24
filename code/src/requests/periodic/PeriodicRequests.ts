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

import { PeriodicEditionArticle } from '../../models/periodic/PeriodicEditionArticle';
import { PeriodicEditionModel } from '../../models/periodic/PeriodicEditionModel';
import { PeriodicInfoModel } from '../../models/periodic/PeriodicInfoModel';
import { http_client } from '../../util/http_client';
import { RequestUtil } from '../../util/RequestUtil';

export class PeriodicRequests {
  public static async getPeriodicEditionArticles(editionId: number) {
    const searchUrl = `${process.env.REACT_APP_SEARCH_API}/periodic/edition`;
    const result = await http_client.get<PeriodicArticleDto[]>(
      `${searchUrl}/${editionId}/articles`
    );

    const returnArray = result.data.map(
      (item) =>
        new PeriodicEditionArticle(
          item.id,
          item.title,
          item.type,
          item.author,
          item.pdfName
        )
    );

    return returnArray;
  }

  public static async getPeriodicEditions(periodicId: number) {
    const searchUrl = `${process.env.REACT_APP_SEARCH_API}/periodic`;

    const result = await http_client.get<PeriodicEditionDto[]>(
      `${searchUrl}/${periodicId}/editions`
    );

    const returnArray = result.data.map(
      (item) =>
        new PeriodicEditionModel(
          item.id,
          item.editionNumber,
          item.editionDate,
          item.ano
        )
    );

    return returnArray;
  }

  public static async getPeriodicInfo(periodicId: number) {
    const searchUrl = `${process.env.REACT_APP_SEARCH_API}/periodic`;

    const result = await http_client.get<PeriodicDto[]>(
      `${searchUrl}/${periodicId}`
    );

    const [periodic] = result.data;

    return new PeriodicInfoModel(
      periodic.id,
      periodic.sigla,
      periodic.title,
      periodic.image,
      periodic.description,
      periodic.cdd,
      periodic.cdu,
      periodic.issn,
      periodic.periodicity,
      periodic.doutrinas,
      periodic.jurisprudencias,
      periodic.expedientePdf,
      periodic.normasPdf,
      periodic.qualis,
      `${periodic.type}`,
      periodic.formattedDate
    );
  }

  public static async postLogArticle(articleId: number) {
    return RequestUtil.createPostRequest(
      `api/periodic/postLogViewArticle/${articleId}`
    )();
  }

  public static async saveArticleAnnotations(
    pdfName: string,
    annotationsJson: string,
    periodicTitle: string,
    periodicId: number,
    editionTitle: string,
    editionId: number,
    articleTitle: string,
    articleId: number
  ) {
    return RequestUtil.createPutRequest(
      `api/reading/periodic/${periodicId}/${editionId}/${articleId}/annotations`,
      {
        pdfName,
        annotationsJson: JSON.stringify(annotationsJson),
        periodicTitle,
        editionTitle,
        articleTitle
      }
    )();
  }
}

type PeriodicEditionDto = {
  id: number;
  idPeriodic: number;
  ano: string;
  mes: string;
  periodicidad: number;
  editionNumber: string;
  editionDate: string;
  areas: string;
};

type PeriodicDto = {
  id: number;
  sigla: string;
  title: string;
  image: string;
  description: string;
  cdd: string;
  cdu: string;
  issn: string;
  periodicity: string;
  doutrinas: number;
  jurisprudencias: number;
  expedientePdf: string;
  normasPdf: string;
  qualis: string;
  type: number;
  formattedDate: string;
  tendenciasJurisprudenciais: number;
  imgQualis: string;
};

type PeriodicArticleDto = {
  id: number;
  type: string;
  title: string;
  author: string;
  pdfName: string;
};
