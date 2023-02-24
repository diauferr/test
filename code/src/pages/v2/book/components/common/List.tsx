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

/* eslint-disable indent */
import React, { useState } from 'react';
import { Button } from 'antd';
import { Image } from './Image';
import { Author } from './Author';
import { Tags } from './Tags';
import { Description } from './Description';
import { Book } from '../../interfaces/Book';
import { Year } from './Year';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import iconChapter from '../../../../../assets/images/icon-chapter.svg';
import { ContentMenuHorizontal } from '../../../../../components/ContentMenu/ContentMenuHorizontal';
import { ContentSearchResult } from '../../../../../models/ContentSearchResult';
import { ContentType } from '../../../../../enums/ContentType';
import { ChapterModal } from './ChapterModal';

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

const Highlight = styled.div`
  max-width: 1000px;
  padding-left: 212px;

  em {
    background: rgba(255, 255, 0, 0.3) !important;
  }
`;

const HighlightContainer = styled.div`
  padding: 12px;
  border-left: 3px solid #d7282f;
  margin-bottom: 10px;
  b {
    font-size: 16px;
  }
`;

const HighlightRight = styled.div`
  margin-top: -32px;
  .filter-btn {
    background: none transparent;
    border: 2px solid #003a70;
    color: #003a70;
    min-width: min-content;
    width: auto;
    outline: none;
    border-radius: 12px;
    font-weight: 500;
    padding: 11px 20px;
    margin: 0 10px 0 0;
    height: auto;
    line-height: 1;
    font-size: 14px;
    position: relative;

    &:hover,
    &:focus,
    &:active {
      border: 2px solid #003a70;
      color: #003a70;
    }
  }
  @media (max-width: 1024px) {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const HighlightTitle = styled.h2`
  text-transform: uppercase;
  font-size: 14px !important;
  color: #2f2f2f !important;
  * {
    font-weight: 500 !important;
  }
`;

const ButtonContainer = styled.div`
  padding: 12px;
  padding-left: 0;
  margin-top: 25px;
  margin-bottom: 10px;
`;

export const List = ({ items }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<any[]>([]);
  const [currentItem, setCurrentItem] = useState<any>({});

  if (!items) return;

  const link = (item: Book, chapterId?: string) =>
    `/livro/${String(item.id).split('-').join('/')}${
      chapterId ? `/${chapterId}?searchpage=1` : ''
    }`;

  const toggleModal = (data: any[], item: Partial<Book>) => {
    setShowModal(!showModal);
    setModalData(data);
    setCurrentItem(item);
  };

  const getContentResult = (item: Book) => {
    const itemId = item.id.split('-');
    const bookId = Number(itemId[0] || 0);
    const editionId = Number(itemId[1] || 0);
    const base = `https://${process.env.REACT_APP_PUBLIC_BUCKET}.s3-sa-east-1.amazonaws.com`;
    const imgUrl = `books/cover/${bookId}/editions/${editionId}.jpg`;
    const authors = item.tags
      .filter((t) => t.id.includes('author'))
      .map((t) => t.title);
    const year = String(new Date(item.publish_date).getFullYear());
    return new ContentSearchResult(
      ContentType.BOOK,
      bookId,
      `${item.text_2}`,
      null,
      item.text_3,
      null,
      editionId,
      null,
      `${base}/${imgUrl}`,
      authors.join(', '),
      null,
      year,
      ''
    );
  };

  const bookContents: any[] = [];
  if (items && items.length) {
    for (const item of items) {
      if (item && item.highlight_contents && item.highlight_contents.length) {
        for (const c of item.highlight_contents) {
          const highlight = c.highlight && c.highlight[0] ? c.highlight[0] : '';
          if (!highlight) continue;
          const content = item.contents.find(
            (cp: any) => cp.chapter_id === c.chapter_id
          );
          if (!content) {
            continue;
          }
          const contentExists = bookContents.find(
            (bc: any) =>
              bc.book_id === item.id && bc.chapter_id === c.chapter_id
          );
          if (contentExists) {
            contentExists.txts.push(highlight);
            continue;
          }
          bookContents.push({
            book_id: item.id,
            chapter_id: c.chapter_id,
            chapter_title: content.chapter_title,
            page: c.page,
            txts: [highlight]
          });
        }
      }
    }
  }

  return (
    <>
      <ChapterModal
        key={`chapter-modal`}
        showModal={showModal}
        toggleModal={toggleModal}
        modalData={modalData}
        link={link}
        currentItem={currentItem}
      />
      {items.map((item: Book, index: number) => {
        const bookContent =
          bookContents && bookContents.length
            ? bookContents.filter((b) => b.book_id === item.id)
            : [];
        let isTxtsHide = false;
        bookContent.forEach((b) => {
          if (b.txts && b.txts.length > 3) isTxtsHide = true;
        });
        return (
          <div key={index} style={index !== 0 ? { marginTop: '45px' } : {}}>
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
                      __html:
                        item &&
                        item.highlight_text_4 &&
                        item.highlight_text_4[0]
                          ? item.highlight_text_4[0]
                          : item.text_4
                    }}
                    style={{ fontWeight: 'bold', color: '#000000' }}
                  />
                </Title>
                <Infos>
                  <Year item={item} />
                  <Author item={item} />
                  <Tags item={item} />
                </Infos>
                <Description item={item} />
                <ContentMenuHorizontal result={getContentResult(item)} />
              </Right>
            </Container>
            {bookContent && bookContent.length ? (
              <HighlightRight>
                <Highlight>
                  {bookContent
                    .filter((_, idx) => idx <= 2)
                    .map((bc, i) => (
                      <HighlightContainer key={`highlight-container-${i}`}>
                        <HighlightTitle>
                          <Link to={link(item, bc.chapter_id)}>
                            <img
                              src={iconChapter}
                              style={{ marginRight: '4px' }}
                            />{' '}
                            {bc.chapter_title}
                          </Link>
                        </HighlightTitle>
                        {bc.txts
                          .filter((_, idx) => idx <= 2)
                          .map((t, index) => (
                            <div
                              key={`content-${index}`}
                              className="description highlight_description"
                              dangerouslySetInnerHTML={{
                                __html: `<b>“</b>${t}...<b>”</b>`
                              }}
                            />
                          ))}
                        {bc.txts && bc.txts.length > 3 ? (
                          <div className="description highlight_description">
                            ...
                          </div>
                        ) : (
                          <></>
                        )}
                      </HighlightContainer>
                    ))}
                </Highlight>
              </HighlightRight>
            ) : (
              <></>
            )}
            {(bookContent && bookContent.length && bookContent.length > 3) ||
            isTxtsHide ? (
              <HighlightRight>
                <Highlight>
                  <ButtonContainer>
                    <Button
                      className="filter-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleModal(bookContent, item);
                      }}>
                      Ver mais
                    </Button>
                  </ButtonContainer>
                </Highlight>
              </HighlightRight>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </>
  );
};
