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

import React, { ReactNode, useEffect, useState } from 'react';
import { AssociatedClientsDto } from '../../dtos/AssociatedClientsDto';
import { useAuthApi } from '../../hooks/useAuthApi';
import { ErrorCodes } from '../../model/ErrorCodes.enum';
import Loading from '../Loading';
import { ClientsList } from './ClientsList';
import { ExitButton } from './ExitButton';

interface IProps {
  auth0_token?: string;
  on_clients_loaded: (clients: AssociatedClientsDto) => any;
  on_error: (error?: ErrorCodes | string) => any;
  on_selected: (client_id: string) => any;
  children: (clients: AssociatedClientsDto) => ReactNode | null;
  title?: string;
  footer?: ReactNode;
  selected_client_id?: string;
}

export const AssociatedClientsList: React.FC<IProps> = ({
  auth0_token,
  on_clients_loaded,
  on_error,
  on_selected,
  children,
  title = 'Selecionar conta',
  footer = <ExitButton />,
  selected_client_id
}) => {
  const auth_api = useAuthApi();
  const [associated_clients, set_associated_clients] =
    useState<AssociatedClientsDto>([]);
  const [loading, set_loading] = useState(true);
  const is_mountted = React.useRef(true);

  useEffect(() => {
    set_loading(true);
    auth_api
      .get_clients({
        auth0_token
      })
      .then((r) => {
        const associated_clients = r.data;

        // Protecao de atualizar state em componente depois do unmount.
        if (is_mountted.current) {
          on_clients_loaded(associated_clients);
          set_associated_clients(associated_clients);
          set_loading(false);
        }
      })
      .catch((err) => {
        on_error(err);
      });

    return () => {
      is_mountted.current = false;
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loading text="carregando contas..." />
      ) : (
        children(associated_clients) || (
          <>
            {title && <h3>{title}</h3>}
            <ClientsList
              {...{
                selected_client_id,
                associated_clients,
                on_selected
              }}
            />
          </>
        )
      )}

      {!loading && footer && (
        <>
          <hr />
          {footer}
        </>
      )}
    </>
  );
};
