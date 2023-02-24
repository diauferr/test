import { Form } from 'antd';
import React, { useState } from 'react';
import validator from 'validator';
import { Input } from './Input';

interface IProps {
  onValidEmailAndEnterPressed: (email: string) => any;
  otherProps?: object;
  onChange: (email: string, isValid: boolean) => any;
  inputValue?: string;
}

export const EmailInput = ({
  onValidEmailAndEnterPressed,
  otherProps = {},
  onChange,
  inputValue
}: IProps) => {
  const [showInvalidIcon, setShowInvalidIcon] = useState(false);
  const emailIsValid = validator.isEmail(inputValue);

  let validateStatus: any = emailIsValid ? 'success' : '';

  if (showInvalidIcon) validateStatus = 'error';

  return (
    <Form.Item
      label="Adicione os destinatários"
      hasFeedback
      validateStatus={validateStatus}
      help={emailIsValid ? 'Pressione enter para adicionar email.' : null}>
      <Input
        placeholder={'email@email.com'}
        value={inputValue}
        onChange={(evt: any) => {
          const email = evt.target.value;

          setShowInvalidIcon(false);
          onChange(email, validator.isEmail(email));
        }}
        onPressEnter={() => {
          if (!emailIsValid) {
            return setShowInvalidIcon(true);
          }

          setShowInvalidIcon(false);
          onValidEmailAndEnterPressed(inputValue);
        }}
        type={'email'}
        id={'email'}
        name={'email'}
        {...otherProps}
      />
    </Form.Item>
  );
};
