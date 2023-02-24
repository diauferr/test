import { useContext } from 'react';
import { SearchContext } from '../Context/SearchContextProvider';
import { ISearchContextProvider } from '../abstract/ISearchContextProvider';

export function useSearchContext() {
  return useContext<ISearchContextProvider>(
    SearchContext as any
  ) as ISearchContextProvider;
}
