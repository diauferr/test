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

import React from 'react';
import { AssociatedClientsDto } from '../../dtos/AssociatedClientsDto';
import { ClientProductsList } from '../ClientProductsList';
import { AccessInfo } from './AccessInfo';
interface IProps {
  associated_clients: AssociatedClientsDto;
  on_selected: (client_id: string) => any;
  selected_client_id?: string;
}

export const ClientsList: React.FC<IProps> = ({
  associated_clients,
  on_selected,
  selected_client_id
}) => (
  <ol className="associated-clients-list">
    {associated_clients
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
      .map((c) => {
        let button_cls = c.blocked ? 'blocked' : 'active';

        if (selected_client_id === c.id) {
          button_cls = 'selected';
        }

        return (
          <li className="client-item" key={c.name}>
            <button
              {...{
                className: button_cls,
                name: c.name,
                disabled: c.blocked,
                onClick: () => {
                  if (c.blocked || selected_client_id === c.id) {
                    return;
                  }

                  on_selected(c.id);
                }
              }}>
              <span className="client-name">{c.name}</span>

              <ClientProductsList
                {...{
                  contractedProducts: c.contractedProducts
                }}
              />

              <AccessInfo
                {...{
                  associated_by: c.associated_by,
                  blocked: c.blocked
                }}
              />
            </button>
          </li>
        );
      })}
  </ol>
);
