import { AnnotationModel } from '../../../models/annotation/AnnotationModel';
import { ContentSearchResult } from '../../../models/ContentSearchResult';
import moment, { Moment } from 'moment';

export class ContentAnnotations {
  mostRecentAnnotation: Moment = moment(new Date(1970, 2, 1));

  annotations: AnnotationModel[] = [];

  constructor(public content: ContentSearchResult) {}

  addAnnotation(annotation: AnnotationModel) {
    if (this.mostRecentAnnotation.isBefore(annotation.createdAt)) {
      this.mostRecentAnnotation = annotation.createdAt;
    }

    this.annotations.push(annotation);
  }
}
