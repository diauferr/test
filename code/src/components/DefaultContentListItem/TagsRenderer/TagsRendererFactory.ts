import { ContentType } from '../../../enums/ContentType';
import { ITagsRendererProps } from './ITagsRendererProps';
import { DefaultTagsRenderer } from './DefaultTagsRenderer';

export class TagsRendererFactory {
  static Create(contentType: ContentType): (props: ITagsRendererProps) => any {
    switch (contentType) {
      default:
        return DefaultTagsRenderer;
    }
  }
}
