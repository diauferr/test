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
import { TestId } from '../../../components/TestId';
interface IProps {
  email: string;
}

export const test_id = 'reset-password-success';

export const ResetPasswordSuccessMessage: React.FC<IProps> = ({ email }) => (
  <div>
    <TestId
      {...{
        test_id
      }}
    />
    <p>
      Um e-mail foi enviado para {email} com as instruções para redefinir sua
      senha.
    </p>
  </div>
);
