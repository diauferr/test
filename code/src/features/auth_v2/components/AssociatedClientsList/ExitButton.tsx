import React from 'react';
import { useAuthCtx } from '../../hooks/useAuthCtx';
interface IProps {}

export const ExitButton: React.FC<IProps> = ({}) => {
  const { logout } = useAuthCtx();

  return (
    <button
      {...{
        className: 'btn-logout',
        onClick: () => {
          logout();
        },
        style: {
          marginTop: 16
        }
      }}>
      Sair
    </button>
  );
};
