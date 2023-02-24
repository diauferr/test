import React from 'react';
import { Button, Icon, Modal } from 'antd';
import { Video } from '../../interfaces/Video';
import { dateLong } from '../../../../../util/i18n';

export const Bibliographic = ({ options }) => {
  const close = () => options.setShowBibliografy(false);

  const footer = [
    <Button type={'primary'} key={'btn-1'} onClick={close}>
      <Icon type="close" />
      Fechar
    </Button>
  ];

  const bibliographicReference = (item: Video) => {
    if (!Object.keys(item).length) return;

    const authors: string = item.tags
      .filter((e) => e.prefix === 'author')
      .map((e) => {
        const v = e.title.split(' ');
        const x = v.pop();
        return `${x.toUpperCase()}, ${v.join(' ')}`;
      })
      .join('; ');

    const title = `${item.title}. In`;
    const url = `${location.protocol}//${location.host}/video/${item.num_id}`;
    const linc = `son., color. Disponível ${url}.`;
    const date = dateLong(item.event_date);
    const accin = dateLong('');
    const acss = `Acesso em:  ${accin}`;

    return (
      <p>
        <span>{authors}. </span>
        <em>{title} </em>
        <span>{date} </span>
        <span>{linc} </span>
        <span>{acss} </span>
      </p>
    );
  };

  return (
    <Modal
      maskClosable={true}
      title="Referência Bibliográfica"
      visible={options.showBibliografy}
      onCancel={close}
      onOk={close}
      footer={footer}
      maskStyle={{ background: 'rgba(0,0,0,.2)' }}>
      {bibliographicReference(options.bibliografyItem)}
    </Modal>
  );
};
