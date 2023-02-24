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
import { IAnnotationListItemProps } from './IAnnotationListItemProps';

export const TextAnnotationListItem = ({
  onClick,
  annotation,
  style
}: IAnnotationListItemProps) => (
  <DefaultListItem
    onClick={() => onClick(annotation)}
    border={true}
    Leading={
      <img
        src={'/assets/images/text.svg'}
        style={{ width: 40, paddingLeft: '.5rem' }}
      />
    }
    Content={
      <span dangerouslySetInnerHTML={{ __html: annotation.displayText }} />
    }
  />
);
