import { ContentSearchResult } from '../../../models/ContentSearchResult';
import { AnnotationModel } from '../../../models/annotation/AnnotationModel';

export class SaveContentAnnotationDto {
  constructor(
    public content: ContentSearchResult,
    public pdfUrl: string,
    public annotation: AnnotationModel
  ) {
    this.sanitizeContent();
  }

  private sanitizeContent() {
    this.content.total = this.content.total || undefined;
    this.content.articleType = this.content.articleType || undefined;
  }
}
