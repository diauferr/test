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
import { DefaultListItem } from '../DefaultListItem/DefaultListItem';
import styled from 'styled-components';
import { IAnnotationListItemProps } from './IAnnotationListItemProps';

const Quote = styled.q`
  span {
    text-decoration: line-through;
  }
`;

export const StrikeoutAnnotationListItem = ({
  onClick,
  style,
  annotation
}: IAnnotationListItemProps) => (
  <DefaultListItem
    onClick={() => onClick(annotation)}
    border={true}
    Content={
      <Quote>
        <span dangerouslySetInnerHTML={{ __html: annotation.displayText }} />
      </Quote>
    }
  />
);
