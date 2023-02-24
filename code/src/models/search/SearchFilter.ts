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

import { SearchDateInterval } from '../../pages/pesquisa/enums/SearchDateInterval';
import { SearchScope } from '../../pages/pesquisa/enums/SearchScope';
import { queryStringParser } from '../../util/QueryStringParser';
import { ArticleType } from '../../pages/pesquisa/enums/ArticleType';
import moment from 'moment';

export class SearchFilter {
  static readonly Empty = new SearchFilter();

  static DEFAULT_PAGE = 1;

  static DEFAULT_ROWS = 20;

  static DEFAULT_DATE_INTERVAL = SearchDateInterval.ALL;

  static DEFAULT_SEARCH_SCOPE = SearchScope.ALL;

  constructor(
    public words = '',
    public page = SearchFilter.DEFAULT_PAGE,
    public rows = SearchFilter.DEFAULT_ROWS,
    public authorsIdList = '',
    public dateInterval = SearchFilter.DEFAULT_DATE_INTERVAL,
    public monthYearInitial = '',
    public MonthYearEnd = '',
    public searchScope = SearchFilter.DEFAULT_SEARCH_SCOPE,
    public areasInterestIdsList = '',
    public isGrouped = true,
    // Book
    public bookIdList = '',
    public seriesIdList = '',
    // Periodic
    public periodicIdList = '',
    public articleType = ArticleType.TODOS,
    // Clipping
    public clippingId = '',
    public clippingDate = '',
    public clippingMonthly = false,
    //  Code
    public codeIdList = '',
    // Video
    public eventsIdList = '',
    public videoSeriesIdList = ''
  ) {
    if (!page) {
      this.page = SearchFilter.DEFAULT_PAGE;
    }
    if (!searchScope) {
      this.searchScope = SearchFilter.DEFAULT_SEARCH_SCOPE;
    }
    if (!rows) {
      this.rows = SearchFilter.DEFAULT_ROWS;
    }
    if (!dateInterval) {
      this.dateInterval = SearchFilter.DEFAULT_DATE_INTERVAL;
    }

    this.setWords(words);

    if (!clippingId) {
      this.clippingId = 'jacoby';
    }

    if (!clippingDate) {
      this.clippingDate = getPreviousWorkday().format('YYYY-MM-DD');
    }
  }

  setWords(words: string) {
    this.isGrouped = !words;

    if (!words) {
      this.searchScope = SearchScope.ALL;
      this.isGrouped = true;
    }

    this.words = words;
  }

  eraseSpecificFilters = (): SearchFilter =>
    new SearchFilter(
      this.words,
      SearchFilter.DEFAULT_PAGE,
      SearchFilter.DEFAULT_ROWS,
      this.authorsIdList,
      this.dateInterval,
      '',
      '',
      SearchFilter.DEFAULT_SEARCH_SCOPE,
      this.areasInterestIdsList,
      true
    );

  static createFromQueryString(queryString: string): SearchFilter {
    const {
      words,
      dateInterval,
      page,
      rows,
      searchScope,
      articleType,
      authorsIdList,
      areasInterestIdsList,
      isGrouped,
      bookIdList,
      seriesIdList,
      periodicIdList,
      eventsIdList,
      videoSeriesIdList,
      clippingId,
      clippingMonthly,
      clippingDate,
      codeIdList
    }: any = queryStringParser.fromQueryString(queryString);

    return new SearchFilter(
      words,
      isNaN(+page) ? SearchFilter.DEFAULT_PAGE : +page,
      isNaN(+rows) ? SearchFilter.DEFAULT_ROWS : +rows,
      authorsIdList,
      isNaN(+dateInterval) ? undefined : +dateInterval,
      undefined,
      undefined,
      isNaN(+searchScope) ? SearchFilter.DEFAULT_SEARCH_SCOPE : +searchScope,
      areasInterestIdsList,
      isGrouped,
      bookIdList,
      seriesIdList,
      periodicIdList,
      isNaN(+articleType) ? undefined : +articleType,
      clippingId,
      clippingDate,
      clippingMonthly == 'true',
      codeIdList,
      eventsIdList,
      videoSeriesIdList
    );
  }

  /**
   * Retorna um objeto contendo a contagem de filtros ativos para cada tipo de filtro.
   * @param filter
   */
  getBadgeCount = (): IBadgeCount => ({
    areasInterestIdsList: getLengthOfListInFilter(this, 'areasInterestIdsList'),
    authorsIdList: getLengthOfListInFilter(this, 'authorsIdList'),
    bookIdList: getLengthOfListInFilter(this, 'bookIdList'),
    seriesIdList: getLengthOfTagFilter(this, 'seriesIdList'),
    eventsIdList: getLengthOfListInFilter(this, 'eventsIdList'),
    videoSeriesIdList: getLengthOfTagFilter(this, 'videoSeriesIdList'),
    periodicIdList: getLengthOfListInFilter(this, 'periodicIdList'),
    codeIdList: getLengthOfListInFilter(this, 'codeIdList'),
    searchScope:
      !!this.searchScope && `${this.searchScope}` !== `${SearchScope.ALL}`
        ? 1
        : 0,
    articleType:
      !!this.articleType && `${this.articleType}` !== `${ArticleType.TODOS}`
        ? 1
        : 0
  });

  /**
   * Retorna a contagem de filtros ativos.
   * @param badgeCount
   */
  static getSumOfActiveFilters(badgeCount: IBadgeCount) {
    return Object.keys(badgeCount)
      .map((key) => badgeCount[key])
      .reduce((acc, current) => acc + current, 0);
  }

  convertToQueryString = (): string => queryStringParser.toQueryString(this);

  toPlainObject = (): object => JSON.parse(JSON.stringify(this));
}

/**
 * Retorna onumero de elementos selecionados em um filtro de lista.
 * @param filter
 * @param listName
 */
export function getLengthOfListInFilter(filter: any, listName: string) {
  if (!filter[listName]) return 0;

  return `${filter[listName]}`.split('{').filter((v) => !!v).length;
}

/**
 * Retorna o numero de tags selecionadas em um filtro de tags.
 * @param filter
 * @param listName
 */
function getLengthOfTagFilter(filter: any, listName: string) {
  if (!filter[listName]) return 0;
  return `${filter[listName]}`.split(',').filter((v) => !!v).length;
}

export interface IBadgeCount {
  areasInterestIdsList: number;
  authorsIdList: number;
  bookIdList: number;
  seriesIdList: number;
  eventsIdList: number;
  videoSeriesIdList: number;
  periodicIdList: number;
  codeIdList: number;
  searchScope: number;
  articleType: number;
}

// Helpers
function getPreviousWorkday() {
  return [1, 2, 3, 4, 5].indexOf(moment().subtract(1, 'day').day()) > -1
    ? moment().subtract(1, 'day')
    : moment(moment().day(-2));
}
