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

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/rules-of-hooks */
import _ from 'lodash';
import { extractIdsFromMultiFilteredSelectValues } from '../../components/_inputs/MultipleFilteredSelect';
import { useSessionInfoStorage } from '../../features/auth_v2/hooks/useSessionInfoStorage';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { SearchFilter } from '../../models/search/SearchFilter';
import { SuggestionFilterModel } from '../../models/search/SuggestionFilterModel';
import { http_client } from '../../util/http_client';
import { RequestUtil } from '../../util/RequestUtil';

export class BookSearchRequests {
  public static async doBookSearch(
    filter: SearchFilter,
    searchInTitle = false
  ) {
    const result = await http_client.get(
      `${process.env.REACT_APP_SEARCH_API}/books`,
      {
        ...filter.toPlainObject(),
        authorsIdList: extractIdsFromMultiFilteredSelectValues(
          _.get(filter, 'authorsIdList', '')
        ),
        areasInterestIdsList: extractIdsFromMultiFilteredSelectValues(
          _.get(filter, 'areasInterestIdsList', '')
        ),
        bookIdList: extractIdsFromMultiFilteredSelectValues(
          _.get(filter, 'bookIdList', '')
        ),
        contractedProducts: true,
        searchInTitle
      }
    );

    const resultArray = result.data as ContentSearchResult[];

    return resultArray.sort((a, b) => {
      if (a.parentId === 0 || b.parentId === 0) return 0;
      if (a.parentId > b.parentId) return 1;
      if (a.parentId === b.parentId) return 0;
      return -1;
    });
  }

  public static async getBookSuggestions(words: string, rows: string) {
    const baseURL = process.env.REACT_APP_MS_PRODUCTION_API || '';
    const result = await RequestUtil.createGetRequest(
      'bid/Migration/GetSuggestionsBooks/',
      {
        words,
        rows
      },
      false,
      { baseURL }
    )();

    return result.data.map((item: SuggestionFilterModel) => ({
      value: item.id,
      text: item.title
    }));
  }

  public static async getBookSerieSuggestion() {
    const baseURL = process.env.REACT_APP_MS_PRODUCTION_API || '';
    const session_persistence = useSessionInfoStorage();
    const session_info = session_persistence.get();
    const result = await RequestUtil.createGetRequest(
      `bid/Migration/GetSeriesBooksClient/?idclient=${session_info.client_id}`,
      {},
      false,
      { baseURL }
    )();

    return result.data.map(
      (item: SuggestionFilterModel) =>
        new SuggestionFilterModel(item.id, item.title)
    );
  }
}
