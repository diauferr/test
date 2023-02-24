export type RestoreSessionDto = {
  created_at: number;
  client_id?: string;
  auth0_token?: string;
  sso_id?: string;
  sso_token?: string;
  intranet_session_id?: string;
};
