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

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useDoRequest } from '../../../../../Hooks/useDoRequest';
import { MultipleSelect } from '../../../../../components/_inputs/MultipleSelect';
import { LegislationSearchRequests } from '../../../../../requests/search/LegislationSearchRequests';
import { optionsparseSelectOptionsIdTitle } from '../../../../../util/parseSelectOptions';

interface IProps {
  open: boolean;
  value?: string;
  onChange: (value: string) => any;
}

export const LegislationSerieSuggestion = ({
  value = '',
  onChange,
  open
}: IProps) => {
  const [result, , , exec] = useDoRequest();
  const optionsResult: any = result || [];

  useEffect(() => {
    exec(() => LegislationSearchRequests.getLegislationSerieSuggestion());
  }, []);

  return (
    <MultipleSelect
      value={value}
      options={optionsparseSelectOptionsIdTitle(result)}
      onChange={onChange}
    />
  );
};
