import React, { ReactNode, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Dropdown, Menu, Popconfirm, Space, Tooltip } from 'antd';
import {
  CaretRightOutlined,
  CheckCircleOutlined,
  CopyOutlined,
  DeleteFilled,
  EditFilled,
  MinusCircleOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  PeerPortfolioPermissions,
  PeerPortfolioSegment,
  ComparisonPermissions,
  GroupType,
} from 'types/peerGroups';
import { aerisExplorerPeerGroupStore, userStore } from 'store';
import { notifyUser } from '../../tools';
import styles from './columns.module.scss';
import { CreateComparisonView } from './components/CreateComparisonView/CreateComparisonView';

const ellipsis = (
  str: string | undefined,
  num: number = str?.length ?? 0,
  ellipsisStr = '...',
) => {
  if (str === undefined) {
    return undefined;
  }

  return str.length >= num
    ? str.slice(0, num >= ellipsisStr.length ? num - ellipsisStr.length : num) +
        ellipsisStr
    : str;
};

function CloneAction(
  record: PeerPortfolioSegment,
  subscriberId: number | undefined,
  cdfiId: number | undefined,
): ReactNode {
  const history = useHistory();
  return (
    <Tooltip title="Clone">
      <Button
        type="link"
        icon={<CopyOutlined />}
        aria-label="Clone"
        onClick={(): void => {
          const clone = { ...record };
          clone.id = undefined;
          clone.originalId = record.originalId || record.id;
          clone.copiedFrom = clone.id;
          clone.companyId = subscriberId;
          clone.cdfiId = cdfiId;
          aerisExplorerPeerGroupStore
            .createPeerGroup(clone)
            .then((pg: PeerPortfolioSegment) => {
              const url = `/create-peer-or-portfolio/${pg.groupType}/${pg.id}`;
              history.push(url);
            })
            .catch(() => {
              notifyUser.error('aerisExplorer', 'cloneError');
            });
        }}
      />
    </Tooltip>
  );
}

