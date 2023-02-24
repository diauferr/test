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
import { LegislationContextProvider } from '../pages/legislacao-comentada/LegislationContextProvider';
import { ReadChapterPage } from '../pages/legislacao-comentada/ReadChapterPage';
import { LegislationPage } from '../pages/legislacao-comentada/LegislationPage';

export const LegislationRoutes = (props: any) => (
  <Route
    path={`/legislacao-comentada/:bookId/:editionId?/:chapterId?`}
    render={(props) => {
      const chapterId = _.get(props, 'match.params.chapterId');

      return (
        <LegislationContextProvider {...props}>
          <>
            {chapterId && <ReadChapterPage />}

            <LegislationPage {...props} />
          </>
        </LegislationContextProvider>
      );
    }}
  />
);
