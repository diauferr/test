import { Icon } from 'antd';
import React from 'react';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { Button } from '../Button';
import {
  ComponentWithContentMenu,
  IRenderProps
} from '../ContentMenu/ComponentWithContentMenu';
import { ContentMenuListItem } from '../ContentMenu/ContentMenuListItem';
import { createDefaultContentMenuOptions } from '../ContentMenu/createDefaultContentMenuOptions';
import { Modal } from '../Modal';

interface IProps {
  result: ContentSearchResult;
  modalIsVisible: boolean;
  onCancel: () => any;
}

export const ContentMenuModal = ({
  result,
  modalIsVisible,
  onCancel
}: IProps) => (
  <ComponentWithContentMenu result={result}>
    {({
      setFolderModalVisibility,
      setEmailModalVisibility,
      setQuoteModalVisibility,
      disabledOptions
    }: IRenderProps) => (
      <Modal
        title={'Menu de conteúdos'}
        visible={modalIsVisible}
        onCancel={onCancel}
        footer={[
          <Button onClick={onCancel} type="primary" key={'btnclose'}>
            <Icon type={'close'} />
            Fechar
          </Button>
        ]}>
        <ul style={{ padding: '1rem 0 ' }}>
          {createDefaultContentMenuOptions({
            onClickCallbacks: {
              setFolderModalVisibility,
              setEmailModalVisibility,
              setQuoteModalVisibility
            },
            disabledOptions
          }).map(({ icon, text, onClick }) => (
            <ContentMenuListItem
              key={text}
              style={{
                padding: '1rem'
              }}
              onClick={() => {
                onClick(true);
                onCancel();
              }}>
              <Icon type={icon} />
              {text}
            </ContentMenuListItem>
          ))}
        </ul>
      </Modal>
    )}
  </ComponentWithContentMenu>
);
