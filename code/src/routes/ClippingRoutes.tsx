import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { EditionPage } from '../pages/informativos/EditionPage';
import { ContentWithTitleTemplate } from '../components/_templates/ContentWithTitleTemplate';
import { Loading } from '../components/_shell/Loading';
import { Title } from '../components/_shell/Title';
import { ButtonsBar } from '../components/_shell/ButtonsBar';
import { ClippingSelection } from '../pages/informativos/components/ClippingSelection';

export const ClippingRoutes = (props: RouteComponentProps) => {
  const loading = false;

  return (
    <ContentWithTitleTemplate
      TitleContent={loading ? <Loading /> : <Title>Informativos</Title>}
      Content={
        <>
          <ButtonsBar style={{ paddingTop: '1rem' }}>
            <ClippingSelection {...props} />
          </ButtonsBar>
          <Switch>
            <Route
              path={'/informativos/:clippingId/:year/:month/:day?'}
              component={EditionPage}
            />
          </Switch>
        </>
      }
    />
  );
};
