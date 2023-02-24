import { AnnotationModel } from '../../../models/annotation/AnnotationModel';

export class GetUserAnnotationsDto {
  constructor(public total: number, public annotations: AnnotationModel[]) {}
}
