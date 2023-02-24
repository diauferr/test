import { Moment } from 'moment';
import { ClippingSearchModel } from '../../models/clipping/ClippingSearchModel';
import { ContentPoco } from '../../models/ContentPocoModel';
import { RequestUtil } from '../../util/RequestUtil';
import { ClippingModel } from '../../models/clipping/ClippingModel';

export class ClippingRequests {
  static async createClipping(name: string, sapCode: string) {
    return RequestUtil.createPostRequest('api/clipping', {
      name,
      sapCode
    })();
  }

  static async addNewEdition(
    clippingId: string,
    html: string,
    publishDate: Moment,
    published = true
  ) {
    return RequestUtil.createPostRequest(`api/clipping/${clippingId}/edition`, {
      html,
      publishDate: publishDate.format(ContentPoco.DateFormat),
      published
    })();
  }

  static async getClippings() {
    const result = await RequestUtil.createGetRequest('api/clipping')();
    return result.data as ClippingModel[];
  }

  static async getEdition(
    clippingId: string,
    year: string,
    month: string,
    day?: string
  ) {
    let url = `api/clipping/${clippingId}/edition/${year}/${month}`;

    if (day) url += `/${day}`;

    const result = await RequestUtil.createGetRequest(url)();

    return result.data;
  }

  static async getLastEditionOf(clippingId: string) {
    const result = await RequestUtil.createGetRequest(
      `api/clipping/${clippingId}/edition/last`
    )();

    return result.data;
  }

  static async clippingSearch(page: number, words: string, clippingId: string) {
    const result = await RequestUtil.createGetRequest(
      'api/clipping/clippingSearch',
      {
        page,
        words,
        clippingId
      }
    )();

    return (
      result.status !== 204 &&
      result.data.clipping.map(
        (item: ClippingSearchModel, index: number) =>
          new ClippingSearchModel(
            item.id,
            item.parentId,
            item.publishDate,
            result.data.highlight[index].text,
            result.data.total
          )
      )
    );
  }
}
