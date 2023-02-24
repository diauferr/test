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

import { Icon, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthCtx } from '../../features/auth_v2/hooks/useAuthCtx';
import { useKeyPress } from '../../Hooks/useKeyPress';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { HideWindowOverflow } from '../HideWindowOverflow';
import {
  ComponentWithContentMenu,
  IRenderProps
} from './ComponentWithContentMenu';
import { ContentMenuListItem } from './ContentMenuListItem';
import {
  ContentMenuOptionType,
  createDefaultContentMenuOptions
} from './createDefaultContentMenuOptions';

const Container = styled.div`
  svg {
    width: 16px;
    height: 16px;
    fill: var(--primary-color-dark);
  }

  button {
    cursor: pointer;
    border: none;
    background: transparent;
    border-radius: 50%;
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.4s;

    &:hover {
      background: #fff;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  cursor: default;
`;

interface IProps {
  result: ContentSearchResult;
  otherProps?: object;
  disabledMenuOptions?: ContentMenuOptionType[];
}

export const DotsContentMenu = ({
  result,
  disabledMenuOptions,
  otherProps = {}
}: IProps) => {
  const { is_authenticated_with_email } = useAuthCtx();
  const escPress = useKeyPress('Escape');
  const [popoverVisible, setPopoverVisible] = useState(false);

  useEffect(() => {
    if (popoverVisible && escPress) setPopoverVisible(false);
  }, [escPress]);

  return (
    <ComponentWithContentMenu result={result}>
      {({
        setFolderModalVisibility,
        setEmailModalVisibility,
        setQuoteModalVisibility,
        disabledOptions
      }: IRenderProps) => {
        const options = createDefaultContentMenuOptions({
          onClickCallbacks: {
            setFolderModalVisibility,
            setEmailModalVisibility,
            setQuoteModalVisibility
          },
          disabledOptions
        }).map(({ text, icon, onClick }) => (
          <ContentMenuListItem
            key={text}
            onClick={() => {
              onClick(true);
              setPopoverVisible(false);
            }}>
            <Icon type={icon} />
            {text}
          </ContentMenuListItem>
        ));

        return (
          <>
            <Container {...otherProps} className={'dots-content-menu'}>
              <Popover
                placement="left"
                // onMouseLeave={() => setPopoverVisible(false)}
                visible={popoverVisible}
                trigger="click"
                content={
                  <ul>
                    {options.length > 0 ? (
                      options
                    ) : (
                      <span style={{ padding: '1rem' }}>
                        Sem opções disponíveis
                      </span>
                    )}
                  </ul>
                }>
                <button onClick={() => setPopoverVisible(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 341.333 341.333">
                    <path d="M170.667 85.333c23.573 0 42.667-19.093 42.667-42.667C213.333 19.093 194.24 0 170.667 0S128 19.093 128 42.667c0 23.573 19.093 42.666 42.667 42.666zM170.667 128C147.093 128 128 147.093 128 170.667s19.093 42.667 42.667 42.667 42.667-19.093 42.667-42.667S194.24 128 170.667 128zM170.667 256C147.093 256 128 275.093 128 298.667c0 23.573 19.093 42.667 42.667 42.667s42.667-19.093 42.667-42.667C213.333 275.093 194.24 256 170.667 256z" />
                  </svg>
                </button>
              </Popover>
            </Container>

            {popoverVisible && (
              <>
                <HideWindowOverflow />
                <Overlay onClick={() => setPopoverVisible(false)} />
              </>
            )}
          </>
        );
      }}
    </ComponentWithContentMenu>
  );
};
