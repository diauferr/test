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
import { NavLink } from 'react-router-dom';
import { AuthForm } from '../../components/AuthForm';
import { Auth0ErrorCodes } from '../../flows/auth0_flow/Auth0ErrorCodes';
import { validate_email } from '../../flows/auth0_flow/validators/validate_email';
import { validate_password } from '../../flows/auth0_flow/validators/validate_password';
import { Auth0ErrorMessage } from '../../flows/auth0_flow/_components/Auth0ErrorMessage';
import { EmailInput } from '../../flows/auth0_flow/_components/inputs/EmailInput';
import { Input } from '../../flows/auth0_flow/_components/inputs/Input';
import { PasswordInput } from '../../flows/auth0_flow/_components/inputs/PasswordInput';
import { useAuth0 } from '../../hooks/useAuth0';
import { useReturnUrlPersistence } from '../../hooks/useAuth0ReturnUrlPersistence';
import { useQueryParams } from '../../hooks/useQueryParams';
import { AuthRoutePaths } from '../AuthRoutePaths.enum';

interface IProps {}

export const SignupPage: React.FC<IProps> = () => {
  const auth0 = useAuth0();
  const { create_state_string } = useReturnUrlPersistence();
  const empty_valid_fields = {
    email: true,
    name: true,
    password: true,
    confirm_password: true
  };
  const [signup_error, set_signup_error] = useState<Auth0ErrorCodes | string>(
    null
  );
  const [email, set_email] = useState('');
  const [name, set_name] = useState('');
  const [password, set_password] = useState('');
  const [confirm_password, set_confirm_password] = useState('');
  const [valid_fields, set_valid_fields] =
    useState<ValidFields>(empty_valid_fields);
  const query_params = useQueryParams();
  const email_from_query = query_params.get('email');
  useEffect(() => {
    if (!email_from_query) {
      return;
    }

    set_email(email_from_query);
  }, [email_from_query]);

  function on_submit() {
    const valid_fields: ValidFields = {
      email: validate_email(email),
      name: name.trim().length > 0,
      password: validate_password(password),
      confirm_password: password === confirm_password
    };

    set_valid_fields(valid_fields);

    if (!is_form_valid(valid_fields)) {
      return;
    }

    const e = email.trim().toLowerCase();
    const p = password.trim();

    auth0
      .sign_up(e, p, name.trim())
      .then(() => {
        auth0.login(e, p, create_state_string());
      })
      .catch((error) => set_signup_error(error));
  }

  return (
    <AuthForm
      {...{
        disabled: false,
        onSubmit: on_submit,
        title: 'Inscreva-se para continuar'
      }}>
      <EmailInput
        {...{
          value: email,
          is_valid: valid_fields.email,
          on_change: (email) => {
            set_valid_fields(empty_valid_fields);
            set_email(email);
          }
        }}
      />

      <Input
        {...{
          id: 'name',
          type: 'text',
          is_valid: valid_fields.name,
          label: 'Nome',
          value: name,
          on_change: (name) => {
            set_valid_fields(empty_valid_fields);
            set_name(name);
          },
          error_msg: 'Campo obrigatório.'
        }}
      />

      <PasswordInput
        {...{
          value: password,
          is_valid: valid_fields.password,
          on_change: (value) => {
            set_valid_fields(empty_valid_fields);
            set_password(value);
          }
        }}
      />

      <PasswordInput
        {...{
          id: 'confirm_password',
          label: 'Confirmar senha',
          error_msg: 'As senhas não conferem.',
          value: confirm_password,
          is_valid: valid_fields.confirm_password,
          on_change: (value) => {
            set_valid_fields(empty_valid_fields);
            set_confirm_password(value);
          }
        }}
      />

      {!is_form_valid(valid_fields) && (
        <div>O formulário possui campos inválidos.</div>
      )}

      {signup_error && (
        <Auth0ErrorMessage
          {...{
            error: signup_error,
            email
          }}
        />
      )}

      <div className="spacer"></div>
      <div className="spacer"></div>

      <button
        {...{
          name: 'cadastro'
        }}>
        Inscrever
      </button>

      <div className="footer_action" data-testid="footer_action">
        <p>Já tem uma conta da Plataforma Fórum?</p>
        <NavLink to={AuthRoutePaths.LoginPage}>
          <span>Faça login aqui</span>
        </NavLink>
      </div>
    </AuthForm>
  );
};

type ValidFields = {
  email: boolean;
  name: boolean;
  password: boolean;
  confirm_password: boolean;
};

function is_form_valid(valid_fields: ValidFields) {
  return (
    valid_fields.email &&
    valid_fields.name &&
    valid_fields.password &&
    valid_fields.confirm_password
  );
}
