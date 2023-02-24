import React from 'react';
import { Modal } from 'antd';
import { Loading } from '../_shell/Loading';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .ant-modal-header {
    display: flex;
    justify-content: center;
  }

  .ant-modal-close {
    display: none;
  }

  .ant-modal-body {
    display: flex;
    justify-content: center;
    padding: 1rem;

    svg {
      width: 60px;
      height: 60px;
    }
  }
`;

interface IProps {
  modalIsVisible: boolean;
  onCancel: () => any;
}

export const PrintModalLoading = ({ modalIsVisible, onCancel }: IProps) => (
  <StyledModal
    title="Carregando documento"
    visible={modalIsVisible}
    footer={null}
    onCancel={onCancel}>
    <Loading />
  </StyledModal>
);
