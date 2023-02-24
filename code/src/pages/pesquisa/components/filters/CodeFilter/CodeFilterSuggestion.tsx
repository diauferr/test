import React, { useEffect } from 'react';
import { useDoRequest } from '../../../../../Hooks/useDoRequest';
import { MultipleFilteredSelect } from '../../../../../components/_inputs/MultipleFilteredSelect';
import { CodeSearchRequests } from '../../../../../requests/search/CodeSearchRequest';
import { optionsparseSelectOptionsIdTitle } from '../../../../../util/parseSelectOptions';

interface IProps {
  open: boolean;
  value?: string;
  onChange: (value: string) => any;
}

export const CodeFilterSuggestion = ({
  value = '',
  onChange,
  open
}: IProps) => {
  const [result, , , exec] = useDoRequest();

  useEffect(() => {
    exec(() => CodeSearchRequests.getCodeFilterSuggestion());
  }, []);

  return !!result ? (
    <MultipleFilteredSelect
      placeholder={'Digite o nome do código...'}
      open={open}
      value={value}
      onChange={onChange}
      options={optionsparseSelectOptionsIdTitle(result)}
    />
  ) : null;
};
