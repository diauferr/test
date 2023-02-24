import { ProductInfo } from '../ProductInfo';
import { ProductType } from '../../enums/ProductType';
import { NewsFeedCodeType } from '../../enums/NewsFeedCodeType';
import { RoleType } from '../../enums/RoleType';

export class UserSession {
  static Empty = new UserSession(
    '',
    0,
    '',
    '',
    '',
    [],
    [],
    '',
    'empty@empty.com',
    ''
  );

  constructor(
    public id?: string,
    public clientId?: number,
    public clientName?: string,
    public sapCode?: string,
    public token?: string,
    public contractedProducts?: ProductInfo[],
    public roles?: string[],
    public userName?: string,
    public userEmail?: string,
    public userPicture?: string
  ) {}

  isLoggedIn() {
    return !!this.id;
  }

  isAuthenticatedWithAuth0() {
    return !!this.userEmail && this.userEmail !== UserSession.Empty.userEmail;
  }

  hasAccessToProduct(productType: ProductType) {
    return this.contractedProducts.some((p) => p.type === productType);
  }

  hasAccessOnlyForClipping() {
    const withoutClipping = this.contractedProducts.filter(
      (p) => p.type !== ProductType.Clipping
    );

    return withoutClipping.length === 0;
  }

  hasAccessToNewsFeed(newsFeedType: NewsFeedCodeType) {
    if (this.hasAccessToProduct(ProductType.Clipping)) {
      return this.contractedProducts.some((p) => p.GroupCode === newsFeedType);
    }
  }

  hasRole(roleName: RoleType) {
    return this.roles.some(
      (role: any) => role.name === roleName && role.clientId === this.clientId
    );
  }

  idAdmin() {
    return this.roles.some(
      (role: any) => role.name === RoleType.ADMIN && role.clientId === '1998'
    );
  }

  clone = () =>
    new UserSession(
      this.id,
      this.clientId,
      this.clientName,
      this.sapCode,
      this.token,
      this.contractedProducts,
      this.roles,
      this.userName,
      this.userEmail,
      this.userPicture
    );
}
