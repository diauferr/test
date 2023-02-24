import { ReactElement } from 'react';
import { useAuthCtx } from '../../../features/auth_v2/hooks/useAuthCtx';
import { useFolderContext } from '../hooks/useFolderContext';

interface IProps {
  children: ReactElement;
}

export const OnlyFolderOwner = ({ children }: IProps) => {
  const { session } = useAuthCtx();
  const ctx = useFolderContext();
  const folder = ctx.state.currentFolder;

  if (!folder) {
    return null;
  }

  return folder.owner === session.email ? children : null;
};
