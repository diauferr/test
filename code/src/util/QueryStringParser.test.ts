import { queryStringParser } from './QueryStringParser';

describe('QueryStringParser', () => {
  it('deve saber ler uma querystring.', async () => {
    // Arrange
    const querystring =
      'MonthYearEnd=&areasInterestIdsList=1___Administrativo%7B2___Ambiental&articleType=1&authorsIdList=38829___Fernando%20D.%20Menezes%20de%20Almeida&bookIdList=&clippingDate=&clippingId=&clippingMonthly=false&codeIdList=&dateInterval=0&eventsIdList=&isGrouped=false&monthYearInitial=&page=1' +
      '&periodicIdList=&rows=20&searchScope=0&seriesIdList=179&videoSeriesIdList=&words=direito';

    // Act
    const parsed = queryStringParser.fromQueryString(querystring);

    // Assert
    expect(parsed.areasInterestIdsList).toBe(
      '1___Administrativo{2___Ambiental'
    );
    expect(parsed.authorsIdList).toBe('38829___Fernando D. Menezes de Almeida');
    expect(parsed.words).toBe('direito');
  });
});
