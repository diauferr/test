import { ContentSearchResult } from '../../../models/ContentSearchResult';
import { SearchState } from '../Context/SearchState';
import { ClippingModel } from '../../../models/clipping/ClippingModel';

export interface ISearchContextProvider {
  state: SearchState;
  setSearchResults: (searchResults: ContentSearchResult[]) => any;
  changeFilter: any;
  setTitleSearchResult: (titleSearchResults: ContentSearchResult[]) => any;
  clippingsInfo: {
    result: ClippingModel[];
    loading: boolean;
    error: any;
  };
}
