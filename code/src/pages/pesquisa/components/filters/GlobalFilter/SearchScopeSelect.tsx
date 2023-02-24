import React from 'react';
import { RadioSelect } from '../../../../../components/_inputs/RadioSelect';
import { SearchScope } from '../../../enums/SearchScope';

interface IProps {
  value?: string;
  onChange: (value: string) => any;
}

export const SearchScopeRadio = ({ value = '', onChange }: IProps) => (
  <RadioSelect
    value={value}
    options={[
      { text: 'Todo o conteúdo', value: SearchScope.ALL },
      { text: 'Somente no título', value: SearchScope.ONLY_TITLE }
    ]}
    onChange={onChange}
  />
);
