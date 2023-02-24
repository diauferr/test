import React from 'react';
import { MultipleFilteredSelect } from '../../../../../components/_inputs/MultipleFilteredSelect';
import { BookSearchRequests } from '../../../../../requests/search/BookSearchRequests';

interface IProps {
  open: boolean;
  value: string;
  onChange: (value: any) => any;
}

export const BookSelect = ({ value = '', onChange, open }: IProps) => {
  const rows = '200';
  return (
    <MultipleFilteredSelect
      open={open}
      placeholder={'Digite o nome do livro...'}
      value={value}
      onChange={onChange}
      getOptions={async (words) =>
        BookSearchRequests.getBookSuggestions(words, rows)
      }
    />
  );
};
