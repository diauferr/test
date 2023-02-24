import { ProductType } from '../../../enums/ProductType';
import { Role } from './Role';

export type UserSession = {
  picture: string;
  name: string;
  email: string;
  created_at: number;
  roles: Role[];
  intranet_session_id: string;
  client: {
    name: string;
    initials: string;
    unlimited: boolean;
    id: string;
    contracted_products: {
      type: ProductType;
      titulo: string;
      codGroup: number;
    }[];
  };
  contractedProducts?: [];
};
