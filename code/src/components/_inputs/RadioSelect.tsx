import React from 'react';
import { List } from 'antd';
import { ClickableListItem } from './ClickableListItem';

interface IProps {
  value: string;
  options: ISelectOption[];
  onChange: (value: string) => any;
}

interface ISelectOption {
  value: any;
  text: string;
}

export const RadioSelect = ({ value, options, onChange }: IProps) => (
  <List
    itemLayout="horizontal"
    dataSource={options}
    renderItem={(option: ISelectOption) => {
      const checked = `${option.value}` === `${value}`;

      return (
        <ClickableListItem onClick={() => onChange(option.value)}>
          <List.Item.Meta
            avatar={
              <input
                type="radio"
                checked={checked}
                onClick={() => onChange(option.value)}
                onChange={() => {}}
              />
            }
            description={option.text}
          />
        </ClickableListItem>
      );
    }}
  />
);
