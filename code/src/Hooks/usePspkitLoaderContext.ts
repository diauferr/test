import { useContext } from 'react';
import { PspdfkitLoaderContext } from '../components/_shell/PspdfkitLoaderProvider/PspdfkitLoaderProvider';

export function usePspkitLoaderContext() {
  return useContext<{ loaded: boolean; userSettings: any }>(
    PspdfkitLoaderContext as any
  );
}
