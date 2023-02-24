import React from 'react';
import styled from 'styled-components';

const Div = styled.div<any>`
  margin: 0 auto;
  max-width: 940px;
  padding: ${(props) => (props.padding ? '2rem .5rem' : 'none')};
`;

export const CenteredContent = ({ padding = true, ...props }: any) => (
  <Div {...props} padding={padding} />
);
