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

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InviteModel } from '../../../models/folder/InviteModel';
import { FolderRequests } from '../../../requests/folder/FolderRequests';
import { Invitation } from './Invitation';

const Container = styled.div<any>`
  display: flex;
  justify-content: center;
`;

interface IProps {
  onInviteAccepted: () => any;
}

export const AcceptInvitationList = ({ onInviteAccepted }: IProps) => {
  const [invites, set_invites] = useState<InviteModel[]>([]);
  useEffect(() => {
    getInvites();
  }, []);

  function getInvites() {
    FolderRequests.getInvites().then((res) => set_invites(res.data));
  }

  return (
    <Container>
      {invites.map((i) => (
        <Invitation
          key={i.folder_id}
          invite={i}
          onInvitationRefused={() => {
            getInvites();
          }}
          onInvitationAccepted={() => {
            getInvites();
            onInviteAccepted();
          }}
        />
      ))}
    </Container>
  );
};
