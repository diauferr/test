import React from 'react';
import { DefaultListItem } from '../DefaultListItem/DefaultListItem';
import { IAnnotationListItemProps } from './IAnnotationListItemProps';

export const NoteAnnotationListItem = ({
  onClick,
  annotation
}: IAnnotationListItemProps) => (
  <DefaultListItem
    onClick={() => onClick(annotation)}
    border={true}
    Leading={
      <img
        src={'/assets/images/post-it.svg'}
        style={{ width: 40, paddingLeft: '.5rem' }}
      />
    }
    Content={
      <span dangerouslySetInnerHTML={{ __html: annotation.displayText }} />
    }
  />
);
