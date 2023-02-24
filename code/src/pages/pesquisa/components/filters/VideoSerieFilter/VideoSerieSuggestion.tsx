import React, { useEffect } from 'react';
import { useDoRequest } from '../../../../../Hooks/useDoRequest';
import { MultipleSelect } from '../../../../../components/_inputs/MultipleSelect';
import { VideoSearchRequests } from '../../../../../requests/search/VideoSearchRequests';
import { optionsparseSelectOptionsIdTitle } from '../../../../../util/parseSelectOptions';

interface IProps {
  value?: string;
  onChange: (value: any) => any;
}

export const VideoSerieSuggestion = ({ value = '', onChange }: IProps) => {
  const [result, , , exec] = useDoRequest();

  useEffect(() => {
    exec(() => VideoSearchRequests.getVideoSerieSuggestion());
  }, []);

  return (
    <MultipleSelect
      value={value}
      options={optionsparseSelectOptionsIdTitle(result)}
      onChange={onChange}
    />
  );
};
