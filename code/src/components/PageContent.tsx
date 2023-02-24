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
import { contentSelectionHeight } from './_shell/TabContentSelection';
import { topbarHeight } from './_shell/Navbar';

const Container = styled.main<any>`
  padding: ${(props) => (props.fullscreen ? '0' : '3rem 2rem')};
  max-width: ${(props) => (props.fullscreen ? '100%' : '940px')};
  border-radius: ${(props) => (props.fullscreen ? '0' : '.2rem')};
  scroll-behavior: smooth;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--content-background-color);
  height: calc(100vh - ${topbarHeight}px + ${contentSelectionHeight}px);
  padding-bottom: ${topbarHeight + contentSelectionHeight}px;
  margin: ${(props) =>
    props.contentPage
      ? '0 auto'
      : props.center
      ? `${topbarHeight + contentSelectionHeight}px auto 0 auto `
      : `${topbarHeight + contentSelectionHeight}px 0 0 0`};

  @media (max-width: 700px) {
    margin: ${(props) =>
    props.contentPage
        ? '2rem auto'
      : props.center
        ? `${topbarHeight + contentSelectionHeight}px auto 0 auto `
        : `${topbarHeight + contentSelectionHeight}px 0 0 0`};
  }

  @media (max-width: 425px) {
    padding: ${(props) => (props.fullscreen ? '0' : '1.5rem .5rem')};
  }
`;

interface IProps {
  children: any;
  fullscreen?: boolean;
  center?: boolean;
  style?: object;
  className?: string;
  contentPage?: boolean;
  scroll?: boolean;
}

export const PageContent = ({
  children,
  center = true,
  fullscreen = true,
  style = {},
  className = '',
  contentPage,
  scroll = false
}: IProps) => (
  <Container
    contentPage={contentPage}
    className={`page-content ${className}`}
    center={center}
    fullscreen={fullscreen}
    style={{ ...style }}
    scroll={scroll}>
    {children}
  </Container>
);
