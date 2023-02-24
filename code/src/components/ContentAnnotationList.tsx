// /* eslint-disable array-callback-return */
// /* eslint-disable eqeqeq */
// /* eslint-disable indent */
// /* eslint-disable no-console */
// /* eslint-disable no-unused-vars */
// /* eslint-disable prefer-destructuring */
// /* eslint-disable prettier/prettier */
// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/default-param-last */
// /* eslint-disable @typescript-eslint/naming-convention */
// /* eslint-disable @typescript-eslint/no-throw-literal */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-use-before-define */

import React from 'react';
import { AnnotationModel } from '../models/annotation/AnnotationModel';
import { AnnotationListItemRenderer } from './AnnotationRenderer/AnnotationListItemRenderer';

interface IProps {
  annotations: AnnotationModel[];
}

export const ContentAnnotationList = ({ annotations }: IProps) => (
  <ul>
    {annotations.map((a) => (
      // @ts-ignore
      <AnnotationListItemRenderer annotation={a} key={a.id} />
    ))}
  </ul>
);
