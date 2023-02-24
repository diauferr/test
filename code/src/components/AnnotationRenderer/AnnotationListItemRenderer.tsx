import React from 'react';
import { AnnotationModel } from '../../models/annotation/AnnotationModel';
import { AnnotationType } from '../PdfReader/AnnotationPersistence/AnnotationType';
import { HightlightAnnotationListItem } from './HighlightAnnotationListItem';
import { UnderlineAnnotationListItem } from './UnderlineAnnotationListItem';
import { IAnnotationListItemProps } from './IAnnotationListItemProps';
import { NoteAnnotationListItem } from './NoteAnnotationListItem';
import { StrikeoutAnnotationListItem } from './StrikeoutAnnotationListItem';
import { TextAnnotationListItem } from './TextAnnotationListItem';
import { RoutesResolver } from '../../util/RoutesResolver';
import { withRouter } from 'react-router';
import { ShapeAnnotationListItem } from './ShapeAnnotationListItem';

interface IProps {
  annotation: AnnotationModel;
  history: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const _AnnotationListItemRenderer = ({ history, annotation }: IProps) => {
  function getListItemComponent(annotation: AnnotationModel) {
    const props: IAnnotationListItemProps = {
      annotation,
      style: {
        height: '5rem'
      },
      onClick: () => {
        const readPageLink = RoutesResolver.getContentRoute(annotation.content);

        if (readPageLink.indexOf('?') >= 0)
          return history.push(
            `${readPageLink}&page=${annotation.parsedAnnotation.pageIndex}`
          );

        history.push(
          `${readPageLink}?page=${annotation.parsedAnnotation.pageIndex}`
        );
      }
    };

    switch (annotation.type) {
      case AnnotationType.TEXT:
        return <TextAnnotationListItem {...props} />;
      case AnnotationType.STRIKEOUT:
        return <StrikeoutAnnotationListItem {...props} />;
      case AnnotationType.MARKUP:
        return <HightlightAnnotationListItem {...props} />;
      case AnnotationType.SQUIGGLY:
        return (
          <UnderlineAnnotationListItem {...props} borderStyle={'dotted'} />
        );
      case AnnotationType.UNDERLINE:
        return <UnderlineAnnotationListItem {...props} />;
      case AnnotationType.NOTE:
        return <NoteAnnotationListItem {...props} />;
      case AnnotationType.INK:
        return <ShapeAnnotationListItem {...props} />;
      case AnnotationType.LINE:
        return <ShapeAnnotationListItem {...props} />;
      default:
        return null;
    }
  }

  return getListItemComponent(annotation);
};

export const AnnotationListItemRenderer = withRouter(
  // @ts-ignore
  _AnnotationListItemRenderer
);
