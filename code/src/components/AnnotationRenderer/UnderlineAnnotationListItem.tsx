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
import styled from 'styled-components';
import { DefaultListItem } from '../DefaultListItem/DefaultListItem';
import { IAnnotationListItemProps } from './IAnnotationListItemProps';

const Quote = styled.q`
  span {
    border-bottom-width: 2px;
  }
`;

interface IProps extends IAnnotationListItemProps {
  borderStyle?: string;
}

export const UnderlineAnnotationListItem = ({
  onClick,
  annotation,
  style,
  borderStyle = 'solid'
}: IProps) => (
  <DefaultListItem
    onClick={() => onClick(annotation)}
    border={true}
    Content={
      <Quote>
        <span
          dangerouslySetInnerHTML={{
            __html: annotation.displayText
          }}
        />
      </Quote>
    }
  />
);
