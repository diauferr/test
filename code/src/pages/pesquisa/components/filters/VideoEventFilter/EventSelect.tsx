import React, { useEffect } from 'react';
import { useDoRequest } from '../../../../../Hooks/useDoRequest';
import { MultipleFilteredSelect } from '../../../../../components/_inputs/MultipleFilteredSelect';
import { VideoSearchRequests } from '../../../../../requests/search/VideoSearchRequests';
import { optionsparseSelectOptionsIdTitle } from '../../../../../util/parseSelectOptions';

interface IProps {
  open: boolean;
  value: string;
  onChange: (value: any) => any;
}

export const EventSelect = ({ value = '', onChange, open }: IProps) => {
  const [result, , , exec] = useDoRequest();

  useEffect(() => {
    exec(() => VideoSearchRequests.getVideoSuggestions());
  }, []);

  return !!result ? (
    <MultipleFilteredSelect
      placeholder={'Digite o nome do evento...'}
      open={open}
      value={value}
      onChange={onChange}
      options={optionsparseSelectOptionsIdTitle(result)}
    />
  ) : null;
};
