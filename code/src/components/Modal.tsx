import React from 'react';
import { Modal as AntModal } from 'antd';
import { createGlobalStyle } from 'styled-components';

const GlobalOverrides = createGlobalStyle`
    .ant-modal {
      top:  0 ;
      border: 0 !important; 
    }
    
    .ant-modal-close-icon {
      color: #fff;
    }
    
    .ant-modal-header{
      padding: 1rem;
      background: #2c3e50;
    }
    
    .ant-modal-title {
      color: #fff;
      font-weight: 700;
      font-family: var(--title-font-family) !important;
    }
    
    .ant-modal-wrap  {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .ant-modal-footer {
      height: 4rem;
    }
    
    .ant-modal-body{
      padding: 0;
    }
`;

export const Modal = (props: any) => (
  <>
    <AntModal
      {...props}
      maskStyle={{
        background: 'rgba(0,0,0,.2)'
      }}
      style={{
        paddingBottom: 0
      }}
    />
    <GlobalOverrides />
  </>
);
