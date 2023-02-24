/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useDoRequest } from '../../../../../Hooks/useDoRequest';
import { MultipleSelect } from '../../../../../components/_inputs/MultipleSelect';
import { BookSearchRequests } from '../../../../../requests/search/BookSearchRequests';
import { optionsparseSelectOptionsIdTitle } from '../../../../../util/parseSelectOptions';

interface IProps {
  open: boolean;
  value?: string;
  onChange: (value: string) => any;
}

export const BookSerieSuggestion = ({ value = '', onChange, open }: IProps) => {
  const [result, , , exec] = useDoRequest();

  useEffect(() => {
    exec(() => BookSearchRequests.getBookSerieSuggestion());
  }, []);

  return (
    <MultipleSelect
      value={value}
      options={optionsparseSelectOptionsIdTitle(result)}
      onChange={onChange}
    />
  );
};
