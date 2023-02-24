import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export function useAuthCtx() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuthCtx deve ser usado dentro de AuthProvider');
  }

  return ctx;
}
