import React from 'react';
import { Input } from './Input';

interface IProps {
  value: string;
  on_change: (value: string) => any;
  is_valid: boolean;
}

export const EmailInput: React.FC<IProps> = ({
  value,
  on_change,
  is_valid
}) => (
  <Input
    {...{
      type: 'email',
      error_msg: 'E-mail inválido.',
      id: 'email',
      is_valid,
      label: 'E-mail',
      on_change,
      value
    }}
  />
);
