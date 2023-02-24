/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import auth0js from 'auth0-js';

const {
  REACT_APP_AUTH0_CLIENTID,
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_AUDIENCE
} = process.env;

const auth0 = Auth0({
  client_id: REACT_APP_AUTH0_CLIENTID,
  domain: REACT_APP_AUTH0_DOMAIN,
  audience: REACT_APP_AUTH0_AUDIENCE
});

export function useAuth0() {
  return auth0;
}

function Auth0(args: { client_id: string; domain: string; audience: string }) {
  const connections = {
    UsernamePassword: 'Username-Password-Authentication',
    Google: 'google-oauth2'
  };

  const scope = 'openid profile email name picture';
  const webauth = new auth0js.WebAuth({
    domain: args.domain,
    clientID: args.client_id,
    audience: args.audience,
    redirectUri: `${window.location.origin}/callback`,
    responseType: 'token id_token',
    scope
  });

  return {
    get_state_from_hash: () =>
      new Promise<string>((resolve) => {
        webauth.parseHash((error, result) => {
          if (error || !result) {
            return resolve('');
          }

          resolve(result.state);
        });
      }),
    login: (email: string, password: string, state: string) =>
      new Promise((resolve, reject) => {
        webauth.login(
          {
            realm: connections.UsernamePassword,
            email,
            password,
            state
          },
          (result) => {
            if (result.error) {
              return reject(convert_to_auth0_error_code(result.error));
            }

            resolve(result);
          }
        );
      }),
    login_with_google: () =>
      webauth.authorize({ connection: connections.Google }),
    reset_password: (email: string) =>
      new Promise((resolve, reject) => {
        webauth.changePassword(
          {
            connection: connections.UsernamePassword,
            email
          },
          (err) => {
            if (err) {
              return reject(convert_to_auth0_error_code(err));
            }

            resolve('ok');
          }
        );
      }),
    sign_up: (email: string, password: string, name: string) =>
      new Promise((resolve, reject) => {
        webauth.signup(
          {
            connection: connections.UsernamePassword,
            email,
            password,
            userMetadata: {
              name
            },
            scope
          } as any,
          function (err, result) {
            if (err) {
              return reject(convert_to_auth0_error_code(err));
            }

            resolve(result);
          }
        );
      }),
    logout: () => {
      webauth.logout({
        clientID: args.client_id,
        returnTo: window.location.origin
      });
    },
    get_session: (): Promise<{
      accessToken: string;
      emailVerified: boolean;
      sub: string;
    }> =>
      new Promise((resolve, reject) => {
        webauth.checkSession({}, (err, auth0Result) => {
          if (err) {
            return reject(convert_to_auth0_error_code(err));
          }

          const result = {
            accessToken: auth0Result.accessToken,
            emailVerified: auth0Result.idTokenPayload.email_verified,
            sub: auth0Result.idTokenPayload.sub
          };

          // Auth0.getActiveSessionCache = result;
          resolve(result);
        });
      })
  };
}

function convert_to_auth0_error_code(error_result: any) {
  if (error_result && error_result.code) {
    return `${error_result.code}`;
  }

  return `${error_result}`;
}
