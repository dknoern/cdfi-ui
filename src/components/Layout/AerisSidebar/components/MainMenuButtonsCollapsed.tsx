import React, { FC } from 'react';
import { Popover } from 'antd';
import { cdfiStore, subscriberStore, userStore } from 'store';
import { getPopupContainer } from 'tools/antConfig';
import Paragraph from 'antd/lib/typography/Paragraph';
import { CaretRightOutlined } from '@ant-design/icons';
import { SiderButton } from './SiderButton';
import {
  adminCdfiSelectedItems,
  adminSubscriberSelectedItems,
} from '../routes/admin-routes';
import { getIcons } from '../tools/tools';
import { SeparatorLine } from '../../../SeparatorLine';
import { ManagementMenuItem } from './types';
import styles from '../../components/SiderMenu.module.scss';
import { menuItemsByUser } from '../routes/user-routes';
import { useCdfiOrgDetails } from 'dataManagement/useCdfis';
import {useAppConfig} from "../../../../useAppConfig";

export const MainMenuButtonsCollapsed: FC = () => {
  const { cdfiId } = cdfiStore;
  const { subscriberId } = subscriberStore;
  const { data: cdfiOrg } = useCdfiOrgDetails(cdfiId);
  const isRated = cdfiOrg ? cdfiOrg.cdfi.rated : false;
  const { SUPPLEMENTAL_DATA_ENABLED } = useAppConfig();

  let menu = menuItemsByUser(isRated);

  if (cdfiId && !subscriberId && (userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor)) {
    // A cdfi is selected from dropdown
    menu = adminCdfiSelectedItems(isRated, SUPPLEMENTAL_DATA_ENABLED);
  } else if (subscriberId) {
    // subscriber is selected from dropdown
    menu = adminSubscriberSelectedItems();
  }

  const popOververItem = (item: ManagementMenuItem) => {
    return (
      <>
        <Paragraph className={styles.popupTitle}>
          {getIcons(item.icon)}
          {item.title}
        </Paragraph>
        {item.children?.map((item: any, i: number) => {
          return (
            <SiderButton
              nested
              key={i}
              path={item.path}
              text={item.title}
              id={item.title}
              icon={getIcons(item.icon)}
              disabled={item.disabled}
              count={i}
              isSubMenu={true}
            />
          );
        })}
      </>
    );
  };
  return (
    <>
      {menu[userStore.userRole].map((item, i) => {
        if (!item.children?.length) {
          if (item.divider) {
            return (
              <div key={i}>
                <SeparatorLine />
              </div>
            );
          }
          return (
            <SiderButton
              key={i}
              id={item.title}
              icon={getIcons(item.icon)}
              path={item.path}
              disabled={item.disabled}
              count={i}
            />
          );
        }
        return (
          <div key={i}>
            <Popover
              id="menuPopover"
              overlayClassName={styles.darkPopover}
              overlayInnerStyle={{ background: 'none' }}
              content={popOververItem(item)}
              placement="rightTop"
              trigger={item.disabled ? '' : 'hover'}
              arrowPointAtCenter
              autoAdjustOverflow
              align={{ offset: [0, -25] }}
              getPopupContainer={getPopupContainer}
            >
              <div className={styles.popMenuIcon}>
                <button disabled={item.disabled}>
                  {getIcons(item.icon)}
                  <CaretRightOutlined className={styles.rightCarret} />
                </button>
              </div>
            </Popover>
          </div>
        );
      })}
    </>
  );
};
