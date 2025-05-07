import React, { FC, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import {
  useActionItems,
  useCdfiOrgDetails,
  useRecentActivities,
} from 'dataManagement';
import { cdfiStore, userStore } from 'store';
import { PageSectionWrapper } from 'components/PageSectionWrapper';
import { Table, Row, Col } from 'antd';
import { GRID_GUTTER } from 'constants/ui';
import { dataMan } from 'dataManagement/managers';
import {
  cdfiDefaultDashboardColumns,
  cdfiDefaultDashboardActivityColumns,
} from './columns';
import {
  Activity,
  ActionItem,
  FileUploadFinishHandler,
  UserRole,
} from '../../../../types';
import { AerisChartsSection } from '../../components';
import { RatingsHeader } from '../../../../components/RatingsHeader';
import { QuarterlyUploadModal } from './QuarterlyUploadModal';
import { UploadFlowStateAction } from '../../../../components/withProcessModal/types';
import { useCdfiLogo } from 'tools/useCdfiLogo';
import { LogoHeader } from '../CdfiDashboard/LogoHeader';

export const CdfiDashboardFn: FC = () => {
  const cdfiId = userStore.companyId;
  const history = useHistory();
  const { setCdfiId } = cdfiStore;
  setCdfiId(cdfiId);
  const { data: actionItems } = useActionItems(cdfiId);
  const { data: cdfiData } = useCdfiOrgDetails(cdfiId);
  const { data: recentActivities } = useRecentActivities(cdfiId);

  type ActionItemData = ActionItem & {
    key: React.Key;
  };
  function addIndexAsKey(data: ActionItem[]): ActionItemData[] {
    return data.map((actionItem: ActionItem, index: number) => ({
      key: index,
      ...actionItem,
    }));
  }

  type ActivityData = Activity & {
    key: React.Key;
  };
  function addIndexAsKeyForActivities(data: Activity[]): ActivityData[] {
    return data.map((actionItem: Activity, index: number) => ({
      key: index,
      ...actionItem,
    }));
  }

  const [uploadFlowState, setUploadFlowState] =
    useState<UploadFlowStateAction>();
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [documentTypeId, setDocumentTypeId] = useState<any>();
  const [year, setYear] = useState<any>();
  const [quarter, setQuarter] = useState<any>();
  const aerisLibraryMgr = dataMan.managers.aerisLibraryDocs;
  const actionItemsMgr = dataMan.managers.actionItems;
  const aerisAdminID = 3; // Save/Get this from store once we are able to support all user types
  const userId = UserRole.AERIS_ADMIN && !cdfiId ? aerisAdminID : cdfiId;

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
    aerisLibraryMgr.reload(userId);
    actionItemsMgr.reload(userId);
  };

  const logo = useCdfiLogo(cdfiId);

  return (
    <>
      <PageSectionWrapper
        topTitle={<LogoHeader imgPath={logo} subTitle={cdfiData?.cdfi?.name} />}
        ratings
        title=""
      >
        <PageSectionWrapper title="Currently Due">
          <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
            <Col span={16}>
              {actionItems?.actionItems.length > 0 ? (
                <>
                  <Table
                    dataSource={addIndexAsKey(actionItems.actionItems)}
                    columns={cdfiDefaultDashboardColumns(
                      history,
                      setShowUploadModal,
                      setDocumentTypeId,
                      setYear,
                      setQuarter,
                    )}
                    pagination={{ showSizeChanger: true }}
                    size="small"
                    scroll={{ x: 'max-content' }}
                    showSorterTooltip
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
              <br />
              {recentActivities?.cdfiRecentActivity.length > 0 ? (
                <PageSectionWrapper title="Activity">
                  <Table
                    dataSource={addIndexAsKeyForActivities(
                      recentActivities.cdfiRecentActivity,
                    )}
                    columns={cdfiDefaultDashboardActivityColumns}
                    pagination={{ showSizeChanger: true }}
                    size="small"
                    scroll={{ x: 'max-content' }}
                    showSorterTooltip
                  />
                </PageSectionWrapper>
              ) : null}
            </Col>
            <Col span={8}>
              <AerisChartsSection />
            </Col>
          </Row>
        </PageSectionWrapper>
      </PageSectionWrapper>
    </>
  );
};

export const CdfiDashboard = withRouter(CdfiDashboardFn);
