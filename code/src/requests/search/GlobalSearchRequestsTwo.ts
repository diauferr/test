import _ from 'lodash';
import { extractIdsFromMultiFilteredSelectValues } from '../../components/_inputs/MultipleFilteredSelect';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { SearchFilter } from '../../models/search/SearchFilter';
import { http_client } from '../../util/http_client';
import { RequestUtil } from '../../util/RequestUtil';

export class GlobalSearchRequestsTwo {
  public static async doGlobalSearch(
    filterFromArgs: SearchFilter,
    searchInTitle = false
  ) {
    const result = await http_client.get(process.env.REACT_APP_SEARCH_API, {
      ...filterFromArgs.toPlainObject(),
      authorsIdList: extractIdsFromMultiFilteredSelectValues(
        _.get(filterFromArgs, 'authorsIdList', '')
      ),
      areasInterestIdsList: extractIdsFromMultiFilteredSelectValues(
        _.get(filterFromArgs, 'areasInterestIdsList', '')
      ),
      contractedProducts: true,
      searchInTitle
    });

    const resultArray = result.data as ContentSearchResult[];

    return resultArray.sort((a, b) => {
      if (a.parentId === 0 || b.parentId === 0) return 0;
      if (a.parentId > b.parentId) return 1;
      if (a.parentId === b.parentId) return 0;
      return -1;
    });
  }

  public static async getAuthorsSuggestions(words: string) {
    const baseURL = process.env.REACT_APP_MS_PRODUCTION_API || '';
    const result = await RequestUtil.createGetRequest(
      'bid/Migration/GetSuggestionsAuthors/',
      {
        words
      },
      false,
      { baseURL }
    )();

    return result.data.map((r: any) => ({ text: r.title, value: r.id }));
  }
}
