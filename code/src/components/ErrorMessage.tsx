import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 507.2 507.2">
    <circle cx="253.6" cy="253.6" r="253.6" fill="#f15249" />
    <path
      d="M147.2 368L284 504.8c115.2-13.6 206.4-104 220.8-219.2L367.2 148l-220 220z"
      fill="#ad0e0e"
    />
    <path
      d="M373.6 309.6c11.2 11.2 11.2 30.4 0 41.6l-22.4 22.4c-11.2 11.2-30.4 11.2-41.6 0l-176-176c-11.2-11.2-11.2-30.4 0-41.6l23.2-23.2c11.2-11.2 30.4-11.2 41.6 0l175.2 176.8z"
      fill="#fff"
    />
    <path
      d="M280.8 216L216 280.8l93.6 92.8c11.2 11.2 30.4 11.2 41.6 0l23.2-23.2c11.2-11.2 11.2-30.4 0-41.6L280.8 216z"
      fill="#d6d6d6"
    />
    <path
      d="M309.6 133.6c11.2-11.2 30.4-11.2 41.6 0l23.2 23.2c11.2 11.2 11.2 30.4 0 41.6L197.6 373.6c-11.2 11.2-30.4 11.2-41.6 0l-22.4-22.4c-11.2-11.2-11.2-30.4 0-41.6l176-176z"
      fill="#fff"
    />
  </svg>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
  }

  svg {
    margin-right: 1rem;
    width: 36px;
    height: 36px;
  }
`;

interface IProps {
  message?: string;
  error?: any;
}

const errorMessageTestId = 'ERROR_MESSAGE_TEST_ID';
export const ErrorMessage = ({
  message = 'Desculpe, ocorreu um erro inesperado no sistema.',
  error
}: IProps) => {
  if (_.get(error, 'message') === 'Network Error') {
    return (
      <Container data-testid={errorMessageTestId}>
        <Icon />
        <p style={{ textAlign: 'center' }}>
          Ocorreu um erro de conexão. Por favor verifique sua conexão de
          internet, se o problema persistir por favor entre em contato pelo
          e-mail{' '}
          <a href={'mailto:plataforma@editoraforum.com.br'}>
            plataforma@editoraforum.com.br
          </a>{' '}
          ou através do chat.
        </p>
      </Container>
    );
  }

  let errorMessage = message;

  if (_.get(error, 'status') >= 500)
    errorMessage = 'Desculpe, ocorreu um erro inesperado no sistema.';
  else if (_.get(error, 'status') === 401)
    errorMessage = 'Sua conta não possui acesso à este conteúdo.';

  return (
    <Container data-testid={errorMessageTestId}>
      <Icon />
      <p>{errorMessage}</p>
    </Container>
  );
};
