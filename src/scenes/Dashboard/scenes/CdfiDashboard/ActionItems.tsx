import React, { FC, useState } from 'react';
import { PageSectionWrapper, ContentLimiter } from '../../../../components';
import { Table } from 'antd';
import { actionItemsColumns } from './constants';
import { ActionItem } from 'types';
import tableStyles from 'components/ManageTableStyles.module.scss';

interface ActionItemsProps {
  data: ActionItem[];
}

type ActionItemData = ActionItem & {
  key: React.Key;
};

function addIndexAsKey(data: ActionItem[]): ActionItemData[] {
  return data.map((actionItem, index) => ({ key: index, ...actionItem }));
}

export const ActionItems: FC<ActionItemsProps> = (props) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const data = addIndexAsKey(props.data);

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: ActionItemData[],
    ) => {
      const ids = selectedRows.map((activity) => activity.id);
      setSelectedIds(ids);
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
  };

  return (
    <div>
      <ContentLimiter>
        <PageSectionWrapper title={'Currently Due'}>
          <Table
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            dataSource={data}
            columns={actionItemsColumns}
            pagination={{ showSizeChanger: true }}
            size={'small'}
            scroll={{ x: 'max-content' }}
            showSorterTooltip
            className={tableStyles.table}
          />
        </PageSectionWrapper>
      </ContentLimiter>
    </div>
  );
};
