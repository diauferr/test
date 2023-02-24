export class ClippingSearchModel {
  constructor(
    public id: string,
    public parentId: string,
    public publishDate: string,
    public highlight: any,
    public total: number
  ) {}
}
