import React, { ReactNode } from 'react';
import { withRouter } from 'react-router';
import { Container } from './styles';

interface Props {
  Content: ReactNode;
}

const Content = ({ Content: ContentCmp }: Props) => (
  <Container>{ContentCmp}</Container>
);

//@ts-ignore
export default withRouter(Content);