export const getAerisExplorerColumns = function (
  subscriberId: number | undefined,
  cdfiId: number | undefined,
  refresh: () => void,
  peerGroupType: GroupType,
): Record<string, any>[] {
  function renderPeers(_: string, result: PeerPortfolioPermissions): ReactNode {
    const record = result.data;
    const items = record.peerCompanies
      ? record.peerCompanies.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''))
          .map((peer) => ({
            key: peer.id,
            label: peer.name,
          }))
      : [];

    const menu = (
      <Menu>
        {items.map((item) => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
      </Menu>
    );
    const buttonClassName = result.data.archived
      ? styles.lightGrey
      : styles.lightBlue;
    return (
      <Space size="middle">
        <Dropdown
          overlay={menu}
          trigger={['click']}
          overlayStyle={{ maxHeight: 400, overflow: 'auto' }}
        >
          <Button type="link" className={buttonClassName}>
            <CaretRightOutlined /> Click to Show
          </Button>
        </Dropdown>
      </Space>
    );
  }

  function renderDate(_: string, result: PeerPortfolioPermissions): ReactNode {
    if (result?.data?.updatedDate !== undefined) {
      const date = new Date(result.data.updatedDate);
      return date.toLocaleString();
    }
    return '';
  }

  function renderActions(
    _: string,
    result: PeerPortfolioPermissions,
  ): ReactNode {
    const record = result.data;
    const deleteConfirmMessage = `Permanently Delete: ${record.name}`;
    const archiveConfirmMessage = `Archive: ${record.name}`;
    const restoreConfirmMessage = `Restore: ${record.name}`;
    return (
      <span>
        {(userStore.isAerisAdmin || cdfiId === undefined) &&
          CloneAction(record, subscriberId, cdfiId)}
        {result.updatable && result.data.groupType === GroupType.PEER_GROUP && (
          <Tooltip title="Edit">
            <Link
              to={`/create-peer-or-portfolio/${record.groupType}/${record.id}`}
            >
              <Button type="link" icon={<EditFilled />} aria-label="Edit" />
            </Link>
          </Tooltip>
        )}
        {result.archivable && (
          <Popconfirm
            title={archiveConfirmMessage}
            icon={
              <QuestionCircleOutlined
                style={{
                  color: 'red',
                }}
              />
            }
            onConfirm={(): void => {
              record.archived = true;
              aerisExplorerPeerGroupStore
                .updatePeerGroup(record)
                .then(() => {
                  notifyUser.ok('aerisExplorer', 'archiveOk');
                  refresh();
                })
                .catch(() => {
                  notifyUser.error('aerisExplorer', 'archiveError');
                });
            }}
          >
            <Tooltip title="Archive">
              <Button type="link" icon={<MinusCircleOutlined />} />
            </Tooltip>
          </Popconfirm>
        )}
        {result.restorable && (
          <Popconfirm
            title={restoreConfirmMessage}
            icon={
              <QuestionCircleOutlined
                style={{
                  color: 'red',
                }}
              />
            }
            onConfirm={(): void => {
              record.archived = false;
              aerisExplorerPeerGroupStore
                .updatePeerGroup(record)
                .then(() => {
                  notifyUser.ok('aerisExplorer', 'restoreOk');
                  refresh();
                })
                .catch(() => {
                  notifyUser.error('aerisExplorer', 'restoreError');
                });
            }}
          >
            <Tooltip title="Restore">
              <Button type="link" icon={<PlusCircleOutlined />} />
            </Tooltip>
          </Popconfirm>
        )}
        {result.deletable && (
          <Popconfirm
            title={deleteConfirmMessage}
            icon={
              <QuestionCircleOutlined
                style={{
                  color: 'red',
                }}
              />
            }
            onConfirm={(): void => {
              aerisExplorerPeerGroupStore
                .deletePeerGroup(record)
                .then(() => {
                  notifyUser.ok('aerisExplorer', 'deleteOk');
                  refresh();
                })
                .catch(() => {
                  notifyUser.error('aerisExplorer', 'deleteError');
                });
            }}
          >
            <Tooltip title="Delete">
              <Button type="link" danger icon={<DeleteFilled />} />
            </Tooltip>
          </Popconfirm>
        )}
      </span>
    );
  }

  const renderReportsLink = (_: string, result: PeerPortfolioPermissions) => {
    return result.data.archived ? (
      <Tooltip
        className={styles.archivedNameAligned}
        title={ellipsis(result?.data?.description, 30)}
        placement="rightTop"
      >
        {result.data.name}
      </Tooltip>
    ) : (
      <Link className={styles.lightBlue} to={`/reports-page/${result.data.id}`}>
        <Button
          type="text"
          className={styles.lightBlue}
          icon={
            result?.data?.cdfiId === undefined &&
            result?.data?.companyId === undefined && (
              <CheckCircleOutlined
                style={{ verticalAlign: 0 }}
                className={styles.checkmark_green}
              />
            )
          }
        >
          <Tooltip
            title={ellipsis(result?.data?.description, 30)}
            placement="rightTop"
          >
            {result.data.name}
          </Tooltip>
        </Button>
      </Link>
    );
  };

  const renderName = (_: string, result: PeerPortfolioPermissions) => {
    const firstName = result?.data?.owner?.firstName || '';
    const lastName = result?.data?.owner?.lastName || '';
    return `${firstName} ${lastName}`;
  };

  let nameColumnTitle: string;
  if (peerGroupType === GroupType.PEER_GROUP) {
    nameColumnTitle = 'Peer Group Name';
  } else if (peerGroupType === GroupType.PORTFOLIO_SEGMENT) {
    nameColumnTitle = 'Portfolio Segment Name';
  } else {
    nameColumnTitle = 'Name';
  }

  return [
    {
      title: nameColumnTitle,
      dataIndex: ['data', 'name'],
      render: renderReportsLink,
      ellipsis: true,
      width: '40%',
    },
    {
      title: 'Peers',
      render: renderPeers,
    },
    {
      title: 'Owner',
      dataIndex: ['data', 'createdBy'],
      render: renderName,
    },
    {
      title: 'Last Modified',
      render: renderDate,
    },
    {
      title: '',
      render: renderActions,
    },
  ];
};

export const createPeerGroupCdfiListColumns = [
  {
    title: 'Organization',
    dataIndex: 'name',
    render: (_: string, record: any): ReactNode => (
      <Tooltip title="View organization details page.">
        <Link
          className={styles.lightBlue}
          aria-label="link to view organization details"
          target="_blank"
          to={`/manage/cdfi/${record?.id}/org-details`}
        >
          {record?.name}
        </Link>
      </Tooltip>
    ),
  },
  { title: 'Rating', dataIndex: 'rating' },
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

type ComparisonCellProps = {
  record: ComparisonPermissions;
};

type ComparisonEditCellProps = ComparisonCellProps & {
  subscriberId: number | undefined;
  cdfiId: number | undefined;
};

const ComparisonEditCell = ({
  record,
  subscriberId,
  cdfiId,
}: ComparisonEditCellProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      {record?.updatable && (
        <>
          <Button
            type="link"
            aria-label="Open edit modal."
            icon={<EditFilled />}
            onClick={() => setIsVisible(true)}
          />

          <CreateComparisonView
            isVisible={isVisible}
            onCancel={() => setIsVisible(false)}
            subscriberId={subscriberId}
            cdfiId={cdfiId}
            comparisonData={record.data}
          />
        </>
      )}
    </>
  );
};

