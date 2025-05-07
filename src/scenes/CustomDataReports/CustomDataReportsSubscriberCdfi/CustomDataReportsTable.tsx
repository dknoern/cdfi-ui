import React, { FC, useEffect, useState } from 'react';
import { ContentLimiter } from '../../../components';
import { Table, Input, Space, Typography, Button } from 'antd';
import {
  DownloadOutlined,
  DownOutlined,
  SearchOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { CustomDataReport, CustomDataReportData } from 'types';
import { handleFilterCustomDataReport } from '../../../tools/searchBarTools/handleFilter';
import styles from 'components/ManageTableStyles.module.scss';
import { makeCustomDataReportsColumns } from './makeCustomDataReportsColumns';
import {
  downloadCustomDataReportSubscriber,
  downloadCustomDataReportsSubscriber,
} from '../tools';
import tableStyles from 'components/ManageTableStyles.module.scss';

const { Paragraph } = Typography;

interface CustomDataReportsTableProps {
  data: CustomDataReport[];
}

function addIdAsKey(data: CustomDataReport[]): CustomDataReportData[] {
  return data.map((report) => ({ key: report.id, ...report }));
}

function customExpandIcon(props: any) {
  if (props.expanded) {
    return (
      <a
        style={{ color: 'black' }}
        onClick={(e) => {
          props.onExpand(props.record, e);
        }}
      >
        <UpOutlined />
      </a>
    );
  } else {
    return (
      <a
        style={{ color: 'black' }}
        onClick={(e) => {
          props.onExpand(props.record, e);
        }}
      >
        <DownOutlined />
      </a>
    );
  }
}

export const CustomDataReportsTable: FC<CustomDataReportsTableProps> = (
  props,
) => {
  const data = addIdAsKey(props.data);
  const [filterValue, setFilterValue] = useState<string>('');
  const [filteredData, setFilteredData] =
    useState<CustomDataReportData[]>(data);
  const [downloadCustomDataReportId, setDownloadCustomDataReportId] =
    useState<number>();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    setFilteredData(handleFilterCustomDataReport(filterValue, data));
  }, [filterValue, props.data]);

  useEffect(() => {
    if (downloadCustomDataReportId) {
      const proceedDownload = (): ReturnType<
        typeof downloadCustomDataReportSubscriber
      > => downloadCustomDataReportSubscriber(downloadCustomDataReportId);
      proceedDownload().then();
    }
  }, [downloadCustomDataReportId]);

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: CustomDataReportData[],
    ) => {
      const ids = selectedRows.map((report) => report.id);
      setSelectedIds(ids);
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
  };

  const onClickDownload = (): void => {
    const isMultipleDocuments = selectedIds.length > 1;

    const proceedDownload = isMultipleDocuments
      ? (): ReturnType<typeof downloadCustomDataReportsSubscriber> =>
          downloadCustomDataReportsSubscriber(selectedIds)
      : (): ReturnType<typeof downloadCustomDataReportSubscriber> =>
          downloadCustomDataReportSubscriber(selectedIds[0]);

    proceedDownload().then(() => {
      setSelectedIds([]);
      setSelectedRowKeys([]);
    });
  };

  return (
    <div>
      <ContentLimiter>
        <Button
          key="download"
          type="primary"
          disabled={selectedRowKeys.length === 0}
          icon={<DownloadOutlined />}
          onClick={onClickDownload}
        >
          Download Multiple Reports
        </Button>
        <Space className={styles.tableSearchBarCustomDataReports}>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.persist();
              setFilterValue(e.target.value.toLowerCase());
            }}
            placeholder={`Search Reports...`}
            allowClear
            suffix={<SearchOutlined />}
          />
        </Space>

        <Table
          rowSelection={{ type: 'checkbox', ...rowSelection }}
          pagination={{ showSizeChanger: true }}
          dataSource={filteredData}
          columns={makeCustomDataReportsColumns(setDownloadCustomDataReportId)}
          expandable={{
            expandedRowRender: (record) => (
              <>
                <Paragraph style={{ fontStyle: 'italic' }}>
                  Report description:
                </Paragraph>
                <Paragraph>{record.description}</Paragraph>
              </>
            ),
            rowExpandable: (record) => record.description !== undefined,
            expandIcon: (props) => customExpandIcon(props),
            indentSize: 10,
          }}
          className={tableStyles.table}
        />
      </ContentLimiter>
    </div>
  );
};
