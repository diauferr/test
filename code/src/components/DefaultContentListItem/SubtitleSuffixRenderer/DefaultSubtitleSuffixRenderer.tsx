import React from 'react';
import { ISubtitleSuffixRendererProps } from './ISubtitleSuffixRendererProps';
import { ContentType } from '../../../enums/ContentType';
import imgSrc from '../../../assets/images/icon_external-link.png';

export const DefaultSubtitleSuffixRenderer = ({
  contentType,
  linkToParent
}: ISubtitleSuffixRendererProps) =>
  linkToParent ? (
    <>
      <span style={{ marginLeft: '0.5rem', color: 'orange' }}>
        Ver
        {contentType === ContentType.ARTICLE
          ? ' revista completa'
          : ' livro completo'}
      </span>
      <img
        src={imgSrc}
        style={{ width: 16, height: 16, margin: '0 0 .3rem .2rem' }}
      />
    </>
  ) : null;
