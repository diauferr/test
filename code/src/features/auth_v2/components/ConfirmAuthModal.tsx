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

import { Button, Modal } from 'antd';
import React from 'react';
import styled from 'styled-components';
import lockImgSrc from './lock.svg';

interface IProps {
  visible: boolean;
  onCancel: () => void;
  on_go_to_login_click: () => void;
}

export const ConfirmAuthModal: React.FC<IProps> = ({
  visible,
  onCancel,
  on_go_to_login_click
}) => (
  <Modal title="" visible={visible} onCancel={onCancel} footer={null}>
    <Container>
      <div className="img-container">
        <img src={lockImgSrc} />
      </div>

      <p>Para continuar você deve se autenticar com sua conta de usuário.</p>

      <Button key="submit" type="primary" onClick={on_go_to_login_click}>
        Login
      </Button>
    </Container>
  </Modal>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  p {
    padding: 0;
    margin: 0;
    margin-bottom: 1rem;
    text-align: center;
  }

  .img-container {
    padding: 0.8rem;
    transform: scale(0.7);

    border-radius: 100%;
    border: 2px solid #cecece;
    box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.2);
    img {
      height: 5rem;
      min-width: 4rem;
    }
  }
`;
