import React, { FC, useCallback, useEffect, useState } from 'react';
import { ContentLimiter } from '../../../../../../../../components';
import { Table, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { recentActivityColumns } from './constants';
import { Delete } from '../../../../../../../../components/EditButtonsLine/components';
import { Activity } from 'types';
import { handleFilter } from '../../../../../../../../tools/searchBarTools/handleFilter';
import styles from './RecentActivities.module.scss';
import tableStyles from 'components/ManageTableStyles.module.scss';
import { userStore } from 'store';

interface RecentActivitiesProps {
  data: Activity[];
  onDelete: (activityIds: Activity['id'][]) => Promise<void>;
}

type ActivityData = Activity & {
  key: React.Key;
};

function addIdAsKey(data: Activity[]): ActivityData[] {
  return data.map((activity) => ({ key: activity.id, ...activity }));
}

export const RecentActivities: FC<RecentActivitiesProps> = (props) => {
  const data = addIdAsKey(props.data);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filterValue, setFilterValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<ActivityData[]>(data);

  useEffect(() => {
    setFilteredData(handleFilter(filterValue, data));
  }, [filterValue, props.data]);

  const onDelete = useCallback(() => {
    props.onDelete(selectedIds);
    setSelectedIds([]);
    setSelectedRowKeys([]);
  }, [selectedIds]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ActivityData[]) => {
      const ids = selectedRows.map((activity) => activity.id);
      setSelectedIds(ids);
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
  };

  return (
    <div>
      <ContentLimiter>
        <Space className={styles.tableSearchBar}>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.persist();
              setFilterValue(e.target.value.toLowerCase());
            }}
            placeholder={`Search Recent Activities...`}
            allowClear
            suffix={<SearchOutlined />}
          />
        </Space>
        {userStore.isAerisAdmin && (
          <Delete
            disabled={!selectedIds.length}
            onClick={onDelete}
            text={'Delete selection'}
            style={styles.button}
          />
        )}
        <Table
          rowSelection={{ type: 'checkbox', ...rowSelection }}
          dataSource={filteredData}
          columns={recentActivityColumns}
          pagination={{ showSizeChanger: true }}
          size={'small'}
          scroll={{ y: '50vh' }}
          className={tableStyles.table}
        />
      </ContentLimiter>
    </div>
  );
};
