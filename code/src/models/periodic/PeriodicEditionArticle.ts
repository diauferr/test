import { ArticleType } from '../../pages/pesquisa/enums/ArticleType';

export class PeriodicEditionArticle {
  public articleType: ArticleType;

  constructor(
    public id: number,
    public title: string,
    type: string,
    public author: string,
    public pdfName: string
  ) {
    if (type === 'Doutrina') {
      this.articleType = ArticleType.DOUTRINA;
    } else if (
      type === 'JurisprudĂȘncia' ||
      type === 'TendĂȘncias Jurisprudenciais'
    ) {
      this.articleType = ArticleType.JURISPRUDENCIA;
    } else {
      this.articleType = ArticleType.TODOS;
    }
  }
}
