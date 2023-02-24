import React from 'react';
import { MultipleFilteredSelect } from '../../../../../components/_inputs/MultipleFilteredSelect';
import { LegislationSearchRequests } from '../../../../../requests/search/LegislationSearchRequests';

interface IProps {
  open: boolean;
  value: string;
  onChange: (value: any) => any;
}

export const LegislationSelect = ({ value = '', onChange, open }: IProps) => (
  <MultipleFilteredSelect
    open={open}
    placeholder={'Digite o nome da legislação comentada...'}
    value={value}
    onChange={onChange}
    getOptions={async (words) =>
      LegislationSearchRequests.getLegislationSuggestions(words)
    }
  />
);
