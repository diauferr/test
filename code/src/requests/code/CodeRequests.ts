import { RequestUtil } from '../../util/RequestUtil';

export class CodeRequests {
  public static async postLogCode(codeId: number) {
    return RequestUtil.createPostRequest(
      `api/code/postLogViewCode/${codeId}`
    )();
  }
}
