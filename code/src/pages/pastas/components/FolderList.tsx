import React from 'react';
import styled from 'styled-components';
import { FolderItem } from './FolderItem';
import { NoResultsFoundMessage } from '../../../components/NoResultsFoundMessage';
import { FolderModel } from '../../../models/folder/FolderModel';

const Container = styled.div<any>`
  display: flex;
  margin-top: 2rem;
  max-width: 100%;
  justify-content: center;

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 2rem;
    width: 100%;

    @media (max-width: 1241px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 550px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

interface IProps {
  folders: FolderModel[];
}

export const FolderList = ({ folders }: IProps) => {
  if (!folders) return null;

  return (
    <Container>
      {folders.length === 0 ? (
        <div style={{ marginTop: '2rem' }}>
          <NoResultsFoundMessage message={'Nenhuma pasta foi encontrada.'} />
        </div>
      ) : (
        <div className="grid">
          {folders.map((folder) => (
            <FolderItem key={folder.id} folder={folder} />
          ))}
        </div>
      )}
    </Container>
  );
};
