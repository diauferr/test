import React from 'react';
import { DefaultListItem } from '../DefaultListItem/DefaultListItem';
import { IAnnotationListItemProps } from './IAnnotationListItemProps';
import { AnnotationType } from '../PdfReader/AnnotationPersistence/AnnotationType';

export const ShapeAnnotationListItem = ({
  onClick,
  annotation
}: IAnnotationListItemProps) => {
  function getAnnotationInfo(type: any) {
    switch (type) {
      case AnnotationType.LINE:
        return ['line-draw.svg', 'Linha'];
      default:
        return ['brush.svg', 'Desenho'];
    }
  }

  const [icon, text] = getAnnotationInfo(annotation.type);

  return (
    <DefaultListItem
      onClick={() => onClick(annotation)}
      border={true}
      Leading={
        <img
          src={`/assets/images/${icon}`}
          style={{ width: 40, paddingLeft: '.5rem' }}
        />
      }
      Content={<span dangerouslySetInnerHTML={{ __html: text }} />}
    />
  );
};
