import React, { FC, useEffect, useState } from 'react';
import { ContentLimiter } from '../../../../components';
import { Table, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { subscriberActivityColumns } from './constants';
import { Activity } from 'types';
import { handleFilter } from '../../../../tools/searchBarTools/handleFilter';
import styles from './SubscriberActivities.module.scss';
import tableStyles from 'components/ManageTableStyles.module.scss';

interface SubscriberActivitiesProps {
  data: Activity[];
}

type ActivityData = Activity & {
  key: React.Key;
};

function addIdAsKey(data: Activity[]): ActivityData[] {
  return data.map((activity) => ({ key: activity.id, ...activity }));
}

export const SubscriberActivities: FC<SubscriberActivitiesProps> = (props) => {
  const data = addIdAsKey(props.data);
  const [filterValue, setFilterValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<ActivityData[]>(data);

  useEffect(() => {
    setFilteredData(handleFilter(filterValue, data));
  }, [filterValue, props.data]);

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
        <Table
          dataSource={filteredData}
          columns={subscriberActivityColumns}
          pagination={{ showSizeChanger: true }}
          size={'small'}
          scroll={{ y: '50vh' }}
          className={tableStyles.table}
        />
      </ContentLimiter>
    </div>
  );
};
