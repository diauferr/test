import { Skeleton } from 'antd';
import React from 'react';
import { NewsletterList } from './NewsletterList';
import { NewsletterSearchList } from './NewsletterSearchList';
import { useSearchFilter } from '../../../hooks/useSearchFilter';

export const NewsletterSearchResult = () => {
  const { filter } = useSearchFilter();

  return filter.words !== '' ? <NewsletterSearchList /> : <NewsletterList />;
};

export const Loader = () => (
  <div>
    <Skeleton />
    <Skeleton />
  </div>
);
