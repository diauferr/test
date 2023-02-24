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

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { SearchFilter } from '../../models/search/SearchFilter';
import { SuggestionFilterModel } from '../../models/search/SuggestionFilterModel';
import { RequestUtil } from '../../util/RequestUtil';

export class LegislationSearchRequests {
  public static async getLegislationSerieSuggestion() {
    const result = await RequestUtil.createGetRequest(
      'api/search/getBookSeriesSuggestion'
    )();

    return result.data.map(
      (item: SuggestionFilterModel) =>
        new SuggestionFilterModel(item.id, item.title)
    );
  }

  public static async doLegislationSearch(
    _filter: SearchFilter,
    _searchInTitle = false
  ) {
    // TODO remover mocked data
    const result = {
      data: [
        {
          areasInterest: 'Constitucional',
          articleType: 0,
          author: 'EMERSON GARCIA',
          contentType: 14,
          editionId: 22222222,
          formattedDate: '2022',
          id: 11111111,
          img: 'https://bid1006-staging-public.s3.sa-east-1.amazonaws.com/books/cover/11111111/editions/22222222.jpg',
          parentId: 0,
          relevantWords: null,
          subTitle: '',
          text: 'Vol. 1',
          title: 'COMENTÁRIOS À CONSTITUIÇÃO BRASILEIRA',
          total: 1,
          url: ''
        }
      ]
    };

    const resultArray = result.data as ContentSearchResult[];

    return resultArray.sort((a, b) => {
      if (a.parentId === 0 || b.parentId === 0) return 0;
      if (a.parentId > b.parentId) return 1;
      if (a.parentId === b.parentId) return 0;
      return -1;
    });
  }

  public static async getLegislationSuggestions(words: string) {
    const result = await RequestUtil.createGetRequest(
      'api/search/getBookSuggestion',
      {
        words
      }
    )();

    return result.data.map((item: SuggestionFilterModel) => ({
      value: item.id,
      text: item.title
    }));
  }
}
