import React from 'react';
import { ITagsRendererProps } from './ITagsRendererProps';
import { ContentTypeTag } from './ContentTypeTag';
import { TagsContainer } from './TagsContainer';

export const DefaultTagsRenderer = ({ tags }: ITagsRendererProps) =>
  !!tags &&
  tags.length > 0 && (
    <TagsContainer>
      {tags.map(({ text }) => (
        <ContentTypeTag key={text}>{text}</ContentTypeTag>
      ))}
    </TagsContainer>
  );
