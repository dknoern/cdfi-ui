import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { MainMenuButtonsCollapsed } from './MainMenuButtonsCollapsed';

const MainMenuCollapsedContainerFn: FC = () => {
  return (
    <>
      <MainMenuButtonsCollapsed />
    </>
  );
};

export const MainMenuCollapsedContainer = withRouter(
  observer(MainMenuCollapsedContainerFn),
);
