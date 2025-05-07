import React, {FC, useMemo} from 'react';
import { observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import { Layout, Button } from 'antd';
import {
  HomeFilled,
  ProfileOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { uiStore, userStore } from 'store';
import Logo from 'assets/images/aeris-cloud-logo-white.png';
import { images } from '../constants';
import { SiderButton, MainMenuContainer } from '../components';

import styles from './Sidebars.module.scss';
import { MainMenuCollapsedContainer } from '../components/MainMenuCollapsedContainer';

const { Sider } = Layout;
const SIDER1_WIDTH = 250;
const SIDER1_WIDTH_COLLAPSED = 72;

export const SidebarMainFn: FC = () => {
  const siderMenu = <MainMenuContainer />;
  const siderMenuCollapsed = useMemo(() => <MainMenuCollapsedContainer />, []);

  const location = useLocation();

  const isRootHome = useMemo(
    () => location.pathname.replace('/', '').toLowerCase() === 'dashboard',
    [location.pathname],
  );

  const isMetricsActive = useMemo(
    () => location.pathname.includes('/metrics'),
    [location.pathname],
  );

  const isPopoverActive = useMemo(
    () =>
      location.pathname.includes('/data') ||
      location.pathname.includes('/libraries'),
    [location.pathname],
  );

  return (
    <Sider
      width={uiStore.sidebarCollapsed ? SIDER1_WIDTH_COLLAPSED : SIDER1_WIDTH}
      theme="dark"
      className={styles.sider1}
    >
      <div className={styles.sider1Content}>
        <div className={`${styles.content} ${styles.contentDefault}`}>
          <div className={styles.logoContainer}>
            <img src={Logo} alt="Aeris Atlas logo" />
          </div>
          <div className={styles.scrollableContentWrapper}>
            <div className={styles.scrollableContent}>
              <SiderButton
                id="homeButton"
                icon={<HomeOutlined />}
                text="Home"
                path="/dashboard"
                isActive={isRootHome}
                key="manage"
              />
              {userStore.isPC && (
                <SiderButton
                  id="metricsButton"
                  icon={<ProfileOutlined />}
                  text="Metrics"
                  path="/metrics"
                  isActive={isMetricsActive}
                  key="manage"
                />
              )}
              {siderMenu}
            </div>
          </div>
          <div className={styles.utilityBlock}>
            {/* TODO: Add this back in once we know which users should see what (admin vs cdfi etc)
            <SiderUtilityButton onClick={activateTermsOfServiceFlow}>
              Terms of Service
            </SiderUtilityButton>
            <SiderUtilityButton onClick={activatePrivacyFlow}>
              Privacy
            </SiderUtilityButton>
            {userStore.isFM && (
              <SiderUtilityButton onClick={activateContactSupportFlow}>
                Contact CDFI Support
              </SiderUtilityButton>
            )} */}
          </div>
        </div>
        <div className={`${styles.content} ${styles.contentCollapsed}`}>
          <div className={styles.logoContainer}>{images.a}</div>
          <SiderButton
            id="homeButtonCollapsed"
            icon={<HomeFilled />}
            path="/dashboard"
            isActive={isRootHome}
            key="manage"
          />
          {siderMenuCollapsed}
        </div>
      </div>
      <div className={styles.triggerContainer}>
        <Button
          id="siderCollapseTriggerButton"
          type="link"
          onClick={uiStore.toggleSidebar}
        >
          {images.trigger}
        </Button>
      </div>
    </Sider>
  );
};

export const AerisSidebar = observer(SidebarMainFn);
