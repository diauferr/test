import React, { ReactNode } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { ContentBelowHeader } from './ContentBelowHeader';
import { CenteredContent } from './CenteredContent';

const Header = styled.header`
  display: flex;

  align-items: center;
  background-repeat: no-repeat !important;
  background-position: right !important;

  height: 8rem;
  background: url('/assets/images/title-background.png');
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: linear-gradient(
      90deg,
      #f4f4f4 0%,
      var(--top-bar-background-color) 100%
    );
    opacity: 0.15;
  }
  div {
    margin: 0 auto;
    max-width: 940px;
    width: 100%;

    h1 {
      color: var(--top-bar-background-color);
      //padding: 1.1rem 0 0 0;
      margin: 0;
    }
  }

  @media (max-width: 970px) {
    padding: 0 0.7rem;
  }

  @media (max-width: 425px) {
    height: 4rem;
  }
`;

const GlobalOverrides = createGlobalStyle`
  html, body{
    background: #fff;
  }
`;

interface IProps {
  TitleContent?: ReactNode;
  Content: ReactNode;
}

export const ContentWithTitleTemplate = ({
  TitleContent,
  Content: ContentCmp
}: IProps) => (
  <ContentBelowHeader style={{ background: '#fff' }}>
    <GlobalOverrides />
    {TitleContent && (
      <Header
        style={
          {
            // backgroundImage: `url(/assets/images/folders-banner.png)`
          }
        }>
        <div>{TitleContent}</div>
      </Header>
    )}

    <CenteredContent padding={false}>{ContentCmp}</CenteredContent>
  </ContentBelowHeader>
);
