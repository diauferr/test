import React from 'react';
import Loading from './Loading';

interface IProps {}

export const LoadingSessionMessage: React.FC<IProps> = ({}) => (
  <Loading
    {...{
      text: 'carregando sessão...'
    }}
  />
);
