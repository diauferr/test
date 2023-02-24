import _ from 'lodash';
import { extractIdsFromMultiFilteredSelectValues } from '../../components/_inputs/MultipleFilteredSelect';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { SuggestionFilterModel } from '../../models/search/SuggestionFilterModel';
import { RequestUtil } from '../../util/RequestUtil';
import { SearchFilter } from '../../models/search/SearchFilter';

export class CodeSearchRequests {
  public static async doCodeSearch(
    filter: SearchFilter,
    searchInTitle = false
  ) {
    const result = await RequestUtil.createGetRequest('api/search/code', {
      ...filter.toPlainObject(),
      codeIdList: extractIdsFromMultiFilteredSelectValues(
        _.get(filter, 'codeIdList', '')
      ),
      contractedProducts: true,
      searchInTitle
    })();

    return result.data as ContentSearchResult[];
  }

  public static async getCodeFilterSuggestion() {
    const result = await RequestUtil.createGetRequest(
      'api/search/getCodeSuggestions'
    )();

    const responseArray = result.data.map(
      (item: SuggestionFilterModel) =>
        new SuggestionFilterModel(item.id, item.title)
    );

    return responseArray;
  }
}
