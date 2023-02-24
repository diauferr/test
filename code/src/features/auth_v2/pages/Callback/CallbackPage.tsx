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

import React, { useEffect, useState } from 'react';
import { Auth0LoginFlow } from '../../flows/auth0_flow/Auth0LoginFlow';
import { useAuth0 } from '../../hooks/useAuth0';
import { useReturnUrlPersistence } from '../../hooks/useAuth0ReturnUrlPersistence';

interface IProps {}

export const CallbackPage: React.FC<IProps> = ({}) => {
  const auth0 = useAuth0();
  const return_url_persistence = useReturnUrlPersistence();
  const [return_url, set_return_url] = useState(null);

  useEffect(() => {
    auth0
      .get_state_from_hash()
      .then((state) => return_url_persistence.get_persisted(state))
      .then((return_url) => {
        set_return_url(return_url);
      });
  }, []);

  if (return_url === null) {
    return null;
  }

  return <Auth0LoginFlow {...{ return_url }} />;
};
