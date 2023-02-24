import { useCallback } from 'react';

import { getErrorLogger } from '../util/ErrorLogger/getErrorLogger';

export function useErrorLogger() {
  return useCallback((error: any) => {
    const logger = getErrorLogger();

    logger.log(error);
  }, []);
}
