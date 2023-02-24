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

import React from 'react';
import _ from 'lodash';
import { Route } from 'react-router';
import { PeriodicContextProvider } from '../pages/periodico/PeriodicContextProvider';
import ReadArticlePage from '../pages/periodico/ReadArticlePage';
import { PeriodicPage } from '../pages/periodico/PeriodicPage';
import ReadEspecialPage from '../pages/periodico/ReadEspecialPage';

export const PeriodicRoutes = (props: any) => (
  <Route
    path={`/periodico/:periodicId/:editionId?/:articleId?`}
    render={(props: any) => {
      const articleId = _.get(props, 'match.params.articleId');

      return (
        <PeriodicContextProvider {...props}>
          <>
            {articleId && <ReadArticlePage {...props} />}

            <PeriodicPage {...props} />
          </>
        </PeriodicContextProvider>
      );
    }}
  />
);

export const PeriodicSpecialPageRoutes = (props: any) => (
  <Route
    path="/:type/periodico/:periodicId"
    render={(props: any) => {
      const type = _.get(props, 'match.params.type');

      return (
        <PeriodicContextProvider {...props}>
          <>
            {type === 'expediente' || type === 'normas' ? (
              <ReadEspecialPage type={type} {...props} />
            ) : (
              <p></p>
            )}
          </>
        </PeriodicContextProvider>
      );
    }}
  />
);
