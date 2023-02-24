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

/* eslint-disable indent */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { message } from 'antd';
import validator from 'validator';
import _ from 'lodash';
import { Input } from '../../../components/_inputs/Input';
import { Modal } from '../../../components/Modal';
import { FolderModel } from '../../../models/folder/FolderModel';
import { Button } from '../../../components/Button';
import { useDoRequest } from '../../../Hooks/useDoRequest';
import styled from 'styled-components';
import iconSrc from './../../../assets/images/invitation.svg';
import { FolderRequests } from '../../../requests/folder/FolderRequests';

const SuccessContentContainer = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;

  img {
    width: 3.2rem;
    margin-bottom: 1rem;
  }
`;

interface IProps {
  visible: boolean;
  onCancel: () => any;
  folder: FolderModel;
}

export const SendInvitationModal = ({ visible, onCancel, folder }: IProps) => {
  const inputRef = useRef();
  const [result, loading, error, execRequest] = useDoRequest<any>();
  const [inviteSent, setInviteSent] = useState(false);
  const [email, setEmail] = useState<string>('');
  const validEmail = validator.isEmail(email);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        //@ts-ignore
        inputRef.current.focus();
      }
    }, 50);

    setEmail('');
  }, [visible]);

  useEffect(() => {
    if (!result) return;

    if (_.get(result, 'status') === 201) {
      setInviteSent(true);
    }
  }, [result]);

  useEffect(() => {
    if (error) message.error('Ocorreu um erro inesperado.');
  }, [error]);

  function sendInvitation() {
    if (!validEmail || inviteSent) return;

    execRequest(() =>
      FolderRequests.sendFolderInvitation(email, folder.id, folder.name)
    );
  }

  return (
    <Modal
      title={`Convite para ${folder.name}`}
      visible={visible}
      onOk={onCancel}
      onCancel={onCancel}
      maskClosable={false}
      footer={
        inviteSent
          ? [
              <Button
                onClick={() => {
                  setInviteSent(false);
                  onCancel();
                }}
                key={'btn-ok'}>
                Ok
              </Button>
            ]
          : [
              <Button
                onClick={onCancel}
                key={'btn-cancelar'}
                disabled={loading}>
                Cancelar
              </Button>,
              <Button
                type={'primary'}
                key={'btn-alterar'}
                loading={loading}
                disabled={!validEmail}
                onClick={sendInvitation}>
                {' '}
                Enviar convite
              </Button>
            ]
      }>
      <div style={{ padding: '1rem' }}>
        {inviteSent ? (
          <SuccessContentContainer>
            <img src={iconSrc} className={'animated fadeInDown'} />O convite foi
            enviado com sucesso! O participante terá acesso à pasta assim que
            aceitar o seu convite.
          </SuccessContentContainer>
        ) : (
          <div>
            <h4>Informe o e-mail do novo participante</h4>
            <Input
              placeholder="E-mail do participante"
              value={email}
              type={'email'}
              onChange={(evt) => setEmail(evt.target.value)}
              ref={inputRef}
              disabled={loading}
              onPressEnter={sendInvitation}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
