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

import React from 'react';
import { useAuth0ErrorMessages } from '../../../hooks/useAuth0ErrorMessages';
import { Auth0ErrorCodes } from '../Auth0ErrorCodes';

const UNEXPECTED_ERROR_MSG =
  'Ocorreu um erro inesperado, por favor tente novamente em instantes.';

interface IProps {
  error: Auth0ErrorCodes | string;
  email?: string;
}

export const Auth0ErrorMessage: React.FC<IProps> = ({ error, email }) => {
  if (!error) {
    return null;
  }

  const error_msgs = useAuth0ErrorMessages(email);

  const error_msg = error_msgs[error] || `${UNEXPECTED_ERROR_MSG} : ${error}`;

  return <div className="auth0-error">{error_msg}</div>;
};
