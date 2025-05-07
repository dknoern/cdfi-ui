import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Menu as AntMenu, Menu } from 'antd';
import { cdfiStore, userStore } from 'store';
import Paragraph from 'antd/lib/typography/Paragraph';
import { subscriberStore } from 'store/subscriberStore';
import { SiderButton } from './SiderButton';
import {
  adminCdfiSelectedItems,
  adminSubscriberSelectedItems,
} from '../routes/admin-routes';
import { menuItemsByUser } from '../routes/user-routes';
import { getIcons } from '../tools/tools';
import styles from '../../components/SiderMenu.module.scss';
import { SeparatorLine } from '../../../SeparatorLine';
import { ManagementMenuItem } from './types';
import { useCdfiOrgDetails } from 'dataManagement/useCdfis';
import { useAppConfig } from 'useAppConfig';
export const MainMenuButtons: FC = () => {
  // section must match menu item's key
  const manageRouteMatch =
    useRouteMatch<{ section: string }>('/manage/:section');
  const { cdfiId } = cdfiStore;
  const { subscriberId } = subscriberStore;
  const { data: cdfiOrg } = useCdfiOrgDetails(cdfiId);
  const isRated = cdfiOrg ? cdfiOrg.cdfi.rated : false;
  const { NEW_ROLES_ENABLED } = useAppConfig();
  // Set menu based on user role/company type and whether cdfi/subscriber is selected
  let menu = menuItemsByUser(isRated, NEW_ROLES_ENABLED);
  const { SUPPLEMENTAL_DATA_ENABLED } = useAppConfig();

  if (cdfiId && !subscriberId && (userStore.isAerisAdmin || userStore.isAerisAnalyst || userStore.isStaff || userStore.isContractor)) {
    // A cdfi is selected from dropdown
    menu = adminCdfiSelectedItems(isRated, SUPPLEMENTAL_DATA_ENABLED);
  } else if (subscriberId) {
    // subscriber is selected from dropdown
    menu = adminSubscriberSelectedItems();
  }

  return (
    <>
      {menu[userStore.userRole].map((item, i) => {
        if (!item.children?.length) {
          if (item.divider) {
            return (
              <div key={i}>
                <Paragraph className={styles.menuTitle}>{item.title}</Paragraph>
                <SeparatorLine />
              </div>
            );
          }
          return (
            <SiderButton
              key={i}
              icon={getIcons(item.icon)}
              id={item.title}
              user={item.key}
              path={item.path}
              text={item.title}
              disabled={item.disabled}
            />
          );
        }
        return (
          <ul key={i}>
            <AntMenu
              id="AdminMenu"
              mode="inline"
              theme="dark"
              className={styles.menu}
              selectedKeys={
                manageRouteMatch ? [manageRouteMatch.params.section] : undefined
              }
            >
              <AntMenu.SubMenu
                title={item.title}
                key={i}
                className={styles.submenu}
                disabled={item.disabled}
                icon={getIcons(item.icon)}
              >
                {item.children.map(
                  (child: ManagementMenuItem, index: number) => {
                    return (
                      <Menu.Item key={index}>
                        <SiderButton
                          nested
                          id={child.title}
                          key={index}
                          user={child.key}
                          path={child.path}
                          text={child.title}
                          icon={getIcons(child.icon)}
                          disabled={child.disabled}
                        />
                      </Menu.Item>
                    );
                  },
                )}
              </AntMenu.SubMenu>
            </AntMenu>
          </ul>
        );
      })}
    </>
  );
};
