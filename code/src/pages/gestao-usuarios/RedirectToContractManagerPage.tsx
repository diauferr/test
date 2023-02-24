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
import { useHistory } from 'react-router';
import { Message } from '../../components/messages/Message';
import { CenteredContent } from '../../components/_templates/CenteredContent';
import { Container } from '../../components/_templates/ContentPageTemplate/styled-components';
import Loading from '../../features/auth_v2/components/Loading';
import { useAuthApi } from '../../features/auth_v2/hooks/useAuthApi';
import { useAuthCtx } from '../../features/auth_v2/hooks/useAuthCtx';
interface IProps {}

export const RedirectToContractManagerPage: React.FC<IProps> = ({}) => {
  const history = useHistory();
  const { is_contract_manager } = useAuthCtx();
  const [loading, set_loading] = useState(false);
  const [error, set_error] = useState('');
  const { get_contract_manager_ui_url } = useAuthApi();

  useEffect(() => {
    if (!is_contract_manager()) {
      return history.replace('/pesquisa/todos');
    }

    redirect_to_contract_manager_ui();
  }, []);

  function redirect_to_contract_manager_ui() {
    if (loading) {
      return;
    }

    set_loading(true);

    get_contract_manager_ui_url()
      .then((r) => {
        window.location.replace(r.data);
      })
      .catch((error) => {
        set_error(error);
        set_loading(false);
      });
  }

  return (
    <Container>
      <CenteredContent>
        {error ? (
          <Message {...{}}>
            Ocorreu um erro inesperado. Por favor, tente novamente em instantes.
          </Message>
        ) : (
          <div
            {...{
              style: {
                display: 'flex',
                color: '#cecece',
                position: 'relative',
                marginTop: '4rem',
                justifyContent: 'center'
              }
            }}>
            <Loading />
            <p>redirecionando...</p>
          </div>
        )}
      </CenteredContent>
    </Container>
  );
};
