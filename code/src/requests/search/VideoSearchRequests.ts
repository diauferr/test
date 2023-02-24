import _ from 'lodash';
import { extractIdsFromMultiFilteredSelectValues } from '../../components/_inputs/MultipleFilteredSelect';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { SuggestionFilterModel } from '../../models/search/SuggestionFilterModel';
import { RequestUtil } from '../../util/RequestUtil';
import { SearchFilter } from '../../models/search/SearchFilter';

export class VideoSearchRequests {
  public static async doVideoSearch(filter: SearchFilter) {
    const result = await RequestUtil.createGetRequest('api/search/video', {
      ...filter.toPlainObject(),
      authorsIdList: extractIdsFromMultiFilteredSelectValues(
        _.get(filter, 'authorsIdList', '')
      ),
      areasInterestIdsList: extractIdsFromMultiFilteredSelectValues(
        _.get(filter, 'areasInterestIdsList', '')
      ),
      eventsIdList: extractIdsFromMultiFilteredSelectValues(
        _.get(filter, 'eventsIdList', '')
      ),
      contractedProducts: true
    })();

    return result.data as ContentSearchResult[];
  }

  public static async getVideoSerieSuggestion() {
    const result = await RequestUtil.createGetRequest(
      'api/search/getVideoSeriesSuggestion'
    )();

    return result.data.map(
      (item: SuggestionFilterModel) =>
        new SuggestionFilterModel(item.id, item.title)
    );
  }

  public static async getVideoSuggestions() {
    const result = await RequestUtil.createGetRequest(
      'api/search/getVideoSuggestion'
    )();

    return result.data.map(
      (item: SuggestionFilterModel) =>
        new SuggestionFilterModel(item.id, item.title)
    );
  }
}
