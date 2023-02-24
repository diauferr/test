import { Role } from '../model/Role';

export type AuthSuccessDto = {
  picture: string;
  name: string;
  email: string;
  created_at: number;
  roles: Role[];
  client: {
    initials: string;
    unlimited: boolean;
    name: string;
    id: string;
    contracted_products: any[];
    sso_login_url: string;
  };
  platform_token: string;
  token_legacy: string;
  intranet_session_id: string;
};
