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
import { Route } from 'react-router';
import { RedirectToLogout } from '../features/auth_v2/components/RedirectToLogout';
import { useAuthCtx } from '../features/auth_v2/hooks/useAuthCtx';

interface IProps {}

export const ProtectedRoute = ({ ...props }: IProps | any) => {
  const { is_authenticated } = useAuthCtx();

  return is_authenticated() ? <Route {...props} /> : <RedirectToLogout />;
};
