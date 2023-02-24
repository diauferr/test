import moment, { Moment } from 'moment';
import { AnnotationType } from '../AnnotationPersistence/AnnotationType';

export class Annotation {
  public id: string;

  public type: AnnotationType;

  public pageIndex: number;

  public updatedAt: Moment;

  public text: string = '';

  public json: string;

  public originalObject: any;

  constructor(asObject: any) {
    this.id = asObject.id;
    this.updatedAt = moment(asObject.updatedAt);
    this.json = JSON.stringify(asObject);
    this.originalObject = asObject;
    this.pageIndex = asObject.pageIndex;
    this.type = asObject.type;
  }
}
