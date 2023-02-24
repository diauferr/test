import React from 'react';
import { ArticleType } from '../../../enums/ArticleType';
import { RadioSelect } from '../../../../../components/_inputs/RadioSelect';

interface IProps {
  value?: string;
  onChange: (value: any) => any;
}

export const ArticleTypeFilter = ({ value = '', onChange }: IProps) => (
  <RadioSelect
    value={value}
    options={[
      { text: 'Todos os tipos', value: ArticleType.TODOS },
      { text: 'Doutrina', value: ArticleType.DOUTRINA },
      { text: 'Jurisprudência', value: ArticleType.JURISPRUDENCIA }
    ]}
    onChange={onChange}
  />
);
