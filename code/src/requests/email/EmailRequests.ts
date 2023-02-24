import { ContentSearchResult } from '../../models/ContentSearchResult';
import { RequestUtil } from '../../util/RequestUtil';

export class EmailRequests {
  public static async shareContentByEmail(
    contentLink: string,
    result: ContentSearchResult,
    emails: string[]
  ) {
    const apiResult = await RequestUtil.createPostRequest(
      'api/content/share/email',
      {
        contentLink,
        result,
        to: emails
      }
    )();

    return apiResult;
  }
}
