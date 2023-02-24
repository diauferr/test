import { ContentType } from '../../../enums/ContentType';
import { ISubtitleSuffixRendererProps } from './ISubtitleSuffixRendererProps';
import { DefaultSubtitleSuffixRenderer } from './DefaultSubtitleSuffixRenderer';
import { EmptySubtitleSuffixRenderer } from './EmptySubtitleSuffixRenderer';

export class SubtitleSuffixRendererFactory {
  static Create(
    contentType: ContentType
  ): (props: ISubtitleSuffixRendererProps) => any {
    switch (contentType) {
      case ContentType.CODE_ITEM:
      case ContentType.CODE:
        return EmptySubtitleSuffixRenderer;
      default:
        return DefaultSubtitleSuffixRenderer;
    }
  }
}
