import { useContext } from 'react';
import { IMenuContextProvider } from '../context/IMenuContextProvider';
import { MenuContext } from '../context/MenuContextProvider';

export function useMenuContext() {
  const ctx = useContext<IMenuContextProvider>(MenuContext as any);

  return ctx;
}
