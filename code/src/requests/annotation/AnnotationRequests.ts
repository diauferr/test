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

import { SaveContentAnnotationDto } from './DTOs/SaveContentAnnotationDto';
import { RequestUtil } from '../../util/RequestUtil';
import { GetUserContentAnnotationsDto } from './DTOs/GetUserContentAnnotationsDto';
import { AnnotationModel } from '../../models/annotation/AnnotationModel';
import { GetUserAnnotationsDto } from './DTOs/GetUserAnnotationsDto';

export class AnnotationRequests {
  static BaseUrl = `api/annotations`;

  static saveAnnotation(dto: SaveContentAnnotationDto) {
    return RequestUtil.createPostRequest(this.BaseUrl, dto)();
  }

  static removeAnnotation(annotationId: string) {
    return RequestUtil.createDeleteRequest(`${this.BaseUrl}/${annotationId}`)();
  }

  static async getUserContentAnnotations(
    contentId: number,
    contentType: number
  ) {
    const result = await RequestUtil.createGetRequest(
      `${this.BaseUrl}/content`,
      new GetUserContentAnnotationsDto(contentId, contentType)
    )();

    return result.data as AnnotationModel[];
  }

  static async getUserAnnotations(page: number, words = '') {
    if (!page) return;

    const result = await RequestUtil.createGetRequest(
      `${this.BaseUrl}/${page}`,
      {
        words
      }
    )();

    return new GetUserAnnotationsDto(
      result.data.total,
      result.data.annotations.map((a: AnnotationModel, index: number) =>
        !!result.data.highlight
          ? new AnnotationModel(
              a.id,
              a.type,
              !!result.data.highlight[index]
                ? result.data.highlight[index].text
                : a.text,
              a.json,
              a.createdAt,
              a.content
            )
          : new AnnotationModel(
              a.id,
              a.type,
              a.text,
              a.json,
              a.createdAt,
              a.content
            )
      )
    );
  }
}
