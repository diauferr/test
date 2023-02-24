import React from 'react';
import { Route, Switch } from 'react-router';
import { FolderContextProvider } from './context/FolderContextProvider';

import { FolderInvitationPage } from './FolderInvitationPage';
import { FolderContentPage } from './FolderContentPage';
import { FolderListPage } from './FolderListPage';

export const FolderRoutes = () => (
  <FolderContextProvider>
    <Switch>
      <Route
        path={'/pastas/:folderId/participantes'}
        component={FolderInvitationPage}
      />
      <Route path={'/pastas/:folderId'} component={FolderContentPage} />
      <Route path={'/pastas/'} component={FolderListPage} />
    </Switch>
  </FolderContextProvider>
);
