import React, { ReactNode, useEffect } from 'react';
import ErrorBoundary from './components/_shell/ErrorBoundary';
import { ConfigProvider, message } from 'antd';
import { createBrowserHistory, History } from 'history';
import { Route, Router } from 'react-router';
import { GoogleAnalyticsLoader } from './components/_shell/GoogleAnalyticsLoader';
import { HotjarLoader } from './components/_shell/HotjarLoader';
import { AuthProvider } from './features/auth_v2/AuthContext';
import { SessionRefresher } from './features/auth_v2/components/SessionRefresher';
import { GlobalStyle } from './GlobalStyle';
import { Routes } from './Routes';
import { HttpClient } from './util/http_client';
import { UserSession } from './features/auth_v2/model/UserSession';
import { NavbarProvider } from './components/_shell/NavbarFilters/NavbarContext';
import { VideoFiltersProvider } from './pages/v2/video/VideoFiltersContext';
import { BookFiltersProvider } from './pages/v2/book/BookFiltersContext';
import './features/auth_v2/AuthContext.css';

interface IProps {
  history?: History;
  test_session?: UserSession;
  test_children?: ReactNode;
}

const browserHistory = createBrowserHistory();

const App: React.FC<IProps> = ({
  history = browserHistory,
  test_session,
  test_children
}) => {
  useEffect(() => {
    // Redirect de dominio sem www para com www.
    if (
      process.env.REACT_APP_ENVIRONMENT === 'production' &&
      !window.location.origin.match('www')
    ) {
      window.location.href = process.env.REACT_APP_BASE_UI_URL;
    }

    HttpClient.on('error', () => {
      message.error(<p>erro inesperado</p>);
    });
  }, []);

  return (
    <ErrorBoundary>
      <NavbarProvider>
        <BookFiltersProvider>
          <VideoFiltersProvider>
            <Router
              {...{
                history
              }}>
              <GoogleAnalyticsLoader />
              <HotjarLoader />
              <Route
                {...{
                  path: '*',
                  render: () => (
                    <AuthProvider
                      {...{
                        test_session
                      }}>
                      {test_children ? (
                        test_children
                      ) : (
                        <ConfigProvider>
                          <GlobalStyle />
                          <SessionRefresher />
                          <Routes />
                        </ConfigProvider>
                      )}
                    </AuthProvider>
                  )
                }}
              />
            </Router>
          </VideoFiltersProvider>
        </BookFiltersProvider>
      </NavbarProvider>
    </ErrorBoundary>
  );
};

export default App;
