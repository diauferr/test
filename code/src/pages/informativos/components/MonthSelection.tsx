import React from 'react';

interface IProps {
  value: string;
  onChange: (evt: any) => any;
}

export const MonthSelection = ({ value, onChange }: IProps) => (
  <select {...{ value, onChange }} className={'select'}>
    <option value="01">janeiro</option>
    <option value="02">fevereiro</option>
    <option value="03">março</option>
    <option value="04">abril</option>
    <option value="05">maio</option>
    <option value="06">junho</option>
    <option value="07">julho</option>
    <option value="08">agosto</option>
    <option value="09">setembro</option>
    <option value="10">outubro</option>
    <option value="11">novembro</option>
    <option value="12">dezembro</option>
  </select>
);
