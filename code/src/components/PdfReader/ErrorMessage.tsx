import React from 'react';

import styled from 'styled-components';
import errorIcon from './../../assets/images/page-crash.png';
import { Button } from 'antd';

const Container = styled.div<any>`
  height: 100%;
  flex-direction: column;
  justify-content: center;
  display: flex;
  align-items: center;

  img {
    width: 4rem;
  }

  p {
    margin-top: 0.5rem;
  }
`;

interface IProps {
  close: () => any;
}

export const ErrorMessage = ({ close }: IProps) => (
  <Container>
    <img src={errorIcon} alt={'Error icon'} />
    <p>Ocorreu um erro ao tentar carregar este conteúdo.</p>
    <Button type={'danger'} onClick={close}>
      OK
    </Button>
  </Container>
);
