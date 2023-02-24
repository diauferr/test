import React from 'react';
import { Message } from './Message';
import { Icon } from 'antd';

export const ErrorMessage = (props: any) => (
  <div className={'animated shake'}>
    <Message
      containerStyle={{
        borderColor: 'red',
        background: '#fff7f7'
      }}
      Icon={
        <Icon
          type="exclamation-circle"
          theme="twoTone"
          style={{ fontSize: 22 }}
          twoToneColor="#ff0000"
        />
      }
      children={props.children}
    />
  </div>
);
