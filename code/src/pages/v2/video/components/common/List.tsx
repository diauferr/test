import React, { useState } from 'react';
import styled from 'styled-components';
import { Image } from './Image';
import { Author } from './Author';
import { Tags } from './Tags';
import { Events } from './Events';
import { Description } from './Description';
import { Video } from '../../interfaces/Video';
import { Year } from './Year';
import { Link } from 'react-router-dom';
import { Bibliographic } from './Bibliographic';
import { Button } from 'antd';
import { ReferenceBtns } from '../../styles';
import { AddToFolder } from './AddToFolder';

const Container = styled.div`
  max-width: 1024px;
  display: flex;
  margin-bottom: 32px;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Left = styled.div`
  margin-right: 32px;
`;

const Right = styled.div`
  @media (max-width: 1024px) {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Infos = styled.div`
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 16px !important;

  * {
    font-weight: 500 !important;
  }

  @media (max-width: 1024px) {
    font-size: 14px !important;
    text-align: center;
  }
`;

export const List = ({ items }) => {
  const [showBibliografy, setShowBibliografy] = useState<boolean>(false);
  const [bibliografyItem, setBibliografyItem] = useState<Video | unknown>({});
  const [showAddToFolder, setShowAddToFolder] = useState<boolean>(false);
  const [folderItem, setFolderItem] = useState<Video | unknown>({});

  if (!items) return;

  const openBibliografy = (item: Video) => {
    setBibliografyItem(item);
    setShowBibliografy(true);
  };

  const openAddToFolder = (item: Video) => {
    setShowAddToFolder(true);
    setFolderItem(item);
  };

  const link = (item: Video) => `/conteudo/videos/${item.num_id}`;

  return items.map((item: Video, index: number) => (
    <div key={index}>
      <Container>
        <Left>
          <Link to={link(item)}>
            <Image item={item} />
          </Link>
        </Left>
        <Right>
          <Title>
            <Link
              to={link(item)}
              dangerouslySetInnerHTML={{
                __html: item.highlight_title || item.title
              }}
              style={{ fontWeight: 'bold', color: '#000000' }}
            />
          </Title>
          <Infos>
            <Year item={item} />
            <Author item={item} />
            <Tags item={item} />
            <Events item={item} />
          </Infos>
          <Description item={item} />
          <ReferenceBtns>
            <Button onClick={() => openAddToFolder(item)} icon="folder">
              Adicionar à pasta
            </Button>
            <Button onClick={() => openBibliografy(item)} icon="edit">
              Referência bibliográfica
            </Button>
          </ReferenceBtns>
        </Right>
      </Container>
      <Bibliographic
        options={{
          showBibliografy,
          setShowBibliografy,
          bibliografyItem
        }}
      />
      <AddToFolder
        options={{
          showAddToFolder,
          setShowAddToFolder,
          folderItem
        }}
      />
    </div>
  ));
};
