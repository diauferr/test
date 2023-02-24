import { useContext } from 'react';
import { IFolderContextProviderValue } from '../context/IFolderContextProviderValue';
import { FolderContext } from '../context/FolderContextProvider';

export function useFolderContext() {
  const ctx = useContext<IFolderContextProviderValue>(FolderContext as any);
  return ctx;
}
