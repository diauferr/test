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
import { ResetPasswordSuccessMessage } from '../../components/ResetPasswordSuccessMessage';
import { Auth0ErrorCodes } from '../../flows/auth0_flow/Auth0ErrorCodes';
import { validate_email } from '../../flows/auth0_flow/validators/validate_email';
import { Auth0ErrorMessage } from '../../flows/auth0_flow/_components/Auth0ErrorMessage';
import { EmailInput } from '../../flows/auth0_flow/_components/inputs/EmailInput';
import { useAuth0 } from '../../hooks/useAuth0';
import { useQueryParams } from '../../hooks/useQueryParams';
import { AuthRoutePaths } from '../AuthRoutePaths.enum';
import styled from 'styled-components';

interface IProps {}

export const ResetPasswordPage: React.FC<IProps> = ({}) => {
  const auth0 = useAuth0();
  const query_params = useQueryParams();
  const [success, set_success] = useState(false);
  const [error, set_error] = useState<Auth0ErrorCodes | string>(null);
  const [loading, set_loading] = useState(false);

  return (
    <Container>
      <Form
        {...{
          show_back_link: !query_params.get('voltar'), // aparece o link de voltar se o link do AuthContent nao estiver visivel.
          disabled: loading && !success,
          success,
          error,
          email_from_query: query_params.get('email'),
          on_valid_form_submitted: (email) => {
            if (loading) {
              return;
            }

            set_loading(true);

            auth0
              .reset_password(email.trim().toLowerCase())
              .then(() => {
                set_success(true);
              })
              .catch((error) => {
                set_loading(false);
                set_error(error);
              });
          }
        }}
      />
    </Container>
  );
};

type ValidFields = {
  email: boolean;
};

interface IFormProps {
  show_back_link;
  disabled: boolean;
  email_from_query?: string;
  on_valid_form_submitted: (email: string) => any;
  error?: Auth0ErrorCodes | string;
  success: boolean;
}

const Form: React.FC<IFormProps> = ({
  show_back_link,
  disabled,
  email_from_query,
  on_valid_form_submitted,
  error,
  success
}) => {
  const [email, set_email] = useState('');
  const empty_valid_fields = { email: true };
  const [valid_fields, set_valid_fields] =
    useState<ValidFields>(empty_valid_fields);

  useEffect(() => {
    if (!email_from_query) {
      return;
    }

    set_email(email_from_query);
  }, [email_from_query]);

  function on_submit() {
    const valid_fields = {
      email: validate_email(email)
    };

    set_valid_fields(valid_fields);

    if (!valid_fields.email) {
      return;
    }

    on_valid_form_submitted(email.trim().toLowerCase());
  }

  return (
    <AuthForm
      {...{
        disabled,
        onSubmit: on_submit,
        title: 'Redefinir senha'
      }}>
      {success ? (
        <ResetPasswordSuccessMessage {...{ email }} />
      ) : (
        <>
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

          {error && <Auth0ErrorMessage {...{ error }} />}

          <div className="spacer"></div>
          <div className="spacer"></div>
          <button
            {...{
              disabled
            }}>
            Redefinir minha senha
          </button>
        </>
      )}

      {show_back_link && (
        <div className="footer_action">
          <NavLink
            {...{
              to: `${AuthRoutePaths.LoginPage}${
                success ? `?email=${email}` : ''
              }`
            }}>
            Voltar
          </NavLink>
        </div>
      )}
    </AuthForm>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Button = styled.button``;

const Text = styled.span``;
