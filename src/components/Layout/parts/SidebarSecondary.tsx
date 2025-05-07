import React, { FC } from 'react';
import { observer } from 'mobx-react';
import {
  RouteComponentProps,
  withRouter,
  Link,
  useLocation,
} from 'react-router-dom';
import { Layout } from 'antd';
import { workDataStore } from 'store';
import { images } from '../constants';
import { makeItems } from '../tools';
import styles from './Sidebars.module.scss';

const { Sider } = Layout;

const SidebarSecondary: FC<RouteComponentProps> = () => {
  const location = useLocation();

  const useItems = makeItems(
    workDataStore.viewMode,
    workDataStore.viewModeConfig,
  );

  return (
    <Sider width={100} className={styles.sider2}>
      <ul className={styles.buttons}>
        {useItems.map((item) => (
          <li key={item.key}>
            <Link
              id={`${item.key}NavigationButton`}
              to={item.path}
              className={`${
                location.pathname.includes(item.key) ? styles.active : undefined
              }`}
            >
              {images[item.icon]}
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Sider>
  );
};

export const Sidebar2 = withRouter(observer(SidebarSecondary));
