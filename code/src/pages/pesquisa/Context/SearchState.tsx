import { ContentSearchResult } from '../../../models/ContentSearchResult';
import _ from 'lodash';
import { ContentType } from '../../../enums/ContentType';

interface ReducerAccumulator {
  items: ReducerAccumulatorItem[];
  prevResult: ContentSearchResult;
}

interface ReducerAccumulatorItem {
  otherProps: any;
  result: ContentSearchResult;
}

export class SearchState {
  constructor(
    public searchResults: ContentSearchResult[] = [],
    public titleSearchResults: ContentSearchResult[] = []
  ) {}

  setSearchResults = (searchResults: ContentSearchResult[]) => {
    this.searchResults = searchResults;
    return this.clone();
  };

  setTitleSearchResult = (titleSearchResults: ContentSearchResult[]) => {
    this.titleSearchResults = titleSearchResults;
    return this.clone();
  };

  getTotalCount = () => {
    const totalCount =
      (!!_.get(this.searchResults, '[0]', 0)
        ? this.searchResults[0].total
        : 0) +
      (!!_.get(this.titleSearchResults, '[0]', 0)
        ? this.titleSearchResults[0].total
        : 0);

    return totalCount;
  };

  getGlobalSearchAcumulator = () => {
    const acc =
      this.searchResults &&
      this.searchResults.reduce<ReducerAccumulator>(
        function (accumulator, current) {
          const { prevResult } = accumulator;

          const isChapter = current.contentType === ContentType.CHAPTER;

          const defaultResult = {
            prevResult: current,
            items: [...accumulator.items, { otherProps: {}, result: current }]
          };

          if (!isChapter || !prevResult || current.parentId === 0) {
            return defaultResult;
          }

          if (current.parentId === prevResult.parentId) {
            return {
              prevResult: current,
              items: [
                ...accumulator.items,
                {
                  otherProps: {
                    hideImg: true
                  },
                  result: current
                }
              ]
            };
          }

          return defaultResult;
        },
        {
          items: [],
          prevResult: null
        }
      );

    return acc;
  };

  private clone = () =>
    new SearchState(this.searchResults, this.titleSearchResults);
}
