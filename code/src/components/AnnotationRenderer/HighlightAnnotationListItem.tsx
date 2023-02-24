import React from 'react';
import { DefaultListItem } from '../DefaultListItem/DefaultListItem';
import styled from 'styled-components';
import { IAnnotationListItemProps } from './IAnnotationListItemProps';

const Quote = styled.q`
  span {
    background: rgba(255, 255, 0, 0.35);
  }
`;

export const HightlightAnnotationListItem = ({
  onClick,
  annotation
}: IAnnotationListItemProps) => (
  <DefaultListItem
    onClick={() => onClick(annotation)}
    border={true}
    Content={
      <Quote>
        <span dangerouslySetInnerHTML={{ __html: annotation.displayText }} />
      </Quote>
    }
  />
);
