import _ from 'lodash';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ProductType } from '../../../enums/ProductType';
import { useContractedProducts } from '../../../Hooks/useContractedProducts';
import { useDoRequest } from '../../../Hooks/useDoRequest';
import { ClippingModel } from '../../../models/clipping/ClippingModel';
import { ContentSearchResult } from '../../../models/ContentSearchResult';
import { SearchFilter } from '../../../models/search/SearchFilter';
import { ClippingRequests } from '../../../requests/clipping/ClippingRequests';
import { ISearchContextProvider } from '../abstract/ISearchContextProvider';
import { ContentTypeName } from '../enums/ContentTypeName';
import { SearchState } from './SearchState';

// @ts-ignore
export const SearchContext = createContext();

interface IProps {
  children: ReactNode;
}

export const SearchContextProvider: React.FC<IProps> = ({ children }) => {
  const { hasAccessToProduct } = useContractedProducts();
  const history = useHistory();
  const match = useRouteMatch();

  const [, , contentType] = match.url.split('/');
  const [state, setState] = useState(new SearchState());
  const [clippings, loading, error, doRequest] =
    useDoRequest<ClippingModel[]>();

  useEffect(() => {
    if (hasAccessToProduct(ProductType.Clipping) === false) {
      return;
    }
    if (clippings && clippings.length > 0) {
      return;
    }
    if (contentType !== ContentTypeName.NEWSLETTER) {
      return;
    }

    doRequest(async () => {
      const clippings = (await ClippingRequests.getClippings()).reverse();
      const lastEditions = await Promise.all(
        clippings.map((c) => ClippingRequests.getLastEditionOf(c.id))
      );
      return clippings.map((c) => {
        const clippingLastEdition = lastEditions.find((e) =>
          e.id.startsWith(c.id)
        );
        c.metadata = {
          lastEdition: clippingLastEdition
        };
        return c;
      });
    });
  }, [contentType]);

  return (
    <SearchContext.Provider
      value={
        {
          state,
          setSearchResults: (searchResults: ContentSearchResult[]) => {
            setState((state) => state.setSearchResults(searchResults));
          },

          setTitleSearchResult: (titleSearchResults: ContentSearchResult[]) => {
            setState((state) => state.setTitleSearchResult(titleSearchResults));
          },
          changeFilter: _.debounce((filter: SearchFilter, page = 1) => {
            filter.page = page;
            history.push(
              `/pesquisa/${contentType}?${filter.convertToQueryString()}`
            );
          }, 200),
          clippingsInfo: {
            result: clippings,
            loading,
            error
          }
        } as ISearchContextProvider
      }>
      {children}
    </SearchContext.Provider>
  );
};
