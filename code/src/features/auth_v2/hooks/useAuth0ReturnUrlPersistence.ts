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

export const STATE_PERSIST_KEY = 'frm_state';

/**
 * Hook que lida com o armazenamento do url de retorno do auth0.
 *
 * O usuário entra na plataforma em um endereco, caso nao esteja autenticado é redirecionado para login.
 * Quando usuário volta na rota de Callback ele deve ser redirecionado para a página que ele visitou inicialmente.
 *
 * @returns
 */
export function useReturnUrlPersistence() {
  return {
    create_state_string,
    persist: (state: string, return_url: string) => {
      localStorage.setItem(
        STATE_PERSIST_KEY,
        JSON.stringify({
          [state]: decodeURIComponent(return_url)
        })
      );
    },

    get_persisted: async (state: string): Promise<string> => {
      try {
        const json_str = localStorage.getItem(STATE_PERSIST_KEY);
        const json = JSON.parse(json_str);

        if (!json) {
          return '';
        }

        const return_url = json[state];

        return return_url || '';
      } catch (error) {
        return '';
      }
    },

    clear: () => {
      localStorage.removeItem(STATE_PERSIST_KEY);
    }
  };
}

/**
 * Cria uma string randomica necessária para evitar ataques de CRSF.
 * @see https://auth0.com/docs/configure/attack-protection/state-parameters
 *
 */
function create_state_string() {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 15; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
