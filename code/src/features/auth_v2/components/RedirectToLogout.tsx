import React, { useEffect } from 'react';
import { useAuthCtx } from '../hooks/useAuthCtx';
import Loading from './Loading';

export const RedirectToLogout: React.FC = () => {
  const { logout } = useAuthCtx();

  useEffect(() => {
    logout();
  }, []);

  return <Loading />;
};
