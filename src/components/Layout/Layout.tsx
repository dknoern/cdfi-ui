import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router-dom';
import { Layout as AntLayout } from 'antd';
import { userStore, uiStore } from 'store';
import { ActivityConfirmationModal } from 'modals/ActivityConfirmationModal';
import AerisFooter from 'components/Layout/parts/AerisFooter/AerisFooter';
import { Sidebar2, Header } from './parts';
import { AerisSidebar } from './AerisSidebar/parts/AerisSidebar';
import styles from './Layout.module.scss';
import { authTools } from 'tools';

const { Content } = AntLayout;

const LayoutFn: FC = ({ children }) => {
  const manageMatch = useRouteMatch('/manage/:section');
  const fundMatch = useRouteMatch('/:section/fundmanager/:id');
  const [isModalVisible, setModalVisibility] = useState(false);
  // TODO: relocate mapper and fix match condition
  const isManageMenu =
    manageMatch && !manageMatch.url.toLocaleLowerCase().includes('mapper');

  const siderNeeded =
    (userStore.isFM && !isManageMenu) ||
    ((userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) && !!fundMatch);

  const onModalClickHandle = () => {
    userStore.setRefreshTokenModalVisibility(false);
    authTools.renewTokens().then(() => {
      authTools.setTokenRenewer(userStore.exp);
    });
  };

  useEffect(() => {
    ['click', 'keyup'].forEach(
      (evt) =>
        document.addEventListener(evt, () => {
          userStore.setClickTime(new Date());
        }),
      false,
    );
  }, []);

  useEffect(() => {
    setModalVisibility(userStore.getRefreshTokenModalVisibility());
  }, [userStore.refreshTokenModalVisibility, userStore.token]);

  return (
    <AntLayout
      hasSider
      className={`${styles.root} ${
        uiStore.sidebarCollapsed ? 'sidebar-collapsed' : ''
      }`}
    >
      <AerisSidebar />
      <AntLayout
        className={`${styles.underRoot} ${
          !siderNeeded ? styles.withoutInnerSidebar : ''
        }`}
      >
        <Header />
        <AntLayout hasSider={siderNeeded}>
          {siderNeeded && <Sidebar2 />}
          <Content id="MainBodyWrapper" className={styles.container}>
            {children}
          </Content>
        </AntLayout>
        <AerisFooter />
      </AntLayout>
      <ActivityConfirmationModal
        visible={isModalVisible}
        onOkClick={onModalClickHandle}
      />
    </AntLayout>
  );
};

export const Layout = observer(LayoutFn);
