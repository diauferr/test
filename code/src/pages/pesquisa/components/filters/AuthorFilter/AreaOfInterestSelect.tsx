import React from 'react';
import { AreaOfInterest } from '../../../enums/AreaOfInterest';
import { MultipleFilteredSelect } from '../../../../../components/_inputs/MultipleFilteredSelect';

interface IProps {
  open: boolean;
  value: string;
  onChange: (value: string) => any;
}

export const AreaOfInterestSelect = ({ value, onChange, open }: IProps) => (
  <MultipleFilteredSelect
    onChange={onChange}
    open={open}
    value={value}
    placeholder={'Digite a área de interesse...'}
    options={[
      { value: AreaOfInterest.Administrativo, text: 'Administrativo' },
      { value: AreaOfInterest.Ambiental, text: 'Ambiental' },
      { value: AreaOfInterest.Civil, text: 'Civil' },
      { value: AreaOfInterest.Constitucional, text: 'Constitucional' },
      { value: AreaOfInterest.Criminal, text: 'Criminal' },
      { value: AreaOfInterest.Economico, text: 'Econômico' },
      { value: AreaOfInterest.Eleitoral, text: 'Eleitoral' },
      { value: AreaOfInterest.Empresarial, text: 'Empresarial' },
      { value: AreaOfInterest.Financeiro, text: 'Financeiro' },
      { value: AreaOfInterest.GestaoPublica, text: 'Gestão Pública' },
      { value: AreaOfInterest.Internacional, text: 'Internacional' },
      { value: AreaOfInterest.DireitoMunicipal, text: 'Municipal' },
      { value: AreaOfInterest.Penal, text: 'Penal' },
      { value: AreaOfInterest.Previdenciario, text: 'Previdenciário' },
      { value: AreaOfInterest.Processual, text: 'Processual' },
      { value: AreaOfInterest.TemasVariados, text: 'Temas Variados' },
      { value: AreaOfInterest.Trabalhista, text: 'Trabalhista' },
      { value: AreaOfInterest.Tributario, text: 'Tributário' },
      { value: AreaOfInterest.Urbanistico, text: 'Urbanístico' }
    ]}
  />
);
