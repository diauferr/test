import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Radio } from 'antd';
import { ContentTypeName } from '../../../pages/pesquisa/enums/ContentTypeName';
import { useSearchContext } from '../../../pages/pesquisa/hooks/useSearchContext';
import { SearchFilter } from '../../../models/search/SearchFilter';
import { useSearchFilter } from '../../../pages/pesquisa/hooks/useSearchFilter';
import { SearchScope } from '../../../pages/pesquisa/enums/SearchScope';
import { VideoFiltersContext } from '../../../pages/v2/video/VideoFiltersContext';
import { BookFiltersContext } from '../../../pages/v2/book/BookFiltersContext';
import { Button, Container, Icon, Input, RadioGroup, Wrapper } from './styles';
import { NavbarContext } from '../NavbarFilters/NavbarContext';
import MagnifyingGlassIcon from '../../../assets/images/lupa.svg';

const BASE_VIDEO = '/conteudo/videos';
const BASE_BOOK = '/conteudo/livros';
const BASE_SEARCH = '/pesquisa';

export function getRouteParams(pathname: string): {
  contentTypeNameFromUrl: ContentTypeName;
  queryString: string;
} {
  let [urlFirstPart, selectedContentTypeName, queryString] = pathname
    .split('/')
    .filter((i) => !!i);

  selectedContentTypeName =
    urlFirstPart === 'pesquisa'
      ? (selectedContentTypeName as ContentTypeName)
      : ContentTypeName.ALL;

  queryString = urlFirstPart === 'pesquisa' ? queryString || '' : '';

  return {
    contentTypeNameFromUrl: selectedContentTypeName as ContentTypeName,
    queryString
  };
}

export const NavbarSearch = () => {
  const location = useLocation();
  const history = useHistory();
  const { filter } = useSearchFilter();
  const { changeFilter } = useSearchContext();
  const [words, setWords] = useState(filter.words);
  const { submit, updateData, setAdvancedData } =
    useContext(VideoFiltersContext);

  const { updateData: updateDataBook, setAdvancedData: setAdvancedDataBook } =
    useContext(BookFiltersContext);

  const { searchOpen } = useContext(NavbarContext);

  const doSearchVideo = (words: string) => {
    const query = words.trim();
    const queryParam = encodeURIComponent(query).replace('%20', '+');
    const url = `${BASE_VIDEO}?v=2&query=${queryParam}`;

    setAdvancedData([{ type: 'AND', text: query, exact: true }]);
    updateData();

    window.history.replaceState({}, document.title, url);
  };

  const doSearchBook = (words: string) => {
    const query = words.trim();
    const queryParam = encodeURIComponent(query).replace('%20', '+');
    const url = `${BASE_BOOK}?v=2&query=${queryParam}`;

    setAdvancedDataBook([{ type: 'AND', text: query, exact: true }]);
    updateDataBook();

    window.history.replaceState({}, document.title, url);
  };

  const doSearch = useCallback(
    (words: string) => {
      const { REACT_APP_NEW_BOOK_VERSION } = process.env;
      const newBookVersion = String(REACT_APP_NEW_BOOK_VERSION) === 'true';
      if (location.pathname.startsWith(BASE_BOOK) && newBookVersion) {
        return doSearchBook(words);
      }
      if (location.pathname.startsWith(BASE_VIDEO)) {
        doSearchVideo(words);
      } else if (location.pathname.startsWith(BASE_SEARCH)) {
        filter.words = words;
        changeFilter(filter);
      } else {
        const filter = new SearchFilter(words);
        const url = `${BASE_SEARCH}/${SearchScope}?${filter.convertToQueryString()}`;
        history.push(url);
      }
    },
    [location.pathname, filter, submit]
  );

  useEffect(() => {
    setWords(filter.words);
  }, [filter.words]);

  const [radioValue, setRadioValue] = useState(filter.searchScope);

  const selectScope = (e: any) => {
    filter.searchScope = e.target.value;
    changeFilter(filter);
    setRadioValue(filter.searchScope);
  };

  return (
    <Container className={searchOpen ? 'opened' : 'closed'}>
      <Wrapper>
        <Input
          placeholder="O que você deseja encontrar?"
          value={words}
          onChange={(e: any) => setWords(e.target.value || '')}
          onKeyPress={(e: any) => (e.key === 'Enter' ? doSearch(words) : null)}
        />
        <Button onClick={() => doSearch(words)}>
          <Icon src={MagnifyingGlassIcon} alt={MagnifyingGlassIcon} />
        </Button>
      </Wrapper>
      <Wrapper>
        <RadioGroup onChange={selectScope} defaultValue={radioValue}>
          <Radio value={0}>Em todo conteúdo</Radio>
          <Radio value={1}>Somente no título</Radio>
        </RadioGroup>
        <div className="sep" />
      </Wrapper>
    </Container>
  );
};
