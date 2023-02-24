import { Icon } from 'antd';
import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ContentTypeTag } from '../../../components/DefaultContentListItem/TagsRenderer/ContentTypeTag';
import { DefaultListItem } from '../../../components/DefaultListItem/DefaultListItem';
import { PdfIcon } from '../../../components/PdfIcon';
import { ArticleType } from '../../pesquisa/enums/ArticleType';

interface IProps {
  article: any;
  active?: boolean;
  onClick?: () => any;
  Menu?: ReactNode;
  link: string;
}

const H4 = styled.h4`
  margin-bottom: 0;
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;

  i {
    margin-right: 7px;

    svg {
      width: 14px;
    }
  }
  span {
    font-size: 0.85rem;
  }
`;

export const ArticleListItem = ({
  article,
  active = false,
  onClick,
  Menu,
  link
}: IProps) => {
  function getArticleType(articleType: ArticleType) {
    if (articleType === ArticleType.DOUTRINA) {
      return 'Doutrina';
    }

    if (articleType === ArticleType.JURISPRUDENCIA) {
      return 'Jurisprudência';
    }

    return '';
  }

  const articleType = getArticleType(article.articleType);
  return (
    <DefaultListItem
      className={'article-list-item'}
      active={active}
      border={true}
      Leading={<PdfIcon />}
      Content={
        <>
          <H4>
            <NavLink to={link}>
              {!!article.titlePresentation
                ? article.titlePresentation
                : article.title}
            </NavLink>
          </H4>
          {article.author && (
            <AuthorContainer>
              <Icon type={'user'} />
              <span>{article.author}</span>
            </AuthorContainer>
          )}
          {articleType && (
            <div style={{ marginTop: 5 }}>
              <ContentTypeTag>{articleType}</ContentTypeTag>
            </div>
          )}
        </>
      }
      onClick={onClick}
      Trailling={Menu}
    />
  );
};
