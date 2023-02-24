import React from 'react';
import { Route, Switch } from 'react-router';
import { AnnotationListPage } from '../pages/anotacoes/AnnotationListPage';

export const AnnotationRoutes = () => (
  <Switch>
    <Route path={'/anotacoes/:page'} component={AnnotationListPage} />
  </Switch>
);
