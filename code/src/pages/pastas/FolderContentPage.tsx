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

/* eslint-disable react-hooks/rules-of-hooks */
import { Icon } from 'antd';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from '../../components/Button';
import { NoResultsFoundMessage } from '../../components/NoResultsFoundMessage';
import { SearchResultItemRenderer } from '../../components/SearchResultItemRenderer';
import { ButtonsBar } from '../../components/_shell/ButtonsBar';
import { ButtonsBarButton } from '../../components/_shell/ButtonsBarButton';
import { Title } from '../../components/_shell/Title';
import { ContentWithTitleTemplate } from '../../components/_templates/ContentWithTitleTemplate';
import { ContentType } from '../../enums/ContentType';
import { useConfirm } from '../../Hooks/useConfirm';
import { useReturnUrlFromPdf } from '../../Hooks/useReturnUrlFromPdf';
import { SearchResultList } from '../pesquisa/components/SearchResultList';
import { FolderContentWrapper } from './components/FolderContentWrapper';
import { OnlyFolderOwner } from './components/OnlyFolderOwner';
import { UpdateFolderModal } from './components/UpdateFolderModal';
import { useFolderContext } from './hooks/useFolderContext';
import { useRemoveFolder } from './hooks/useRemoveFolder';
import { useRemoveFolderContent } from './hooks/useRemoveFolderContent';

export const FolderContentPage = (props: RouteComponentProps) => {
  const ctx = useFolderContext();
  const { returnToHereFromPdf } = useReturnUrlFromPdf();
  const [removeFolderContent] = useRemoveFolderContent();
  const [removeFolder, awaitingRemoveFolder] = useRemoveFolder(() =>
    props.history.replace('/pastas')
  );
  const [updateFolderModalVisible, setUpdateFolderModalVisible] =
    useState(false);
  const { getFoldersRequest, currentFolder } = ctx.state;
  const { loading } = getFoldersRequest;
  const { folderId } = props.match.params as any;

  useEffect(() => {
    ctx.setCurrentFolderId(folderId);
    returnToHereFromPdf();
  }, [folderId]);

  function showConfirmFolderRemove(folderId: string) {
    useConfirm('Deseja remover esta pasta?', '', () => {
      removeFolder(folderId);
    })();
  }

  function showConfirmFolderContentRemove(
    folderId: string,
    contentType: ContentType,
    title: string
  ) {
    useConfirm('Deseja remover este conteúdo da pasta?', '', () => {
      removeFolderContent(folderId, contentType, title);
    })();
  }

  if (!currentFolder) return null;

  return (
    <ContentWithTitleTemplate
      TitleContent={
        <Title key={'1'}>
          <Icon
            type={'folder'}
            style={{ marginRight: '.5rem', fontSize: '2.5rem' }}
          />
          {currentFolder.name}
        </Title>
      }
      Content={
        <>
          <ButtonsBar>
            {!loading && (
              <>
                <ButtonsBarButton
                  buttonProps={{
                    icon: 'arrow-left',
                    children: <> Voltar</>,
                    onClick: () => props.history.replace('/pastas')
                  }}
                />

                <OnlyFolderOwner {...{ folder: currentFolder }}>
                  <ButtonsBarButton
                    buttonProps={{
                      icon: 'edit',
                      children: <> Renomear</>,
                      style: { marginLeft: '.5rem' },
                      onClick: () => {
                        setUpdateFolderModalVisible(true);
                      }
                    }}
                  />
                </OnlyFolderOwner>

                <ButtonsBarButton
                  buttonProps={{
                    icon: 'team',
                    children: <> Participantes</>,
                    style: { marginLeft: '.5rem' },
                    onClick: () => {
                      props.history.push(
                        `/pastas/${currentFolder.id}/participantes`
                      );
                    }
                  }}
                />

                <span style={{ flex: 1 }} />

                <Button
                  {...{
                    icon: 'delete',
                    loading: awaitingRemoveFolder,
                    children: <> Remover pasta</>,
                    onClick: () => showConfirmFolderRemove(currentFolder.id),
                    type: 'danger'
                  }}
                />
              </>
            )}
          </ButtonsBar>

          {!loading && currentFolder && currentFolder.contents.length === 0 ? (
            <div style={{ marginTop: '5rem' }}>
              <NoResultsFoundMessage message={'Pasta vazia.'} />
            </div>
          ) : (
            <div style={{ marginTop: '3rem' }}>
              <SearchResultList loading={loading}>
                {currentFolder &&
                  currentFolder.contents.map((content) => (
                    <FolderContentWrapper
                      key={content.result.id}
                      onRemoveClick={() => {
                        showConfirmFolderContentRemove(
                          currentFolder.id,
                          content.result.contentType,
                          content.result.title
                        );
                      }}>
                      <SearchResultItemRenderer result={content.result} />
                    </FolderContentWrapper>
                  ))}
              </SearchResultList>
            </div>
          )}

          <UpdateFolderModal
            visible={updateFolderModalVisible}
            onCancel={() => {
              setUpdateFolderModalVisible(false);
            }}
          />
        </>
      }
    />
  );
};
