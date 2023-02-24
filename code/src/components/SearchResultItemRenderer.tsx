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
import { ContentType } from '../enums/ContentType';
import { ContentSearchResult } from '../models/ContentSearchResult';
import { PeriodicListItem } from '../pages/pesquisa/components/list-items/PeriodicListItem';
import { ArticleListItem } from './ArticleListItem';
import { BookListItem } from './BookListItem';
import { ChapterListItem } from './ChapterListItem';
import { CodeListItem } from './CodeListItem';
import { DefaultContentListItem } from './DefaultContentListItem/DefaultContentListItem';
import { VideoListItem } from './VideoListItem';
import { LegislationListItem } from './LegislationListItem';

interface IProps {
  result: ContentSearchResult;
  otherProps?: object;
}

export const SearchResultItemRenderer = ({
  result,
  otherProps = {}
}: IProps) => {
  const _props = {
    ...otherProps,
    result
  };

  switch (result.contentType) {
    case ContentType.CHAPTER:
      return <ChapterListItem {..._props} />;
    case ContentType.ARTICLE:
      return <ArticleListItem {..._props} />;
    case ContentType.PERIODIC:
      return <PeriodicListItem {..._props} />;
    case ContentType.BOOK:
      return <BookListItem {..._props} />;
    case ContentType.LEGISLATION:
      return <LegislationListItem {..._props} />;
    case ContentType.VIDEO:
      return <VideoListItem {..._props} />;
    case ContentType.CODE_ITEM:
    case ContentType.CODE:
      return <CodeListItem {..._props} />;
    default:
      return <DefaultContentListItem {..._props} />;
  }
};
