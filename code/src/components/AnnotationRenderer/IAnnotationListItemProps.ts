import { AnnotationModel } from '../../models/annotation/AnnotationModel';

export interface IAnnotationListItemProps {
  annotation: AnnotationModel;
  style: object;
  onClick: (annotation: AnnotationModel) => any;
}
