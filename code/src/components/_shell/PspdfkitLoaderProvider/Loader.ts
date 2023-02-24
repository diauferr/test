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

const { REACT_APP_PSPDFKIT_PRIMARY_URL, REACT_APP_PSPDFKIT_SECONDARY_URL } =
  process.env;

export class Loader {
  private static loadScriptsCalled = false;

  private static loadScriptsSuccessfully = false;

  static load(callback: () => any, logError: (error: any) => any) {
    if (Loader.loadScriptsCalled) {
      if (Loader.loadScriptsSuccessfully) {
        callback();
      }
    } else {
      console.info('loading pspdfkit');
      Loader.loadScriptsCalled = true;

      const onLoad = () => {
        Loader.loadScriptsSuccessfully = true;
        callback();
      };

      Loader.loadScript(REACT_APP_PSPDFKIT_PRIMARY_URL, onLoad, () => {
        console.info('tentando em outro dominio...');
        Loader.loadScript(REACT_APP_PSPDFKIT_SECONDARY_URL, onLoad, () => {
          logError('nao conseguiu carregar pspdfkit.');
        });
      });
    }
  }

  private static loadScript(
    url: string,
    onLoad: () => any,
    onError: () => any
  ) {
    let script = document.createElement('script');
    script.src = url;
    script.onload = onLoad;
    script.onerror = onError;

    if (document.head.append) {
      document.head.append(script);
    } else {
      document.head.appendChild(script);
    }
  }
}
