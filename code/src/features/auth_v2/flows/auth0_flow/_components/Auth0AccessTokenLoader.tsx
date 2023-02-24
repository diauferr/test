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

import { Auth0Error } from 'auth0-js';
import React, { useEffect, useState } from 'react';
import { ExitButton } from '../../../components/AssociatedClientsList/ExitButton';
import Loading from '../../../components/Loading';
import { useAuth0 } from '../../../hooks/useAuth0';
import { useAuthCtx } from '../../../hooks/useAuthCtx';
import { useSessionInfoStorage } from '../../../hooks/useSessionInfoStorage';
import { VerifyEmailMessage } from './VerifyEmailMessage';

interface IProps {
  render_children: (access_token?: string, error?: Auth0Error) => any;
}

export const Auth0AccessTokenLoader: React.FC<IProps> = ({
  render_children
}) => {
  const auth0 = useAuth0();
  const { logout } = useAuthCtx();
  const auth_info = useSessionInfoStorage();
  const [need_to_verify_email, set_need_to_verify_email] = useState(false);
  const [access_token, set_access_token] = useState<string>(null);

  useEffect(() => {
    get_auth0_session();
  }, []);

  function get_auth0_session() {
    set_need_to_verify_email(false);

    auth0
      .get_session()
      .then((sess) => {
        auth_info.save({
          is_auth0: true
        });

        // console.log(sess, "sess ");
        if (!sess.emailVerified) {
          return set_need_to_verify_email(true);
        }

        set_need_to_verify_email(false);
        set_access_token(sess.accessToken);
      })
      .catch((error: Auth0Error | string) => {
        logout(`${error}`);
      });
  }

  if (need_to_verify_email) {
    return (
      <>
        <VerifyEmailMessage
          {...{
            on_verified_button_click: get_auth0_session
          }}
        />
        <br />
        <hr />
        <ExitButton />
      </>
    );
  }

  if (access_token) {
    return render_children(access_token, null);
  }

  return <Loading text="autenticando usuário..." />;
};
