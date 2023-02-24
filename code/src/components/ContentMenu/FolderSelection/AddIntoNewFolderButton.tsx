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

import { message } from 'antd';
import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDoRequest } from '../../../Hooks/useDoRequest';
import { useEffectIfNotNull } from '../../../Hooks/useEffectIfNotNull';
import { FolderModel } from '../../../models/folder/FolderModel';
import { FolderRequests } from '../../../requests/folder/FolderRequests';
import { Button } from '../../Button';
import { Input } from '../../_inputs/Input';

interface IProps {
  onFolderCreated: (newFolder: FolderModel) => void;
  doAddContentToFolder: (folderId: string) => any;
}

export const AddNewFolderButton = ({
  onFolderCreated,
  doAddContentToFolder
}: IProps) => {
  const inputRef = useRef(null);
  const [
    createResult,
    creatingNewFolder,
    errorCreatingNewFolder,
    doCreateNewFolder
  ] = useDoRequest<any>();

  useEffectIfNotNull(() => {
    const folder = createResult as FolderModel;
    onFolderCreated(folder);
    inputRef.current.value = '';
    message.success('Pasta criada com sucesso.');

    doAddContentToFolder(folder.id);
  }, [createResult]);

  useEffect(() => {
    if (errorCreatingNewFolder)
      message.error('Ocorreu um erro ao tentar criar nova pasta.');
  }, [errorCreatingNewFolder]);

  function tryCreateNewFolderOnApi() {
    const folderName = _.get(inputRef, 'current.value', '');

    if (folderName.trim().length === 0) return;

    doCreateNewFolder(() => FolderRequests.createNewFolder(folderName));
  }

  return (
    <Container>
      <Button
        type={'primary'}
        onClick={() => {
          inputRef.current.focus();
        }}>
        Adicionar nova pasta
      </Button>

      <InputFolderNameContainer>
        <Input
          placeholder="Nome da pasta"
          name={'folder-name'}
          ref={inputRef}
          disabled={creatingNewFolder}
          style={{
            marginRight: '.5rem'
          }}
          onPressEnter={tryCreateNewFolderOnApi}
        />

        <Button
          type={'primary'}
          loading={creatingNewFolder}
          onClick={tryCreateNewFolderOnApi}>
          Adicionar
        </Button>
      </InputFolderNameContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const InputFolderNameContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  display: flex;

  transform: translate3d(0, 5rem, 0);
  transition: all 0.5s;
`;
