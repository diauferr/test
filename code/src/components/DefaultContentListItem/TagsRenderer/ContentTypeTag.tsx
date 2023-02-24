import React from 'react';
import { Tag } from '../../Tag';

interface IProps {
  children: string;
  otherProps?: any;
}

export const ContentTypeTag = ({ children, otherProps = {} }: IProps) => {
  const defaultColor = '#063a93';

  const colors = {
    artigos: '#c0392b',
    capítulo: '#c0392b',
    doutrina: '#2980b9',
    revista: '#4834d4',
    jurisprudência: '#16a085',
    vídeo: '#eb4d4b'
  };

  return (
    <Tag
      {...{
        children,
        color: colors[`${children}`.trim().toLocaleLowerCase()] || defaultColor
      }}
      {...otherProps}
    />
  );
};
