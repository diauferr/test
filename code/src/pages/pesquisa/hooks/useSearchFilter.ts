import { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchFilter } from '../../../models/search/SearchFilter';
import { ContentTypeName } from '../enums/ContentTypeName';
import { useSearchContext } from './useSearchContext';

export function useSearchFilter() {
  const location = useLocation();

  const { changeFilter } = useSearchContext();
  const [state, change] = useReducer(
    (state, changes) => ({ ...state, ...changes }),
    {
      filter: SearchFilter.Empty,
      badgeCount: SearchFilter.Empty.getBadgeCount(),
      contentType: ContentTypeName.ALL
    }
  );

  useEffect(() => {
    const [, , contentType] = location.pathname.split('/');
    const filter = SearchFilter.createFromQueryString(location.search);

    change({
      filter: SearchFilter.createFromQueryString(location.search),
      badgeCount: filter.getBadgeCount(),
      contentType
    });
  }, [location.search, location.pathname]);

  return {
    filter: state.filter,
    badgeCount: state.badgeCount,
    contentType: state.contentType,
    changeFilter
  };
}
