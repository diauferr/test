/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import React, { useEffect, useState } from 'react';
import { Stage } from '../../../enums/Stage.enum';
import { useAuthCtx } from '../../../features/auth_v2/hooks/useAuthCtx';
import { useErrorLogger } from '../../../Hooks/useErrorLogger';
import { Loader } from './Loader';

declare var PSPDFKit;

const { REACT_APP_PSPDFKIT_LICENSE_KEY, REACT_APP_ENVIRONMENT } = process.env;

// @ts-ignore
export const PspdfkitLoaderContext = React.createContext();

export const PspdfkitLoaderProvider = ({ children }: any) => {
  const { is_authenticated } = useAuthCtx();
  const [loaded, setLoaded] = useState(false);
  const logError = useErrorLogger();

  useEffect(() => {
    if (is_authenticated()) {
      Loader.load(() => {
        console.info('pspdfkit loaded.');
        setLoaded(true);
        preInitializePdfComponent();
      }, logError);
    }
  }, [is_authenticated()]);

  function preInitializePdfComponent() {
    try {
      const pdfpdfKitConfig = {
        locale: 'pt',
        licenseKey: REACT_APP_PSPDFKIT_LICENSE_KEY,
        instant: false
      };

      if (
        REACT_APP_ENVIRONMENT === Stage.Production ||
        REACT_APP_ENVIRONMENT === Stage.Staging
      ) {
        if (PSPDFKit) {
          PSPDFKit.preloadWorker(pdfpdfKitConfig);
        } else {
          setTimeout(() => {
            if (PSPDFKit) {
              PSPDFKit.preloadWorker(pdfpdfKitConfig);
            }
          }, 1000);
        }
      }
    } catch (error) {
      console.warn('erro na pre inicializacao do psppdffkit.');
    }
  }

  return (
    <PspdfkitLoaderContext.Provider value={{ loaded, userSettings: {} }}>
      {children}
    </PspdfkitLoaderContext.Provider>
  );
};
