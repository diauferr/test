import React, { useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import _ from 'lodash';
import { message } from 'antd';
import { Button } from '../../../components/Button';
import { useConfirm } from '../../../Hooks/useConfirm';
import { useDoRequest } from '../../../Hooks/useDoRequest';
import { InviteModel } from '../../../models/folder/InviteModel';
import { FolderRequests } from '../../../requests/folder/FolderRequests';
import iconSrc from './../../../assets/images/invitation.svg';

const Container = styled.div.attrs({ className: 'animated fadeInLeft' })`
  max-width: 550px;
  border: 1px solid #e5e5e5;
  padding: 1rem;
  box-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  margin: 1rem 0;

  .date {
    font-size: 0.9rem !important;
    margin-bottom: 0.5rem;
  }

  .content {
    display: grid;
    grid-template-columns: 4rem 1fr;
    align-items: center;
    grid-column-gap: 0.5rem;

    img {
      width: 3.2rem;
    }

    p {
      font-weight: 500;
      margin: 0;
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
`;

interface IProps {
  invite: InviteModel;
  onInvitationRefused: () => any;
  onInvitationAccepted: () => any;
}

export const Invitation = ({
  invite,
  onInvitationRefused,
  onInvitationAccepted
}: IProps) => {
  const [acceptResult, awaitingAccept, errorAccept, doAccept] =
    useDoRequest<any>();
  const [refuseResult, awaitingRefuse, errorRefuse, doRefuse] =
    useDoRequest<any>();
  const awaiting = awaitingRefuse || awaitingAccept;

  const acceptInvitation = () => {
    if (awaiting) return;
    doAccept(() => FolderRequests.acceptedFolderInvitation(invite.folder_id));
  };

  const refuseInvitation = () => {
    if (awaiting) return;
    doRefuse(() => FolderRequests.refuseFolderInvitation(invite.folder_id));
  };

  const showConfirmRefuse = useConfirm(
    'Deseja recusar o convite?',
    '',
    refuseInvitation
  );

  useEffect(() => {
    if (_.get(refuseResult, 'status') === 200) onInvitationRefused();
    if (_.get(acceptResult, 'status') === 200) onInvitationAccepted();
  }, [refuseResult, acceptResult]);

  useEffect(() => {
    if (errorRefuse) message.error('Ocorreu um erro inesperado.');
  }, [errorRefuse]);

  useEffect(() => {
    if (errorAccept) message.error('Ocorreu um erro inesperado.');
  }, [errorAccept]);

  return (
    <Container>
      <div className="date">{moment(invite.sent_at * 1000).fromNow()}</div>
      <div className={'content'}>
        <img src={iconSrc} />
        <p>
          {invite.from} convidou você para participar da pasta{' '}
          {invite.folder_name}.
        </p>
      </div>
      <div className="buttons">
        <Button
          type="primary"
          icon="check"
          style={{ marginRight: '.5rem' }}
          onClick={acceptInvitation}
          loading={awaitingAccept}
          disabled={awaiting}>
          Aceitar
        </Button>
        <Button
          type={'danger'}
          icon={'close'}
          disabled={awaiting}
          loading={awaitingRefuse}
          onClick={showConfirmRefuse}>
          Recusar
        </Button>
      </div>
    </Container>
  );
};
