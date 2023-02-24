import React from 'react';
import { ContentBelowHeader } from './_templates/ContentBelowHeader';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  margin: auto;
  padding-top: 3rem;

  img {
    width: 100%;
    height: 100px;
    margin-bottom: 1rem;
  }
`;

export const ContentNotAvailable = () => (
  <ContentBelowHeader>
    <Container>
      <img src="/assets/images/user-warning.svg" alt="alerta de usuario" />
      <p>Você não possui acesso a este conteúdo.</p>
      <p>
        Verifique com o gestor de sua conta a possibilidade de ampliar seu
        acesso!
      </p>
      <p>
        Caso não identifique o responsável, entre em contato com
        plataforma@editoraforum.com.br para que possamos auxiliá-lo(a)!
      </p>
      <p>Para assinar este conteúdo:</p>
      <li>
        Peça o gestor de sua conta para entrar em contato pelo 0800-704-37-37 ou
        vender@editoraforum.com.br
      </li>
    </Container>
  </ContentBelowHeader>
);
