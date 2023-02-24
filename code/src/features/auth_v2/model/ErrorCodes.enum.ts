export enum ErrorCodes {
  EmailNotVerified = 'auth100',
  ClientNotAllowedForThisUser = 'auth150',
  MissingToken = 'auth200',
  MaxSimultaneosUsersLimitReached = 'auth300',
  ExpiredSession = 'auth320',
  TokenExpired = 'auth50',
  ErrorValidatingToken = 'auth55',
  ClientSSONotConfigured = 'auth587',
  NetworkError = 'NetworkError',
  NoClientsAssociatedWithUser = 'NoClientsAssociatedWithUser',
  UserAccessBlocked = 'auth401'
}
