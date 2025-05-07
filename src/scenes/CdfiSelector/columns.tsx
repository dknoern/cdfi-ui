import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Tooltip } from 'antd';
import {
  DownloadOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import styles from './columns.module.scss';
import { downloadStaticDocumentParameter } from 'dataManagement/operations/documentOperations';
import {SubscriptionProductStatusVM} from "../../types";

const onClickDownloadFactSheet = async (cdfiId: number): Promise<void> => {
  await downloadStaticDocumentParameter(
    'factSheet',
    cdfiId,
    'cdfiSubscriptionsDownload',
  );
};

export const cdfiSelectorListColumns = (
  subscriberUser: boolean | undefined,
  analystUser: boolean | undefined,
  subscriptionTypeAll: boolean | undefined,
  isOnlyFactSheetSubscription: boolean | undefined,
  isAnonymous: boolean | undefined,
  showRatings: boolean | undefined,
  showModal: (cdfiId: number) => void,
  cdfiIds: number[] = [],
): Record<string, any>[] => {
  const renderActions = (cdfiId: number, record: any): ReactNode => {
    const showOrganizationDetailsButton = !analystUser;
    const showDownloadButton =
      record.active &&
      record.peerGroupAllowed &&
      ((subscriptionTypeAll && subscriberUser) || !subscriberUser);
    const showAddButton =
      subscriptionTypeAll &&
      subscriberUser &&
      !cdfiIds.includes(record.id) &&
      !isOnlyFactSheetSubscription;

    const hasVisibleActions =
      showOrganizationDetailsButton || showDownloadButton || showAddButton;

    if (!hasVisibleActions) {
      return null; // don't render anything
    }

    const menu = (
      <Menu>
        {showOrganizationDetailsButton && (
          <Menu.Item key="view">
            <Tooltip title="View Organization Details">
              <Link
                className={styles.lightBlue}
                aria-label="link to view organization details"
                target="_blank"
                to={`/manage/cdfi/${record?.id}/org-details`}
              >
                <EyeOutlined /> View Organization Details
              </Link>
            </Tooltip>
          </Menu.Item>
        )}
        {showDownloadButton && (
          <Menu.Item key="download">
            <Tooltip title="Download Fact Sheet">
              <a onClick={() => onClickDownloadFactSheet(cdfiId)}>
                <DownloadOutlined /> Download Fact Sheet
              </a>
            </Tooltip>
          </Menu.Item>
        )}
        {showAddButton && (
          <Menu.Item key="add">
            <Tooltip title="Add to my Account">
              <a onClick={() => showModal(cdfiId)}>
                <PlusCircleOutlined /> Add to my Account
              </a>
            </Tooltip>
          </Menu.Item>
        )}
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={styles.ellipsis}>•••</div>
      </Dropdown>
    );
  };

  return [
    ...createPeerGroupCdfiListColumns(
      isAnonymous,
      isOnlyFactSheetSubscription,
      showRatings,
      analystUser,
    ),
    {
      title: 'Actions',
      render: (_: any, record: any) => renderActions(record.id, record),
    },
  ];
};

export const createPeerGroupCdfiListColumns = (
  isAnonymous: boolean | undefined,
  isOnlyFactSheetSubscription: boolean | undefined,
  showRatings: boolean | undefined,
  analystUser: boolean | undefined,
): Record<string, any>[] => {
  const columns = [
    {
      title: 'Organization',
      dataIndex: 'name',
      render: (_: string, record: any): ReactNode => {
        const orgName = record?.name;

        if (analystUser) {
          return <span>{orgName}</span>; // Plain text for analysts
        }

        return (
          <Tooltip title="View organization details page.">
            <Link
              className={styles.lightBlue}
              aria-label="link to view organization details"
              target="_blank"
              to={`/manage/cdfi/${record?.id}/org-details`}
            >
              {orgName}
            </Link>
          </Tooltip>
        );
      },
    },
    ...(showRatings && !isAnonymous && !isOnlyFactSheetSubscription
      ? [{ title: 'Rating', dataIndex: 'rating' }]
      : []),
    {
      title: 'Impact Area',
      dataIndex: 'sectoralFocus',
      render: (_: string, record: any): ReactNode => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {record?.sectoralFocus.map((area: any) => (
            <span key={area?.name}>{area?.name}</span>
          ))}
        </div>
      ),
    },
  ];
  return columns;
};
