import { ContentSearchResult } from '../ContentSearchResult';
import moment, { Moment } from 'moment';

export class AnnotationModel {
  public parsedAnnotation: any;

  public displayText: string;

  public createdAt: Moment;

  constructor(
    public id: string,
    public type: string,
    public text: string,
    public json: string,
    createdAt: any,
    public content?: ContentSearchResult
  ) {
    this.parsedAnnotation = JSON.parse(json);
    this.displayText = text;
    this.createdAt = moment(createdAt);
  }
}
