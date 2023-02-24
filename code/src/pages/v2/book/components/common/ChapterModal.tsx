import React from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import iconChapter from '../../../../../assets/images/icon-chapter.svg';

const StyledModal = styled(Modal)`
  .ant-modal-header {
    padding: 16px 24px !important;
    color: rgba(0, 0, 0, 0.65) !important;
    background: #fff !important;
    border-bottom: 1px solid #e8e8e8 !important;
    border-radius: 4px 4px 0 0 !important;
  }
  .ant-modal-title {
    margin: 0 !important;
    color: rgba(0, 0, 0, 0.85) !important;
    font-weight: 500 !important;
    font-size: 16px !important;
    line-height: 22px !important;
    word-wrap: break-word !important;
  }
  .ant-modal-body {
    padding: 24px !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
    word-wrap: break-word !important;
  }
`;

const HighlightModal = styled.div`
  max-width: 1000px;
  em {
    background: rgba(255, 255, 0, 0.3) !important;
  }
`;

const HighlightModalContainer = styled.div`
  padding: 12px;
  border-left: 3px solid #d7282f;
  margin-bottom: 10px;
  b {
    font-size: 16px;
  }
`;

const HighlightModalTitle = styled.h2`
  text-transform: uppercase;
  font-size: 14px !important;
  color: #2f2f2f !important;
  * {
    font-weight: 500 !important;
  }
`;

export const ChapterModal = ({
  showModal,
  toggleModal,
  modalData,
  link,
  currentItem
}) => (
  <StyledModal
    title={'Ocorrências'}
    centered
    bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
    visible={showModal}
    width={800}
    onCancel={() => toggleModal([], {})}
    footer={[
      <Button
        key={`chapter-modal-button`}
        onClick={(e) => {
          e.preventDefault();
          toggleModal([], {});
        }}>
        Ok
      </Button>
    ]}>
    {modalData.map((bc, i) => (
      <HighlightModal key={`highlight-modal-${i}`}>
        <HighlightModalContainer key={`highlight-container-modal-${i}`}>
          <HighlightModalTitle>
            <Link to={link(currentItem, bc.chapter_id)}>
              <img src={iconChapter} style={{ marginRight: '4px' }} />{' '}
              {bc.chapter_title}
            </Link>
          </HighlightModalTitle>
          {bc.txts.map((t, index) => (
            <div
              key={`content-modal-${index}`}
              className="description highlight_description"
              dangerouslySetInnerHTML={{
                __html: `<b>“</b>${t}...<b>”</b>`
              }}
            />
          ))}
        </HighlightModalContainer>
      </HighlightModal>
    ))}
  </StyledModal>
);
