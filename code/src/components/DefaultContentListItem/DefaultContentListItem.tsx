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

import { Tooltip } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import dateIconSrc from '../../assets/images/icon-calendar.svg';
import userIcon from '../../assets/images/icon-user.svg';
import { ContentType } from '../../enums/ContentType';

import { ContentSearchResult } from '../../models/ContentSearchResult';
import { highlightWords as highlightWordsFunction } from '../../util/highlightWords';
import { ContentMenuHorizontal } from '../ContentMenu/ContentMenuHorizontal';
import { AreaList } from './AreaList/AreaList';
import { ContentDescription } from './ContentDescription';
import { CoverContainer } from './ImageRenderer/CoverContainer';
import { SubtitleSuffixRendererFactory } from './SubtitleSuffixRenderer/SubtitleSuffixRendererFactory';
import { TagsRendererFactory } from './TagsRenderer/TagsRendererFactory';

interface IProps {
  result: ContentSearchResult;
  linkTo?: string;
  linkToParent?: string;
  className?: string;
  hideImg?: boolean;
  Content?: any;
}

const Li = styled.li<any>`
  display: flex;
  margin-bottom: 32px;

  a {
    font-size: 16px !important;
  }

  mark {
    background: rgba(255, 255, 0, 0.3) !important;
  }

  .details-container {
    margin-left: 40px;
  }

  .areas-interest {
  }

  .header {
    max-width: 600px;
  }

  .content-container {
    max-width: 600px;
  }
`;

const Icon = styled.img`
  width: 18px;
`;

export const DefaultContentListItem = ({
  result,
  linkTo,
  linkToParent,
  hideImg,
  Content,
  className = ''
}: IProps) => {
  const {
    title,
    subTitle,
    tags,
    img,
    author,
    contentType,
    relevantWords,
    areasInterest,
    formattedDate
  } = result;

  const filter: any = {};
  const searchingWords = filter.words;
  const TagsComponent = TagsRendererFactory.Create(result.contentType);
  const SubtitleSuffixComponent = SubtitleSuffixRendererFactory.Create(
    result.contentType
  );

  return (
    <Li hasImage={!!img} className={className}>
      {result.contentType === ContentType.VIDEO ? (
        <NavLink to={linkTo}>
          <img src={img} alt={author} style={{ width: 150 }} />
        </NavLink>
      ) : (
        <CoverContainer
          title={title}
          imgSrc={img}
          linkTo={linkTo}
          showArrow={hideImg}
          contentType={result.contentType}
        />
      )}

      <span className={'details-container'}>
        <TagsComponent tags={tags} />
        <div className="header">
          <h2 style={{ marginBottom: '8px', paddingTop: '0px' }}>
            {result.contentType === ContentType.CODE ||
            result.contentType === ContentType.CODE_ITEM ? (
              <a
                href={linkTo}
                target="_blank"
                dangerouslySetInnerHTML={{
                  __html: relevantWords
                    ? highlightWordsFunction(relevantWords, title)
                    : title
                }}
              />
            ) : (
              <NavLink
                to={linkTo}
                dangerouslySetInnerHTML={{
                  __html: relevantWords
                    ? highlightWordsFunction(relevantWords, title)
                    : title
                }}
              />
            )}
          </h2>

          {(() => {
            if (subTitle) {
              if (
                result.contentType === ContentType.CODE ||
                result.contentType === ContentType.CODE_ITEM
              ) {
                return (
                  <h3>
                    <a
                      href={linkToParent}
                      target="_blank"
                      dangerouslySetInnerHTML={{
                        __html: relevantWords
                          ? highlightWordsFunction(relevantWords, title)
                          : title
                      }}
                    />
                  </h3>
                );
              } else {
                return (
                  <h3>
                    <NavLink
                      to={linkToParent || '#'}
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}>
                      {subTitle}

                      <SubtitleSuffixComponent
                        linkToParent={linkToParent}
                        contentType={result.contentType}
                      />
                    </NavLink>
                  </h3>
                );
              }
            }
          })()}

          {author && (
            <div className={'author'}>
              <Icon src={userIcon} alt={userIcon} />
              {author.length >= 50 ? (
                <Tooltip title={author} placement="right">
                  <span>{`${author.substring(0, 80)}... `}</span>
                </Tooltip>
              ) : (
                <span>{author}</span>
              )}
            </div>
          )}

          {formattedDate && (
            <span className={'date'}>
              <Icon src={dateIconSrc} />
              {formattedDate}
            </span>
          )}

          {contentType !== ContentType.CODE && areasInterest && (
            <div className="areas-interest">
              <AreaList areas={areasInterest} />
            </div>
          )}
        </div>
        <div className="content-container">
          {!Content ? (
            <>
              <ContentDescription
                searchingWords={searchingWords}
                textCharCountLimit={600}
                result={result}
              />
              <ContentMenuHorizontal result={result} />
            </>
          ) : (
            Content
          )}
        </div>
      </span>
    </Li>
  );
};
