/* eslint-disable no-console */
export const EnvVars = {
  LoginApiUrl: process.env.REACT_APP_AUTH_LOGIN_API,
  SearchApiUrl: process.env.REACT_APP_SEARCH_API,
  UserProfileApiUrl: process.env.REACT_APP_USER_PROFILE_API
};

if (process.env.NODE_ENV === 'development') {
  console.log(EnvVars, 'envvars ');
}
