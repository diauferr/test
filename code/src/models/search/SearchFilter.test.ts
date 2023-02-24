import { SearchFilter } from './SearchFilter';

describe('SearchFilter', () => {
  test('deve colocar parametros default se recebe NaN.', () => {
    const filter = new SearchFilter(
      '',
      //@ts-ignore
      '1',
      //@ts-ignore
      '2',
      '',
      +'invalid',
      'invalid',
      'invalid',
      null,
      null,
      true
    );

    expect(filter.page).not.toBeNaN();
    expect(filter.searchScope).not.toBeNaN();
    expect(filter.rows).not.toBeNaN();
    expect(filter.dateInterval).not.toBeNaN();
  });

  test('deve saber ler os campos da pesquisa global vindo de uma querystring.', () => {
    // Arrange
    const querystring =
      'MonthYearEnd=&areasInterestIdsList=2___Ambiental%7B7___Civil&' +
      'authorsIdList=24066___Fabio%20Marcelo%20de%20Rezende%20Duarte&' +
      'dateInterval=0&isGrouped=false&monthYearInitial=' +
      '&page=3&rows=20&searchScope=0&words=direito';

    // Act
    const filter = SearchFilter.createFromQueryString(querystring);

    // Assert
    expect(filter.page).toBe(3);
    expect(filter.areasInterestIdsList).toBe('2___Ambiental{7___Civil');
    expect(filter.authorsIdList).toBe(
      '24066___Fabio Marcelo de Rezende Duarte'
    );
    expect(filter.dateInterval).toBe(0);
    expect(filter.words).toBe('direito');
    expect(filter.searchScope).toBe(0);
  });

  test('deve saber ler os campos do filtro de periodicos vindo de uma querystring.', () => {
    // Arrange
    const querystring =
      'articleType=2&' +
      'periodicIdList=124___FA%20-%20FÓRUM%20ADMINISTRATIVO%7B158___ABRAT%20-%20REVISTA%20DA%20ASSOCIAÇÃO%20BRASILEIRA%20DE%20ADVOGADOS%20TRABALHISTAS' +
      '&MonthYearEnd=&areasInterestIdsList=&authorsIdList=&dateInterval=0&isGrouped=false&monthYearInitial=&page=1&rows=20&searchScope=1&words=direito';

    // Act
    const filter = SearchFilter.createFromQueryString(querystring);

    // Assert
    expect(filter.articleType).toBe(2);
    expect(filter.periodicIdList).toBe(
      '124___FA - FÓRUM ADMINISTRATIVO{158___ABRAT - REVISTA DA ASSOCIAÇÃO BRASILEIRA DE ADVOGADOS TRABALHISTAS'
    );
    expect(filter.isGrouped).toBe(false);
  });

  test('deve saber ler os campos do filtro de livros vindo de uma querystring.', () => {
    // Arrange
    const querystring =
      'bookIdList=1382___O%20OVO%20DA%20SERPENTE%3A%20AS%20RAZÕES%20QUE%20LEVARAM%20A%20CORRUPÇÃO%20A%20SE%20ALASTRAR%20PELO%20BRASIL.%20A%20FRUSTRAÇÃO%20DOS%20ÓRGÃOS%20DE%20CONTROLE%20NO%20COMBATE%20AOS%20MALFEITOS.%20A%20RELEVÂNCIA%20DO%20PAPEL%20DO%20CIDADÃO%20NA%20FISCALIZAÇÃO%20DOS%20GASTOS%20DOS%20GOVERNANTES%20PARA%20SE%20CONCILIAR%20UMA%20NOVA...%202.%20ed.%20(Atualizado%20em%3A%202019)' +
      '&seriesIdList=178%2C180&MonthYearEnd=&areasInterestIdsList=' +
      '&authorsIdList=&dateInterval=0&isGrouped=true&monthYearInitial=&page=1&rows=20&searchScope=0&words=';
    // Act
    const filter = SearchFilter.createFromQueryString(querystring);

    // Assert
    expect(filter.bookIdList).toBe(
      '1382___O OVO DA SERPENTE: AS RAZÕES QUE LEVARAM A CORRUPÇÃO A SE ALASTRAR PELO BRASIL. A FRUSTRAÇÃO DOS ÓRGÃOS DE CONTROLE NO COMBATE AOS MALFEITOS. A RELEVÂNCIA DO PAPEL DO CIDADÃO NA FISCALIZAÇÃO DOS GASTOS DOS GOVERNANTES PARA SE CONCILIAR UMA NOVA... 2. ed. (Atualizado em: 2019)'
    );
    expect(filter.seriesIdList).toBe('178,180');
  });

  test('deve saber ler os campos do filtro de video vindo de uma querystring.', () => {
    // Arrange
    const querystring =
      'eventsIdList=45___FCGP%202019%20-%2017°%20FÓRUM%20BRASILEIRO%20DE%20CONTRATAÇÃO%20E%20GESTÃO%20PÚBLICA%7B44___30%20ANOS%20DA%20CONSTITUIÇÃO%20FEDERAL&videoSeriesIdList=184%2C183&MonthYearEnd=&areasInterestIdsList=&authorsIdList=&dateInterval=0&isGrouped=true&monthYearInitial=&page=1&rows=20&searchScope=0&words=';

    // Act
    const filter = SearchFilter.createFromQueryString(querystring);

    // Assert
    expect(filter.eventsIdList).toBe(
      '45___FCGP 2019 - 17° FÓRUM BRASILEIRO DE CONTRATAÇÃO E GESTÃO PÚBLICA{44___30 ANOS DA CONSTITUIÇÃO FEDERAL'
    );
    expect(filter.videoSeriesIdList).toBe('184,183');
  });

  test('deve saber ler os campos do filtro de informativo vindo de uma querystring.', () => {
    ['true', 'false'].forEach((monthly) => {
      // Arrange
      const querystring = `MonthYearEnd=&areasInterestIdsList=&authorsIdList=&dateInterval=0&isGrouped=true&monthYearInitial=&page=1&rows=20&searchScope=0&words=&clippingDate=2019-10-09&clippingId=jacoby&clippingMonthly=${monthly}`;

      // Act
      const filter = SearchFilter.createFromQueryString(querystring);

      // Assert
      expect(filter.clippingMonthly).toBe(monthly === 'true');
      expect(filter.clippingId).toBe('jacoby');
      expect(filter.clippingDate).toBe('2019-10-09');
    });
  });

  test('deve saber ler os campos do filtro de codigo vindo de uma querystring.', () => {
    // Arrange
    const querystring =
      'codeIdList=3___CÓDIGO%20CIVIL%7B20___NOVO%20CÓDIGO%20DE%20PROCESSO%20CIVIL&MonthYearEnd=&areasInterestIdsList=&authorsIdList=&dateInterval=0' +
      '&isGrouped=true&monthYearInitial=&page=1&rows=20&searchScope=0&words=';

    // Act
    const filter = SearchFilter.createFromQueryString(querystring);

    // Assert
    expect(filter.codeIdList).toBe(
      '3___CÓDIGO CIVIL{20___NOVO CÓDIGO DE PROCESSO CIVIL'
    );
  });

  test('deve conseguir limpar os campos de filtros especificos.', () => {
    // Arrange
    const querystring =
      "MonthYearEnd=&areasInterestIdsList=1___Administrativo%7B2___Ambiental&articleType=2&authorsIdList=25431___Cláudio%20Marcelo%20Edwards%20Barros&bookIdList=1801___A%20RESPONSABILIDADE%20DO%20ESTADO%20POR%20ACTOS%20LÍCITOS%20(Atualizado%20em%3A%202019)&clippingDate=2019-10-04&clippingId=jacoby&clippingMonthly=false&codeIdList=18___CONSTITUIÇÃO%20DA%20REPÚBLICA%20FEDERATIVA%20DO%20BRASIL&dateInterval=0&eraseSpecificFilters=function%20()%20%7B%20%20%20%20%20%20_this.videoSeriesIdList%20%3D%20''%3B%20%20%20%20%7D&eventsIdList=44___30%20ANOS%20DA%20CONSTITUIÇÃO%20FEDERAL&isGrouped=false&monthYearInitial=&page=1&periodicIdList=158___ABRAT%20-%20REVISTA%20DA%20ASSOCIAÇÃO%20BRASILEIRA%20DE%20ADVOGADOS%20TRABALHISTAS&rows=20&searchScope=1&seriesIdList=179&videoSeriesIdList=&words=direito";
    const oldFilter = SearchFilter.createFromQueryString(querystring);

    // Act
    const filter = oldFilter.eraseSpecificFilters();

    // Assert
    expect(filter.words).toBe('direito');
    expect(filter.authorsIdList).toBe(oldFilter.authorsIdList);
    expect(filter.searchScope).toBe(SearchFilter.Empty.searchScope);
    expect(filter.page).toBe(SearchFilter.DEFAULT_PAGE);
    expect(filter.dateInterval).toBe(0);
    expect(filter.rows).toBe(SearchFilter.DEFAULT_ROWS);
    expect(filter.articleType).toBe(SearchFilter.Empty.articleType);
    expect(filter.authorsIdList).toBe(oldFilter.authorsIdList);
    expect(filter.areasInterestIdsList).toBe(
      '1___Administrativo{2___Ambiental'
    );
    expect(filter.isGrouped).toBe(false);
    expect(filter.bookIdList).toBe(SearchFilter.Empty.bookIdList);
    expect(filter.seriesIdList).toBe(SearchFilter.Empty.seriesIdList);
    expect(filter.periodicIdList).toBe(SearchFilter.Empty.periodicIdList);
    expect(filter.eventsIdList).toBe(SearchFilter.Empty.eventsIdList);
    expect(filter.videoSeriesIdList).toBe(SearchFilter.Empty.videoSeriesIdList);
    expect(filter.clippingId).toBe(SearchFilter.Empty.clippingId);
    expect(filter.clippingMonthly).toBe(SearchFilter.Empty.clippingMonthly);
    expect(filter.clippingDate).toBe(SearchFilter.Empty.clippingDate);
    expect(filter.codeIdList).toBe(SearchFilter.Empty.codeIdList);
  });

  test('nao deve fazer parse dos metodos do objeto', () => {
    // Arrange
    const initialQuerystring =
      'MonthYearEnd=&areasInterestIdsList=1___Administrativo%7B2___Ambiental&articleType=2&authorsIdList=25431___Cláudio%20Marcelo%20Edwards%20Barros&bookIdList=1801___A%20RESPONSABILIDADE%20DO%20ESTADO%20POR%20ACTOS%20LÍCITOS%20(Atualizado%20em%3A%202019)&clippingDate=2019-10-04&clippingId=jacoby&clippingMonthly=false&codeIdList=18___CONSTITUIÇÃO%20DA%20REPÚBLICA%20FEDERATIVA%20DO%20BRASIL&dateInterval=0&&eventsIdList=44___30%20ANOS%20DA%20CONSTITUIÇÃO%20FEDERAL&isGrouped=false&monthYearInitial=&page=1&periodicIdList=158___ABRAT%20-%20REVISTA%20DA%20ASSOCIAÇÃO%20BRASILEIRA%20DE%20ADVOGADOS%20TRABALHISTAS&rows=20&searchScope=1&seriesIdList=179&videoSeriesIdList=&words=direito';
    const filter = SearchFilter.createFromQueryString(initialQuerystring);

    // Act
    const querystring = filter.convertToQueryString();

    // Assert
    expect(querystring).not.toContain('eraseSpecificFilters');
    expect(querystring).not.toContain('getBadgeCount');
    expect(querystring).not.toContain('setWords');
    expect(querystring).not.toContain('convertToQueryString');
  });
});
