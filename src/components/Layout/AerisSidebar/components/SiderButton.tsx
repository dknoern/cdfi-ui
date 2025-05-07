import React, { FC, ReactNode, ReactText, useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {cdfiStore, subscriberStore, uiStore} from 'store';
import { Popover } from 'antd';
import {getPopupContainer} from "../../../../tools/antConfig";
import { downloadStaticDocumentParameter } from 'dataManagement/operations/documentOperations';
import { DownloadTitles } from '../constants';
import styles from './SiderButton.module.scss';

const { setCdfiId } = cdfiStore;
const { setSubscriberId } = subscriberStore;

type SiderButtonProps = {
  icon?: ReactNode;
  text?: string;
  path?: string;
  id?: string;
  isActive?: boolean;
  nested?: boolean;
  key: string | number;
  disabled?: boolean;
  user?: ReactText;
  count?: number;
  isSubMenu?: boolean;
} & RouteComponentProps;

const SiderButtonFn: FC<SiderButtonProps> = ({
  location,
  history,
  icon,
  text,
  path,
  id,
  isActive,
  nested,
  disabled,
  count,
}) => {

  const { viewModeConfig } = cdfiStore;
  const { sidebarCollapsed } = uiStore;

  const handleClick = useCallback(() => {
    if (id === DownloadTitles.FACT_SHEET) {
      downloadStaticDocumentParameter(
        'factSheet',
        viewModeConfig.cdfiId,
        'cdfiSubscriptionsDownload',
      );
      return;
    }

    if (id === DownloadTitles.RATING_CERTIFICATE) {
      downloadStaticDocumentParameter('ratingsCertificate', viewModeConfig.cdfiId, 'ratingCertificate');
      return;
    }

    if (path === '/dashboard') {
      setCdfiId(null);
      setSubscriberId(null);
    }

    if (!path) return;
    history.push(path);
  }, [history, path, id]);

  return (
    text !== undefined ? <button
      id={id}
      disabled={disabled}
      type="button"
      className={`${nested ? styles.siderNestedButton : styles.siderButton} ${
        isActive ? styles.isActive : ''
      }`}
      onClick={handleClick}
    >
      {icon}
      {text}
    </button> :
      <>
      <Popover
        content={count === undefined && sidebarCollapsed ? 'HOME' :  id}
        id="menuPopover"
        overlayClassName={styles.collapsedPopover}
        overlayInnerStyle={{ background: 'none' }}
        placement="rightTop"
        trigger={disabled ? '' : 'hover'}
        arrowPointAtCenter
        autoAdjustOverflow
        align={{ offset: [0, -25] }}
        getPopupContainer={getPopupContainer}
      >
        <button
          id={id}
          disabled={disabled}
          type="button"
          className={`${nested ? styles.siderNestedButton : styles.siderButton} ${
            isActive ? styles.isActive : ''
          }`}
          onClick={handleClick}
        >
          {icon}
          {text}
        </button>
      </Popover>
    </>
  );
};

export const SiderButton = withRouter(SiderButtonFn);
