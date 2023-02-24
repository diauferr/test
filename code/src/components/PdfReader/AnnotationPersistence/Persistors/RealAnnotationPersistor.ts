/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import moment, { Moment } from 'moment';
import { ContentSearchResult } from '../../../../models/ContentSearchResult';
import { AnnotationRequests } from '../../../../requests/annotation/AnnotationRequests';
import { Annotation } from '../../Models/Annotation';
import { SaveContentAnnotationDto } from '../../../../requests/annotation/DTOs/SaveContentAnnotationDto';
import { AnnotationModel } from '../../../../models/annotation/AnnotationModel';
import { IPersistor } from '../IPersistor';
import { AnnotationType } from '../AnnotationType';
import _ from 'lodash';

export class RealAnnotationPersistor implements IPersistor {
  private lastSavedAt: Moment = moment(new Date());

  constructor(
    private pspdfkitInstance: any,
    private pdfUrl,
    private result: ContentSearchResult
  ) {}

  save = async (instantJSON: string, selectedText: string) => {
    const annotation = InstantJsonParser.parse(instantJSON).filter((a) =>
      a.updatedAt.isAfter(this.lastSavedAt)
    )[0];

    if (!annotation) return;

    const textExtractor = new AnnotationTextExtractor(selectedText);
    annotation.text = await textExtractor.extractFrom(annotation);

    AnnotationRequests.saveAnnotation(
      new SaveContentAnnotationDto(
        this.result,
        this.pdfUrl,
        new AnnotationModel(
          annotation.id,
          `${annotation.type}`,
          `${annotation.text}`,
          annotation.json,
          moment(new Date()).format('yyyy-mm-dd')
        )
      )
    )
      .then(() => {
        this.lastSavedAt = moment(new Date());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  remove = (annotations: any) => {
    annotations
      .toArray()
      .map((a) => a.toJS())
      .forEach((a) => {
        AnnotationRequests.removeAnnotation(a.id).catch(console.error);
      });
  };
}

class AnnotationTextExtractor {
  constructor(private readonly selectedText: string) {}

  extractFrom(annotation: AnnotationModel) {
    switch (annotation.type) {
      case AnnotationType.SQUIGGLY:
      case AnnotationType.STRIKEOUT:
      case AnnotationType.MARKUP:
      case AnnotationType.UNDERLINE:
        return this.selectedText;

      case AnnotationType.NOTE:
      case AnnotationType.TEXT:
        return _.get(annotation, 'originalObject.text', '');

      default:
        return '';
    }
  }
}

class InstantJsonParser {
  static parse(instantJSON: any) {
    if (!instantJSON) return [];

    if (!instantJSON.annotations) return [];

    return instantJSON.annotations
      .filter((a) => a.description !== 'watermark')
      .map((a: any) => new Annotation(a));
  }
}
