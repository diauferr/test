import React from 'react';

interface IProps {
  on_verified_button_click: () => any;
}

export const VerifyEmailMessage: React.FC<IProps> = ({
  on_verified_button_click
}) => (
  <div>
    <h1>Precisamos verificar seu e-mail</h1>
    <ul>
      <li>
        Por favor, acesse o seu e-mail e clique no link enviado para confirmar a
        sua conta.
      </li>
      <li>
        Caso não tenha recebido, verifique se a mensagem foi direcionada para a
        lixeira eletrônica.
      </li>

      <li>Após a verificação clique no botão abaixo.</li>
    </ul>

    <button
      onClick={on_verified_button_click}
      name="verified"
      style={{
        margin: '0 auto',
        display: 'block'
      }}>
      Já verifiquei minha conta
    </button>
  </div>
);
