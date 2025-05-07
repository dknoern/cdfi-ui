import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { MainMenu } from './MainMenu';

const MainMenuFn: FC = () => {

  return (
    <>
      <MainMenu />
    </>
  );
};

export const MainMenuContainer = withRouter(observer(MainMenuFn));
