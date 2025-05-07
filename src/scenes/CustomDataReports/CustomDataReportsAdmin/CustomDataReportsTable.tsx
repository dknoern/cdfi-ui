import React, { FC, useEffect, useState } from 'react';
import { ContentLimiter } from '../../../components';
import { Table, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { CustomDataReport, CustomDataReportData } from 'types';
import { handleFilterCustomDataReport } from '../../../tools/searchBarTools/handleFilter';
import styles from 'components/ManageTableStyles.module.scss';
import { makeCustomDataReportsColumns } from './makeCustomDataReportsColumns';
import { deleteCustomDataReport, downloadCustomDataReportSubscriber } from '../tools';
import { CustomDataReportEditModal } from './CustomDataReportEditModal';
import { CustomDataReportFormData } from './CustomDataReportCreateForm';
import tableStyles from 'components/ManageTableStyles.module.scss';

interface CustomDataReportsTableProps {
  data: CustomDataReport[];
}

function addIdAsKey(data: CustomDataReport[]): CustomDataReportData[] {
  return data.map((report) => ({ key: report.id, ...report }));
}

export const CustomDataReportsTable: FC<CustomDataReportsTableProps> = (
  props,
) => {
  const data = addIdAsKey(props.data);
  const [filterValue, setFilterValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<CustomDataReport[]>(data);
  const [editingCustomDataReportId, setEditingCustomDataReportId] =
    useState<number>();
  const [deleteCustomDataReportId, setDeleteCustomDataReportId] =
    useState<number>();
  const [downloadCustomDataReportId, setDownloadCustomDataReportId] =
    useState<number>();
  const [showCustomDataReportEditModal, setShowCustomDataReportEditModal] =
    useState<boolean>(false);
  const [editingCustomDataReport, setEditingCustomDataReport] = useState<
    CustomDataReportFormData | undefined
  >();
  const [isSendToClientEnabled, setIsSendToClientEnabled] =
    useState<boolean>(false);

  useEffect(() => {
    setFilteredData(handleFilterCustomDataReport(filterValue, data));
  }, [filterValue, props.data]);

  useEffect(() => {
    if (deleteCustomDataReportId) {
      if (
        window.confirm(
          'Are you sure you want to delete this custom data report?',
        )
      ) {
        const proceedSave = (): ReturnType<typeof deleteCustomDataReport> =>
          deleteCustomDataReport(deleteCustomDataReportId);
        proceedSave().then();
      }
    }
  }, [deleteCustomDataReportId]);

  useEffect(() => {
    if (downloadCustomDataReportId) {
      const proceedDownload = (): ReturnType<typeof downloadCustomDataReportSubscriber> =>
        downloadCustomDataReportSubscriber(downloadCustomDataReportId);
      proceedDownload().then();
    }
  }, [downloadCustomDataReportId]);

  const formId = 'EDIT_CUSTOM_DATA_REPORT';

  return (
    <div>
      <ContentLimiter>
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
        {editingCustomDataReportId && (
          <CustomDataReportEditModal
            visible={showCustomDataReportEditModal}
            onClose={() => setShowCustomDataReportEditModal(false)}
            onFinish={() => setShowCustomDataReportEditModal(false)}
            formId={formId}
            initialValues={editingCustomDataReport}
            customDataReportId={editingCustomDataReportId}
            isSendToClientEnabled={isSendToClientEnabled}
          />
        )}
        <Table
          pagination={{ showSizeChanger: true }}
          dataSource={filteredData}
          columns={makeCustomDataReportsColumns(
            setEditingCustomDataReportId,
            setDeleteCustomDataReportId,
            setShowCustomDataReportEditModal,
            setEditingCustomDataReport,
            setDownloadCustomDataReportId,
            setIsSendToClientEnabled,
          )}
          className={tableStyles.table}
        />
      </ContentLimiter>
    </div>
  );
};
