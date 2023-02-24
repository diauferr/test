export class BookEditionChapterModel {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public subtitle: string,
    public pdfName: string,
    public titlePresentation: string
  ) {}
}
