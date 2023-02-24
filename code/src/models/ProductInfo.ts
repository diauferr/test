import { ProductType } from '../enums/ProductType';

export class ProductInfo {
  constructor(
    public type: ProductType,
    public title: string,
    public GroupCode: number
  ) {}
}
