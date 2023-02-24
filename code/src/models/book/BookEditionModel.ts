export class BookEditionModel {
  editionDate: number;

  constructor(
    public id: number,
    public title: string,
    public subtitle: string,
    public image: string,
    public description: string,
    public cdd: string,
    public cdu: string,
    public numberOfPages: number,
    public isbn: string,
    public year: number,
    public serie: string,
    public author: string,
    public editionId: number,
    public editionNumber: number,
    public areasInterest: string,
    public status: number,
    public yearExibition: string
  ) {
    this.editionDate = year;
  }
}
