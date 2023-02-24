import React from 'react';
import { useHistory, useRouteMatch, matchPath } from 'react-router';
import { useLocation } from 'react-router-dom';
import { SearchFilter } from '../../../models/search/SearchFilter';
import { useSearchFilter } from '../../../pages/pesquisa/hooks/useSearchFilter';
import { AreasFilter } from '../../../pages/pesquisa/components/filters/AreasFilter';
import { AuthorFilter } from '../../../pages/pesquisa/components/filters/AuthorFilter';
import { PeriodicFilter } from '../../../pages/pesquisa/components/filters/PeriodicFilter';
import { BookFilter } from '../../../pages/pesquisa/components/filters/BookFilter';
import { BookSerieFilter } from '../../../pages/pesquisa/components/filters/BookSerieFilter';
import { NewsletterFilter } from '../../../pages/pesquisa/components/filters/NewsletterFilter';
import { CodeFilter } from '../../../pages/pesquisa/components/filters/CodeFilter';
import { VideoNavBarFilters } from '../../../pages/v2/video/VideoNavBarFilters';
import { BookNavBarFilters } from '../../../pages/v2/book/BookNavBarFilters';
import { Badge, Button, Container, Popover, Trigger, Wrapper } from './styles';

interface Props {
  activeFiltersCount: number;
}

export const ClearButton = ({ activeFiltersCount }: Props) => {
  const match = useRouteMatch();
  const history = useHistory();
  const { filter } = useSearchFilter();

  return (
    <Badge count={activeFiltersCount} offset={[-17, 1]} showZero>
      <Button
        style={{
          border: '2px solid #D7282F',
          backgroundColor: 'transparent',
          color: '#D7282F'
        }}
        onClick={() => {
          const [, pathPart1, pathPart2] = match.url.split('/');

          if (filter.words) {
            const newFilter = new SearchFilter(filter.words);
            history.push(
              `/${pathPart1}/${pathPart2}/${newFilter.convertToQueryString()}`
            );
          } else {
            history.push(
              `/${pathPart1}/${pathPart2}?MonthYearEnd=&areasInterestIdsList=&articleType=1&authorsIdList=&bookIdList=&clippingDate=&clippingId=&clippingMonthly=false&codeIdList=&dateInterval=0&eventsIdList=&isGrouped=true&monthYearInitial=&page=1&periodicIdList=&rows=20&searchScope=${filter.searchScope}&seriesIdList=&videoSeriesIdList=&`
            );
          }
        }}>
        Limpar filtros
      </Button>
    </Badge>
  );
};

export const NavbarFilters = () => {
  const location = useLocation();

  // const isInTodos = location.pathname === '/pesquisa/todos';
  const isInRevistas = location.pathname === '/pesquisa/revistas';
  const isInLivros = location.pathname === '/pesquisa/livros';
  const isInInformativos = location.pathname === '/pesquisa/informativos';
  const isInCodigos = location.pathname === '/pesquisa/codigos';
  const isInLegislacao = location.pathname === '/pesquisa/legislacao-comentada';

  const routeArgs = { exact: true, strict: false };

  const isVideoList = matchPath(location.pathname, {
    ...routeArgs,
    path: '/conteudo/videos'
  });
  const isVideoView = matchPath(location.pathname, {
    ...routeArgs,
    path: '/conteudo/videos/:videoId'
  });

  const isBookList = matchPath(location.pathname, {
    ...routeArgs,
    path: '/conteudo/livros'
  });
  // const isBookView = matchPath(location.pathname, {
  //   ...routeArgs,
  //   path: '/conteudo/livros/:id'
  // });

  const { filter } = useSearchFilter();

  const activeFiltersCount = filter
    ? SearchFilter.getSumOfActiveFilters(filter.getBadgeCount())
    : 0;

  if (isVideoView) return <></>;

  return (
    <Container>
      <Wrapper>
        {isVideoList ? (
          <VideoNavBarFilters />
        ) : isBookList ? (
          <BookNavBarFilters />
        ) : (
          <>
            {!isInInformativos && !isInCodigos && !isInLegislacao && (
              <Popover
                content={<AreasFilter />}
                trigger="click"
                getPopupContainer={(trigger) => trigger}
                placement="bottom">
                <Trigger>
                  <Button>Áreas de interesse</Button>
                </Trigger>
              </Popover>
            )}
            {!isInInformativos && !isInCodigos && !isInLegislacao && (
              <Popover
                content={<AuthorFilter />}
                trigger="click"
                getPopupContainer={(trigger) => trigger}
                placement="bottom">
                <Trigger>
                  <Button>Autor</Button>
                </Trigger>
              </Popover>
            )}
            {isInRevistas && (
              <Popover
                content={<PeriodicFilter />}
                trigger="click"
                getPopupContainer={(trigger) => trigger}
                placement="bottom">
                <Trigger>
                  <Button>Revista</Button>
                </Trigger>
              </Popover>
            )}
            {isInLivros && (
              <Popover
                content={<BookFilter />}
                trigger="click"
                getPopupContainer={(trigger) => trigger}
                placement="bottom">
                <Trigger>
                  <Button>Livro</Button>
                </Trigger>
              </Popover>
            )}
            {isInLivros && (
              <Popover
                content={<BookSerieFilter />}
                trigger="click"
                getPopupContainer={(trigger) => trigger}
                placement="bottom">
                <Trigger>
                  <Button>Série</Button>
                </Trigger>
              </Popover>
            )}
            {isInInformativos && (
              <Popover
                content={<NewsletterFilter />}
                trigger="click"
                getPopupContainer={(trigger) => trigger}
                placement="bottom">
                <Trigger>
                  <Button>Informativo</Button>
                </Trigger>
              </Popover>
            )}
            {isInCodigos && (
              <Popover
                content={<CodeFilter />}
                trigger="click"
                getPopupContainer={(trigger) => trigger}
                placement="bottom">
                <Trigger>
                  <Button>Código</Button>
                </Trigger>
              </Popover>
            )}
            {!isInLegislacao && (
              <ClearButton activeFiltersCount={activeFiltersCount} />
            )}
          </>
        )}
      </Wrapper>
    </Container>
  );
};
