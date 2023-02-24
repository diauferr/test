/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import React from 'react';
import { MultipleFilteredSelect } from '../../../../../components/_inputs/MultipleFilteredSelect';
import { GlobalSearchRequests } from '../../../../../requests/search/GlobalSearchRequests';

interface IProps {
  onChange: (value: string) => any;
  value: string;
  placeholder: string;
  open: boolean;
}

export const AuthorsSelect = ({
  value = '',
  onChange,
  placeholder,
  open
}: IProps) => {
  const rows = '200';
  return (
    <MultipleFilteredSelect
      placeholder={placeholder}
      open={open}
      value={value}
      onChange={onChange}
      getOptions={async (words) =>
        GlobalSearchRequests.getAuthorsSuggestions(words, rows)
      }
    />
  );
};
