import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { ButtonsBar } from '../../components/_shell/ButtonsBar';
import { ButtonsBarButton } from '../../components/_shell/ButtonsBarButton';
import { Title } from '../../components/_shell/Title';
import { ContentWithTitleTemplate } from '../../components/_templates/ContentWithTitleTemplate';
import { FolderAssociatedUsers } from './components/FolderAssociatedUsers';
import { OnlyFolderOwner } from './components/OnlyFolderOwner';
import { SendInvitationModal } from './components/SendInvitationModal';
import { FolderContext } from './context/FolderContextProvider';
import { IFolderContextProviderValue } from './context/IFolderContextProviderValue';

export const FolderInvitationPage = (props: RouteComponentProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const ctx = useContext<IFolderContextProviderValue>(FolderContext as any);
  const { folderId } = props.match.params as any;
  const { currentFolder } = ctx.state;

  useEffect(() => {
    ctx.setCurrentFolderId(folderId);
  }, [folderId]);

  return (
    <>
      <ContentWithTitleTemplate
        TitleContent={
          <Title>
            {_.get(currentFolder, 'name')}
            <br />
            <span style={{ fontSize: '1.8rem' }}>Participantes</span>
          </Title>
        }
        Content={
          <div>
            <ButtonsBar>
              {currentFolder && (
                <>
                  <ButtonsBarButton
                    buttonProps={{
                      icon: 'arrow-left',
                      children: <>Voltar</>,
                      onClick: () =>
                        props.history.replace(`/pastas/${currentFolder.id}`)
                    }}
                  />

                  <OnlyFolderOwner>
                    <ButtonsBarButton
                      buttonProps={{
                        icon: 'user',
                        children: <>Convidar participante</>,
                        style: {
                          marginLeft: '.5rem'
                        },
                        onClick: () => {
                          setModalVisible(true);
                        }
                      }}
                    />
                  </OnlyFolderOwner>
                </>
              )}
            </ButtonsBar>

            <FolderAssociatedUsers folder={currentFolder} />
          </div>
        }
      />
      {currentFolder && (
        <SendInvitationModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          folder={currentFolder}
        />
      )}
    </>
  );
};
