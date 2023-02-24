import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AnnotationRoutes } from './routes/AnnotationRoutes';
import { BookRoutes } from './routes/BookRoutes';
import { ClippingRoutes } from './routes/ClippingRoutes';
import { FolderRoutes } from './pages/pastas/FolderRoutes';
import { HomePage } from './pages/home/HomePage';
import { LegislationRoutes } from './routes/LegislationRoutes';
import { MenuContextProvider } from './components/_shell/SideMenu/context/MenuContextProvider';
import { NotFound } from './pages/NotFound';
import {
  PeriodicRoutes,
  PeriodicSpecialPageRoutes
} from './routes/PeriodicRoutes';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PspdfkitLoaderProvider } from './components/_shell/PspdfkitLoaderProvider/PspdfkitLoaderProvider';
import { RedirectToContractManagerPage } from './pages/gestao-usuarios/RedirectToContractManagerPage';
import { SearchContextProvider } from './pages/pesquisa/Context/SearchContextProvider';
import { SearchPage } from './pages/pesquisa/SearchPage';
import { VideoList } from './pages/v2/video/VideoList';
import { VideoView } from './pages/v2/video/VideoView';
import { BookList } from './pages/v2/book/BookList';

import Navbar from './components/_shell/Navbar';
import { DesignSystem } from './pages/DesignSystem';
import { Footer } from './components/footer';

export const Routes = () => {
  const { REACT_APP_NEW_BOOK_VERSION } = process.env;
  const newBookVersion = String(REACT_APP_NEW_BOOK_VERSION) === 'true';
  return (
    <PspdfkitLoaderProvider>
      <SearchContextProvider>
        <MenuContextProvider>
          <Navbar />
        </MenuContextProvider>
        <Switch>
          <Redirect exact from="/" to={'/pesquisa/todos'} />
          <Redirect exact from="/pesquisa/videos" to={'/conteudo/videos'} />
          <Redirect exact from="/video/:id" to={'/conteudo/videos/:id'} />

          <ProtectedRoute path={'/anotacoes'} component={AnnotationRoutes} />
          <ProtectedRoute path={'/pastas'} component={FolderRoutes} />
          <PeriodicRoutes path={'/periodico'} />
          <PeriodicSpecialPageRoutes path={'/:type/periodico'} />
          <BookRoutes path={'/livro'} />
          <LegislationRoutes path={'/legislacao-comentada'} />
          <ProtectedRoute exact path={`/inicial`} component={HomePage} />

          <ProtectedRoute
            path={'/informativos/:clippingId?/:year?/:month?/:day?'}
            component={ClippingRoutes}
          />
          <ProtectedRoute
            path={'/gestao-usuarios'}
            component={RedirectToContractManagerPage}
          />
          <ProtectedRoute
            exact
            path={`/conteudo/videos`}
            component={VideoList}
          />
          <ProtectedRoute
            exact
            path={'/conteudo/videos/:videoId'}
            component={VideoView}
          />
          <ProtectedRoute
            exact
            path={`/conteudo/livros`}
            component={newBookVersion ? BookList : NotFound}
          />
          <ProtectedRoute
            exact
            path={`/pesquisa/:contentType/:queryString?`}
            component={SearchPage}
          />
          <ProtectedRoute
            exact
            path={`/design-system`}
            component={DesignSystem}
          />

          <Route path={'*'} component={NotFound} />
        </Switch>
        <Footer />
      </SearchContextProvider>
    </PspdfkitLoaderProvider>
  );
};
