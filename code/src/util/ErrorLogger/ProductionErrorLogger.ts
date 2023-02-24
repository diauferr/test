import * as Sentry from '@sentry/browser';
import { IErrorLogger } from './IErrorLogger';

export class ProductionErrorLogger implements IErrorLogger {
  constructor() {
    Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
  }

  setUser = (user: any) =>
    Sentry.configureScope((scope) => {
      scope.setUser(user);
    });

  log = (error: any) => Sentry.captureException(error);
}
