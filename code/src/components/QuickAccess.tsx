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

import { Avatar } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProductType } from '../enums/ProductType';
import { useAuthCtx } from '../features/auth_v2/hooks/useAuthCtx';
import { useContractedProducts } from '../Hooks/useContractedProducts';

export const QuickAccess = () => {
  const { hasAccessToProduct } = useContractedProducts();
  const { is_authenticated_by } = useAuthCtx();

  const available_items = items.filter((m) => hasAccessToProduct(m.type));

  if (is_authenticated_by('auth0') || is_authenticated_by('sso')) {
    available_items.push({
      type: 'Folder' as unknown as ProductType,
      name: 'Pastas',
      link: `/pastas`,
      icon: '/assets/images/folder.svg'
    });
  }

  if (available_items.length > 2) {
    available_items.unshift({
      type: 'All' as unknown as ProductType,
      name: 'Todos',
      link: '/pesquisa/todos',
      icon: '/assets/images/alert-icon.svg'
    });
  }

  return (
    <Container>
      {available_items.map((m, index: number) => (
        <QuickAccessItem key={m.icon}>
          <Link to={m.link}>
            <div className="div-items">
              <Avatar>
                <img src={m.icon} alt={m.name} />
              </Avatar>
              <span className="label">{m.name}</span>
            </div>
          </Link>
        </QuickAccessItem>
      ))}
    </Container>
  );
};

const { REACT_APP_NEW_BOOK_VERSION } = process.env;
const newBookVersion = String(REACT_APP_NEW_BOOK_VERSION) === 'true';

const items = [
  {
    type: ProductType.Periodics,
    name: 'Revistas',
    link: '/pesquisa/revistas',
    icon: '/assets/images/article-2.svg'
  },
  {
    type: ProductType.Books,
    name: 'Livros',
    link: newBookVersion ? `/conteudo/livros` : `/pesquisa/livros`,
    icon: '/assets/images/book-2.svg'
  },
  {
    type: ProductType.Videos,
    name: 'Vídeos',
    link: `/conteudo/videos`,
    icon: '/assets/images/video-camera.svg'
  },
  {
    type: ProductType.Codes,
    name: 'Códigos',
    link: '/pesquisa/codigos',
    icon: '/assets/images/auction.svg'
  },
  {
    type: ProductType.Clipping,
    name: 'Informativos',
    link: '/pesquisa/informativos',
    icon: '/assets/images/megaphone-2.svg'
  }
];

const Container = styled.div`
  margin-top: 2rem;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-row-gap: 1rem;
  width: 100%;
  max-width: 600px;

  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const QuickAccessItem = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 1.3rem;

  .ant-avatar {
    margin: 0.5rem auto;
    background: white;
    border: 2px solid #cecece;
    padding: 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;

    img {
      width: 18px;
      height: 18px;
    }
  }

  .anticon {
    color: #cecece;
  }

  .label {
    font-weight: 600;
    font-size: 0.9rem;
    color: #999;
    transition: all 0.4s;
  }

  &:hover {
    .label {
      color: var(--primary-color-dark);
    }

    .anticon {
      color: var(--primary-color-dark);
    }
    .ant-avatar {
      border: 2px solid var(--primary-color-dark);
    }
  }
`;
