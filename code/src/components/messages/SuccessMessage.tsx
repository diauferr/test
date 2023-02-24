import React from 'react';
import { Message } from './Message';
import { Icon } from 'antd';

export const SuccessMessage = (props: any) => (
  <div className={'animated fadeInUp'}>
    <Message
      containerStyle={{
        borderColor: '#52c41a',
        background: '#fff'
      }}
      Icon={
        <Icon
          type="check-circle"
          theme="twoTone"
          style={{ fontSize: 22 }}
          twoToneColor="#52c41a"
        />
      }
      children={props.children}
    />
  </div>
);
