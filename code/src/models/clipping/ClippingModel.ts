export class ClippingModel {
  static Empty = new ClippingModel('', '', '', false, {});

  constructor(
    public id: string,
    public name: string,
    public sapCode: string,
    public monthly: boolean,
    public metadata: any
  ) {}
}
