import { Button, Icon, Modal } from 'antd';
import React from 'react';
import { FolderSelectionModal } from '../../../../../components/ContentMenu/FolderSelection/FolderSelectionModal';
import { ContentType } from '../../../../../enums/ContentType';
import { ContentSearchResult } from '../../../../../models/ContentSearchResult';
import { ArticleType } from '../../../../pesquisa/enums/ArticleType';
import { Video } from '../../interfaces/Video';

export const AddToFolder = ({ options }) => {
  const getResult = (it: Video) => {
    if (!Object.keys(it).length) return;

    return {
      url: '',
      subTitle: '',
      formattedDate: '',
      total: 0,
      parentId: 0,
      editionId: 0,
      relevantWords: null,
      contentType: ContentType.VIDEO,
      articleType: ArticleType.TODOS,
      id: Number(it.num_id),
      title: it.title,
      text: it.description,
      tags: [{ text: 'Vídeo', color: 'red' }],
      img: `https://${process.env.REACT_APP_PUBLIC_BUCKET}.s3-sa-east-1.amazonaws.com/${it.image}`,
      author: it.tags
        .filter((e) => e.prefix === 'author')
        .map((e) => e.title)
        .join(', '),
      areasInterest: it.tags
        .filter((e) => e.prefix === 'area-interest')
        .map((e) => e.title)
        .join(', ')
    };
  };

  const close = () => {
    options.setShowAddToFolder(false);
  };

  const footer = [
    <Button type={'primary'} key={'btn-1'} onClick={close}>
      <Icon type="close" />
      Fechar
    </Button>
  ];

  const result: ContentSearchResult = getResult(options.folderItem);

  return (
    <Modal
      maskClosable={true}
      title="Adicionar à pasta"
      visible={options.showAddToFolder}
      onCancel={close}
      onOk={close}
      footer={footer}
      maskStyle={{ background: 'rgba(0,0,0,.2)' }}>
      <FolderSelectionModal
        result={result}
        visible={options.showAddToFolder}
        onCancel={close}
      />
    </Modal>
  );
};
