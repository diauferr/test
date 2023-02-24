/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { UserSession } from '../../features/auth_v2/model/UserSession';
import { IErrorLogger } from './IErrorLogger';

export class DevelopmentErrorLogger implements IErrorLogger {
  setUser = (user: UserSession) => null;

  log = (error: any) => console.error(error);
}
