import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import { images } from '../constants';
import styles from './SiderMenu.module.scss';

const menuItems = [
  { key: 'library', title: 'Library', path: '/libraries' },
  {
    key: 'input',
    title: 'Data Input / History',
    path: '/datainput',
  },
  { key: 'upload', title: 'Data Upload', path: '/dataupload' },
];

export const PCMenu: FC = () => {
  const history = useHistory();
  // const selectedKeys = useMemo(() => {
  //   return menuItems
  //     .filter((item) => location.pathname.includes(item.path))
  //     .map((item) => item.key);
  // }, [location.pathname]);

  const handleMenuItemClick = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history],
  );

  return (
    <Menu
      id="dataMenu"
      mode="inline"
      theme="dark"
      className={styles.menu}
      defaultOpenKeys={['documents']}
      openKeys={['documents']}
      expandIcon={(props: any): React.ReactNode => null}
    >
      <Menu.SubMenu
        key="documents"
        title={
          <>
            <FileOutlined />
            Data / Documents
          </>
        }
      >
        {menuItems.map(({ key, title, path }) => (
          <Menu.Item
            key={key}
            onClick={(): void => {
              handleMenuItemClick(path);
            }}
          >
            {images.dot}
            {title}
          </Menu.Item>
        ))}
      </Menu.SubMenu>
    </Menu>
  );
};
