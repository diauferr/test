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
import { GoogleSignInButton } from '../../components/GoogleSignInButton';
import { Auth0ErrorCodes } from '../../flows/auth0_flow/Auth0ErrorCodes';
import { validate_email } from '../../flows/auth0_flow/validators/validate_email';
import { validate_password } from '../../flows/auth0_flow/validators/validate_password';
import { Auth0ErrorMessage } from '../../flows/auth0_flow/_components/Auth0ErrorMessage';
import { EmailInput } from '../../flows/auth0_flow/_components/inputs/EmailInput';
import { PasswordInput } from '../../flows/auth0_flow/_components/inputs/PasswordInput';
import { useAuth0 } from '../../hooks/useAuth0';
import { useReturnUrlPersistence } from '../../hooks/useAuth0ReturnUrlPersistence';
import { useQueryParams } from '../../hooks/useQueryParams';
import { AuthRoutePaths } from '../AuthRoutePaths.enum';
import styled from 'styled-components';

import IconLink from '../../../../assets/images/icon-link.svg';

interface IProps {}

export const LoginPage: React.FC<IProps> = () => {
    const auth0 = useAuth0();
    const return_url_persistence = useReturnUrlPersistence();
    const query_params = useQueryParams();
    const [login_error, set_login_error] = useState<Auth0ErrorCodes | string>(
        null
    );
    const [loading, set_loading] = useState(false);

    return (
        <Form
            {...{
                disabled: loading,
                login_error,
                email_from_query: query_params.get('email'),
                on_valid_form_submitted: (email, password) => {
                    if (loading) {
                        return;
                    }
                    const state = return_url_persistence.create_state_string();
                    const return_url = query_params.get('return_url');

                    if (return_url) {
                        return_url_persistence.persist(state, return_url);
                    }

                    set_login_error(null);
                    set_loading(true);

                    auth0
                        .login(
                            email.trim().toLowerCase(),
                            password.trim(),
                            state
                        )
                        .catch((error) => {
                            set_loading(false);
                            set_login_error(error);
                        });
                }
            }}
        />
    );
};

type ValidFields = {
    email: boolean;
    password: boolean;
};

interface IFormProps {
    disabled: boolean;
    email_from_query?: string;
    on_valid_form_submitted: (email: string, password: string) => any;
    login_error?: Auth0ErrorCodes | string;
}

const Form: React.FC<IFormProps> = ({
    disabled,
    email_from_query,
    on_valid_form_submitted,
    login_error
}) => {
    const auth0 = useAuth0();
    const [show_login_error, set_show_login_error] = useState(false);
    const [password, set_password] = useState('');
    const empty_valid_fields = { email: true, password: true };
    const [valid_fields, set_valid_fields] =
        useState<ValidFields>(empty_valid_fields);
    const [email, set_email] = useState('');

    useEffect(() => {
        if (!email_from_query) {
            return;
        }

        set_email(email_from_query);
    }, [email_from_query]);

    function on_submit() {
        const valid_fields = {
            email: validate_email(email),
            password: validate_password(password)
        };

        set_valid_fields(valid_fields);

        if (!valid_fields.email || !valid_fields.password) {
            return;
        }

        set_show_login_error(true);

        on_valid_form_submitted(email.trim().toLowerCase(), password.trim());
    }

    return (
        <AuthForm
            {...{
                disabled,
                onSubmit: on_submit,
                title: 'Faça login para continuar'
            }}>
            <EmailInput
                {...{
                    value: email,
                    is_valid: valid_fields.email,
                    on_change: (email) => {
                        set_show_login_error(false);
                        set_valid_fields(empty_valid_fields);
                        set_email(email);
                    }
                }}
            />

            <PasswordInput
                {...{
                    value: password,
                    is_valid: valid_fields.password,
                    on_change: (password) => {
                        set_show_login_error(false);
                        set_valid_fields(empty_valid_fields);
                        set_password(password);
                    }
                }}
            />

            <div className="forget_password">
                <NavLink to={AuthRoutePaths.ResetPasswordPage}>
                    Esqueci minha senha
                </NavLink>
            </div>

            {show_login_error && login_error && (
                <Auth0ErrorMessage {...{ error: login_error }} />
            )}

            <div className="spacer"></div>
            <div className="spacer"></div>

            <button
                {...{
                    name: 'login',
                    disabled,
                    ['data-testid']: 'btn-login'
                }}>
                Login
            </button>
            <Or>ou</Or>
            <GoogleSignInButton
                onClick={(evt) => {
                    evt.preventDefault();

                    auth0.login_with_google();
                }}
            />

            <div className="spacer"></div>
            <div className="spacer"></div>
            <hr />

            <div className="footer_action" data-testid="footer_action">
                <p> Ainda não tem uma conta da Plataforma Fórum?</p>
                <NavLink to={AuthRoutePaths.SignupPage}>
                    <span> Inscreva-se aqui</span>
                </NavLink>
                <hr />
                <a href="https://www.forumconhecimento.com.br/conheca/">
                    Visite a página principal da plataforma
                    <Icon src={IconLink} alt="" />
                </a>
            </div>

            <div className="spacer"></div>
            <div className="spacer"></div>
        </AuthForm>
    );
};

const Icon = styled.img`
    width: 16px;
    height: 16px;
`;

const Or = styled.p`
    text-align: center;
    margin-top: 16px;
`;
