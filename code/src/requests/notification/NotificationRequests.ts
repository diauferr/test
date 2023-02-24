import { RequestUtil } from '../../util/RequestUtil';

export class NotificationRequests {
  public static async deleteNotification(notificationId: string) {
    return RequestUtil.createDeleteRequest(
      `api/notification/${notificationId}`
    )();
  }

  public static async getNotifications() {
    const result = await RequestUtil.createGetRequest(`api/notification`)();

    return result.data.map((n: any) => ({
      ...n,
      createdAt: n.createdAt * 1000,
      content: JSON.parse(n.content)
    }));
  }
}
