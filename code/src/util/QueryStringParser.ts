import qs from 'query-string';

export const queryStringParser = {
  toQueryString(obj: object): string {
    return qs.stringify(JSON.parse(JSON.stringify(obj)));
  },

  fromQueryString(queryString: string): object {
    return qs.parse(queryString);
  }
};
