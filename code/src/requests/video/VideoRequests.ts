import { VideoModel } from '../../models/video/VideoModel';
import { RequestUtil } from '../../util/RequestUtil';

export class VideoRequests {
  public static async getRelatedVideos(videoId: number) {
    const result = await RequestUtil.createGetRequest(
      `api/video/relatedVideos/${videoId}`
    )();

    return result.data.map(
      (video: VideoModel) =>
        new VideoModel(
          video.id,
          null,
          video.img,
          video.title,
          null,
          video.speakers
        )
    );
  }

  public static async getVideoAuthenticatedFromS3(videoUrl: string) {
    const params = {
      key: videoUrl,
      bucketName: 'efbidvideos'
    };
    const result = await RequestUtil.createGetRequest(
      `api/getPreSignedUrl`,
      params
    )();

    return result.data;
  }

  public static async getVideos(videoId: number) {
    const result = await RequestUtil.createGetRequest(`api/video/${videoId}`)();

    if (result.status === 204) {
      return result.status;
    }

    return new VideoModel(
      result.data.id,
      result.data.uri,
      result.data.img,
      result.data.title,
      result.data.description,
      result.data.speakers,
      result.data.eventName,
      result.data.eventDate,
      result.data.eventLocation,
      result.data.initials,
      result.data.year,
      result.data.serie
    );
  }
}
