import React from 'react';
import { List } from 'antd';
import { ClickableListItem } from './ClickableListItem';
import { ScrollableContent } from '../_templates/ScrollableContent';

interface IProps {
  label?: string;
  value: string;
  options: ISelectOption[];
  onChange: (value: string) => any;
}

export interface ISelectOption {
  value: any;
  text: string;
}

export const MultipleSelect = ({ label, value, options, onChange }: IProps) => {
  function decodeValue(valueAsString: string) {
    return `${valueAsString}`.split(',').filter((v) => !!v);
  }

  const parsedValue = decodeValue(value);

  function encodeValue(valueAsArray: string[] = []) {
    return valueAsArray.filter((v) => !!v).join(',');
  }

  function onItemClick(checked: boolean, value: string) {
    if (!checked) {
      onChange(encodeValue(parsedValue.concat(`${value}`)));
    } else {
      onChange(encodeValue(parsedValue.filter((v) => `${v}` !== `${value}`)));
    }
  }
  return (
    <>
      {label && <label>{label}</label>}

      <ScrollableContent height={200}>
        <List
          itemLayout="horizontal"
          dataSource={options}
          renderItem={(option: ISelectOption) => {
            const checked = parsedValue.some(
              (v) => `${v}` === `${option.value}`
            );
            return (
              <ClickableListItem
                onClick={() => onItemClick(checked, option.value)}>
                <List.Item.Meta
                  avatar={
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onItemClick(checked, option.value)}
                    />
                  }
                  description={option.text}
                />
              </ClickableListItem>
            );
          }}
        />
      </ScrollableContent>
    </>
  );
};
