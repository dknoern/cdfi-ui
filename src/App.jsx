import React from 'react';
import { ConfigProvider } from 'antd';
import { observer } from 'mobx-react';
import { HashRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { uiStore, userStore } from 'store';
import { BlockingLoader, ErrorBoundary } from 'components';
import { Log, authTools } from 'tools';
import { getGlobalPopupContainer } from 'tools/antConfig';
import { rootComp } from 'scenes/Root';

import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/bootstrap.scss';
import './assets/scss/App.scss';

Log.logger = console;

authTools.authorizeLocal();

const AppFn = () => {
  const { isLogged, isFirstLogin } = userStore;
  const toastDuration = uiStore.errorMsgLength > 50 ? uiStore.errorMsgLength * 100 : 5000;
  return (
    <Router>
      <ErrorBoundary>
        <ConfigProvider getPopupContainer={getGlobalPopupContainer}>
          {rootComp({ isLogged, isFirstLogin })}
        </ConfigProvider>
      </ErrorBoundary>
      <ToastContainer
        position="bottom-right"
        autoClose={toastDuration}
        newestOnTop
        draggable={false}
      />
      <BlockingLoader />
    </Router>
  );
};

export default observer(AppFn);
