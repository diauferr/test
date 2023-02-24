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

import { SessionInfo } from '../model/SessionInfo';

const StoreKey = 'frm_session';

export function useSessionInfoStorage() {
  return {
    get: get_from_localstorage,
    save: (auth_info: SessionInfo) => {
      const prev = get_from_localstorage();

      localStorage.setItem(
        StoreKey,
        JSON.stringify({
          ...prev,
          ...auth_info
        })
      );
    },
    clear: () => {
      localStorage.removeItem(StoreKey);
    }
  };
}

function get_from_localstorage(): SessionInfo {
  const json = localStorage.getItem(StoreKey);

  if (!json) {
    return {};
  }

  try {
    return JSON.parse(json);
  } catch (error) {
    console.error(error);

    return {};
  }
}