const ComparisonDeleteCell = ({ record }: ComparisonCellProps): JSX.Element => (
  <>
    {record.deletable && (
      <Popconfirm
        title={`Permanently Delete: ${record.data.name}`}
        icon={
          <QuestionCircleOutlined
            style={{
              color: 'red',
            }}
          />
        }
        onConfirm={(): void => {
          aerisExplorerPeerGroupStore
            .deleteComparison(record.data.id as number)
            .then(() => {
              notifyUser.ok('aerisExplorer', 'deleteOk');
              aerisExplorerPeerGroupStore.getComparisons(
                record.data?.company?.id,
              );
            })
            .catch(() => {
              notifyUser.error('aerisExplorer', 'deleteError');
            });
        }}
      >
        <Tooltip title="Delete">
          <Button type="link" danger icon={<DeleteFilled />} />
        </Tooltip>
      </Popconfirm>
    )}
  </>
);

const ComparisonArchiveCell = ({
  record,
}: ComparisonCellProps): JSX.Element => (
  <>
    {record.archivable && (
      <Popconfirm
        title={`Archive: ${record.data.name}`}
        icon={
          <QuestionCircleOutlined
            style={{
              color: 'red',
            }}
          />
        }
        onConfirm={(): void => {
          record.data.archived = true;
          aerisExplorerPeerGroupStore
            .updateComparison(record.data)
            .then(() => {
              notifyUser.ok('aerisExplorer', 'archiveOk');
              aerisExplorerPeerGroupStore.getComparisons(
                record.data?.company?.id,
              );
            })
            .catch(() => {
              notifyUser.error('aerisExplorer', 'archiveError');
            });
        }}
      >
        <Tooltip title="Archive">
          <Button type="link" icon={<MinusCircleOutlined />} />
        </Tooltip>
      </Popconfirm>
    )}
  </>
);

const ComparisonRestoreCell = ({
  record,
}: ComparisonCellProps): JSX.Element => (
  <>
    {record.restorable && (
      <Popconfirm
        title={`Restore: ${record.data.name}`}
        icon={
          <QuestionCircleOutlined
            style={{
              color: 'red',
            }}
          />
        }
        onConfirm={(): void => {
          record.data.archived = false;
          aerisExplorerPeerGroupStore
            .updateComparison(record.data)
            .then(() => {
              notifyUser.ok('aerisExplorer', 'restoreOk');
              aerisExplorerPeerGroupStore.getComparisons(
                record.data?.company?.id,
              );
            })
            .catch(() => {
              notifyUser.error('aerisExplorer', 'restoreError');
            });
        }}
      >
        <Tooltip title="Restore">
          <Button type="link" icon={<PlusCircleOutlined />} />
        </Tooltip>
      </Popconfirm>
    )}
  </>
);

export const getComparisonsTableColumns = (
  subscriberId: number | undefined,
  cdfiId: number | undefined,
) => {
  return [
    {
      title: 'Name',
      dataIndex: ['data', 'name'],
      render: (_: string, record: ComparisonPermissions): ReactNode => {
        return record.data.archived ? (
          <Tooltip
            className={styles.archivedNameAligned}
            title={ellipsis(record?.data?.description, 30)}
            placement="rightTop"
          >
            {record.data.name}
          </Tooltip>
        ) : (
          <Link
            to={`/comparison-view-page/${record.data.id}/${
              subscriberId ? 'subscriber' : 'cdfi'
            }`}
          >
            <Button type="text" className={styles.lightBlue}>
              <Tooltip
                title={ellipsis(record?.data?.description, 30)}
                placement="rightTop"
              >
                {record.data.name}
              </Tooltip>
            </Button>
          </Link>
        );
      },
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      render: (_: string, record: ComparisonPermissions): ReactNode => {
        const firstName = record.data.createdBy?.firstName;
        const lastName = record.data.createdBy?.lastName;

        return `${firstName || ''} ${lastName || ''}`;
      },
    },
    {
      title: 'Last Modified',
      dataIndex: ['data', 'updatedAt'],
      render: (_: string, record: ComparisonPermissions): ReactNode => {
        return record.data.updatedAt
          ? new Date(record.data.updatedAt).toLocaleString()
          : '';
      },
    },
    {
      title: '',
      render: (_: string, record: ComparisonPermissions): ReactNode => (
        <>
          <ComparisonArchiveCell record={record} />
          <ComparisonRestoreCell record={record} />
          <ComparisonDeleteCell record={record} />
        </>
      ),
    },
  ];
};
