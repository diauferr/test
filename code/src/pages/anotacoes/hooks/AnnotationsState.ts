import { RequestProgressInfo } from '../../../models/RequestProgressInfo';
import { GetUserAnnotationsDto } from '../../../requests/annotation/DTOs/GetUserAnnotationsDto';
import { AnnotationModel } from '../../../models/annotation/AnnotationModel';
import { ContentAnnotations } from './ContentAnnotations';

export class AnnotationsState {
  public readonly total: number;

  public readonly annotations: ContentAnnotations[];

  constructor(
    // eslint-disable-next-line max-len
    public readonly requestProgress = new RequestProgressInfo<GetUserAnnotationsDto>()
  ) {
    if (requestProgress.result) {
      this.total = requestProgress.result.total;
      this.annotations = this.groupAnnotationsByContent(
        requestProgress.result.annotations
      );
    }
  }

  setRequestLoading = (loading = true) =>
    new AnnotationsState(this.requestProgress.setLoading(loading));

  setRequestError = (error: any) =>
    new AnnotationsState(this.requestProgress.setError(error));

  setRequestResult = (result: GetUserAnnotationsDto) =>
    new AnnotationsState(this.requestProgress.setResult(result));

  private groupAnnotationsByContent(
    annotations: AnnotationModel[]
  ): ContentAnnotations[] {
    const map = new Map<string, ContentAnnotations>();

    annotations.forEach((annotation) => {
      const contentKey = `${annotation.content.id}${annotation.content.contentType}`;
      if (map.get(contentKey)) {
        map.get(contentKey).addAnnotation(annotation);
      } else {
        const contentAnnotations = new ContentAnnotations(annotation.content);
        contentAnnotations.addAnnotation(annotation);
        map.set(contentKey, contentAnnotations);
      }
    });

    return Array.from(map.values()).sort(
      (content1: ContentAnnotations, content2: ContentAnnotations) =>
        content1.mostRecentAnnotation.isBefore(content2.mostRecentAnnotation)
          ? 1
          : -1
    );
  }
}
