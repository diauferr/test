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

import React from 'react';
import styled from 'styled-components';
import { UserInFolder } from '../../../components/UserInFolder';
import { FolderModel } from '../../../models/folder/FolderModel';

const Container = styled.div<any>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 0.5rem;
  margin-top: 1rem;
`;

interface IProps {
  folder?: FolderModel;
}

export const FolderAssociatedUsers = ({ folder }: IProps) => {
  if (!folder) return null;

  return (
    <Container>
      {folder.associatedUsers.map((u) => (
        <UserInFolder
          key={u.email}
          name={u.name}
          email={u.email}
          folderId={folder.id}
        />
      ))}
    </Container>
  );
};
