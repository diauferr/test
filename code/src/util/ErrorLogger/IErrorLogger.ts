import { UserSession } from '../../features/auth_v2/model/UserSession';

export interface IErrorLogger {
  setUser(user: UserSession);

  log(error: any);
}
