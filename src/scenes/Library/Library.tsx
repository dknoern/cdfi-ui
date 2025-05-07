import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { GlobalLibraryFolders } from './GlobalLibrary';
import { AerisGlobalLibrary } from './GlobalLibrary/AerisGlobalLibrary';

export const Library: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path={`${path}/:libraryId/folder/:folderId`}
        component={GlobalLibraryFolders}
      />
      <Route
        exact
        path={`${path}/:libraryId`}
        component={GlobalLibraryFolders}
      />
      <Route exact path={`${path}`} component={AerisGlobalLibrary} />
    </Switch>
  );
};
