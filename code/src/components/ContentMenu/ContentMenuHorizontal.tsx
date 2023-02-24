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
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { Button } from '../Button';
import {
  ComponentWithContentMenu,
  IRenderProps
} from './ComponentWithContentMenu';
import { createDefaultContentMenuOptions } from './createDefaultContentMenuOptions';

const Ul = styled.ul`
  display: flex;
  width: 100%;
  margin-top: 16px;

  .ant-btn:first-child {
    padding: 0;
    margin-right: 1.5rem;
  }

  button {
    margin-right: 2rem;
    background: transparent;
  }
  button:hover {
    background: white;
  }
`;

interface IProps {
  result: ContentSearchResult;
}

interface IMenuOption {
  icon: string;
  text: string;
  onClick: () => any;
}

export const ContentMenuHorizontal = ({ result }: IProps) => (
  <ComponentWithContentMenu result={result}>
    {({
      setFolderModalVisibility,
      setEmailModalVisibility,
      setQuoteModalVisibility,
      disabledOptions
    }: IRenderProps) => (
      <Ul>
        {createDefaultContentMenuOptions({
          onClickCallbacks: {
            setFolderModalVisibility,
            setEmailModalVisibility,
            setQuoteModalVisibility
          },
          disabledOptions
        }).map(({ icon, text, onClick }) => (
          <li key={text}>
            <Button
              icon={icon}
              onClick={() => onClick(true)}
              style={{ paddingLeft: '5px', paddingRight: '5px' }}>
              {text}
            </Button>
          </li>
        ))}
      </Ul>
    )}
  </ComponentWithContentMenu>
);
