import { RequestUtil } from '../util/RequestUtil';

export async function getSuggestions(words: string) {
  const request = RequestUtil.createGetRequest(
    'api/search/getSearchSuggestion',
    {
      words
    }
  );

  const result = await request();

  return result.data.map((r) => ({ ...r, value: r.id }));
}
