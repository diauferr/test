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

import { RequestUtil } from '../../util/RequestUtil';
import axios from 'axios';

export class QuoteRequests {
  public static async getArticleQuote(contentId: number) {
    const result = await RequestUtil.createGetRequest(
      `api/periodic/getArticleQuote/${contentId}`
    )();

    return result.data;
  }

  public static async getBookChapterQuote(contentId: number) {
    const result = await RequestUtil.createGetRequest(
      `api/book/getBookChapterQuote/${contentId}`
    )();

    return result.data;
  }

  public static async getBookQuote(contentId: number, editionId: number) {
    const url = `https://msproduction.forumconhecimento.com.br/bid/Migration/GetCitationOfBook?idClient=1998&idBook=${contentId}&idEditionBook=${editionId}`;
    const result = await axios.get(url);

    return result.data;
  }

  public static async getPeriodicQuote(contentId: number) {
    const result = await RequestUtil.createGetRequest(
      `api/periodic/getPeriodicQuote/${contentId}`
    )();

    return result.data;
  }

  public static async getVideoQuote(contentId: number) {
    const result = await RequestUtil.createGetRequest(
      `api/video/getVideoQuote/${contentId}`
    )();

    return result.data;
  }
}
