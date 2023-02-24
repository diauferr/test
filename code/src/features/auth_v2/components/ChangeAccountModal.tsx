import { Modal } from 'antd';
import React from 'react';
import { ChangeAccountFlow } from '../flows/ChangeAccountFlow';

interface IProps {
  visible: boolean;
  onCancel: () => void;
}

export const ChangeAccountModal: React.FC<IProps> = ({ visible, onCancel }) => (
  <Modal
    title="Selecionar conta"
    visible={visible}
    onCancel={onCancel}
    footer={null}
    centered={true}
    bodyStyle={{
      maxHeight: '90vh',
      minHeight: 200,
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    }}>
    <ChangeAccountFlow />
  </Modal>
);
