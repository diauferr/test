import { AssociatedBy } from './AssociatedBy.enum';

export type Client = {
  unlimited: boolean;
  initials: string;
  name: string;
  id: string;
  contractedProducts: any[];
  associated_by: AssociatedBy;
  sso_id: string;
  sso_login_url: string;
  blocked: boolean;
};
