import { useEffect } from 'react';

export function useEffectIfNotNull(fun: () => any, dependencies: any[]) {
  useEffect(() => {
    if (dependencies.some((d) => !d)) return;

    return fun();
  }, dependencies);
}
