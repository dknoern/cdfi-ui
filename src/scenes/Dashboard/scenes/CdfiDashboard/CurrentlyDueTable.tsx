import React, { FC, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';

import { PageSectionWrapper } from 'components/PageSectionWrapper';
import { Table, Row, Col } from 'antd';
import { GRID_GUTTER } from 'constants/ui';
import { dataMan } from 'dataManagement/managers';
import { cdfiDefaultDashboardColumns } from '../AdminDashboard/columns';
import { ActionItem, FileUploadFinishHandler } from '../../../../types';

import { QuarterlyUploadModal } from '../AdminDashboard/QuarterlyUploadModal';
import { UploadFlowStateAction } from '../../../../components/withProcessModal/types';

type CurrentlyDueTableProps = {
  data: ActionItem[];
  cdfiId: number;
};

export const CurrentlyDueTable = ({ data, cdfiId }: CurrentlyDueTableProps) => {
  const history = useHistory();

  const [uploadFlowState, setUploadFlowState] =
    useState<UploadFlowStateAction>();
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [documentTypeId, setDocumentTypeId] = useState<any>();
  const [year, setYear] = useState<any>();
  const [quarter, setQuarter] = useState<any>();
  const aerisLibraryMgr = dataMan.managers.aerisLibraryDocs;
  const actionItemsMgr = dataMan.managers.actionItems;

  const onUploadToLibraryFinish: FileUploadFinishHandler = (
    type,
    documentId,
  ) => {
    setUploadFlowState('hideModal');
    setUploadFlowState({
      uploadFinished: true,
      modalType: type,
      errorDocumentId: documentId,
    });
    setShowUploadModal(false);
    aerisLibraryMgr.reload(cdfiId);
    actionItemsMgr.reload(cdfiId);
  };

  return (
    <>
      <PageSectionWrapper title="Currently Due">
        <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
          {data?.length > 0 ? (
            <>
              <Table
                dataSource={data}
                columns={cdfiDefaultDashboardColumns(
                  history,
                  setShowUploadModal,
                  setDocumentTypeId,
                  setYear,
                  setQuarter,
                )}
                pagination={{ showSizeChanger: true }}
                size='small'
                showSorterTooltip
                style={{ width: '100%' }}
              />
              <QuarterlyUploadModal
                visible={showUploadModal}
                onCancel={(): void => {
                  setUploadFlowState('hideModal');
                  setShowUploadModal(false);
                }}
                documentTypeId={documentTypeId}
                onUploadFinish={onUploadToLibraryFinish}
                defaultYear={year}
                defaultQuarter={quarter}
              />
            </>
          ) : (
            'loading...'
          )}
        </Row>
      </PageSectionWrapper>
    </>
  );
};

//export const CurrentlyDueTable = withRouter(CurrentlyDueTableFn)
