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
import { Input } from './Input';

interface IProps {
  value: string;
  on_change: (value: string) => any;
  is_valid: boolean;
  label?: string;
  id?: string;
  error_msg?: string;
}

export const password_input_default_label = 'Senha (mínimo de 8 caracteres)';

export const PasswordInput: React.FC<IProps> = ({
  value,
  on_change,
  is_valid,
  label = password_input_default_label,
  id = 'password',
  error_msg = 'A senha deve ter no mínimo 8 caracteres.'
}) => (
  <Input
    {...{
      type: 'password',
      error_msg,
      id,
      is_valid,
      label,
      on_change,
      value
    }}
  />
);
