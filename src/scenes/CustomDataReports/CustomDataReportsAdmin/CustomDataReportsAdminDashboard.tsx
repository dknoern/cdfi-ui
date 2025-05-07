import { PageSectionWrapper } from 'components';
import React, { FC, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CustomDataReportsView } from './CustomDataReportsView';
import {
  createReportRequestButton,
  launchTableauButton,
} from './actionButtons';
import { CustomDataReportEditModal } from './CustomDataReportEditModal';
import { LogoHeader } from './components/LogoHeader';
import { useCdfiLogo } from 'tools/useCdfiLogo';
import { cdfiStore } from 'store';
import { useCdfis } from 'dataManagement';

export const CustomDataReportsAdminDashboardFn: FC = () => {
  const [showCustomDataReportCreateModal, setShowCustomDataReportCreateModal] =
    useState<boolean>(false);

  const startAdd = useCallback(() => {
    setShowCustomDataReportCreateModal(true);
  }, []);

  const launchTableau = useCallback(() => {
    window.open('https://online.tableau.com', '_blank');
  }, []);

  const formId = 'CREATE_CUSTOM_DATA_REPORT';
  const { cdfiId } = cdfiStore;
  const { data: cdfis } = useCdfis();
  const cdfiName = cdfis?.find((item) =>
  item.id == cdfiId ? item.name : '',
)?.name;

  const logo = useCdfiLogo(cdfiId);

  return (
    <PageSectionWrapper
      title="Custom Data Reports"
      topTitle={<LogoHeader imgPath={logo} subTitle={cdfiName} />}
      actionButtons={[
        launchTableauButton(launchTableau),
        createReportRequestButton(startAdd),
      ]}
    >
      <CustomDataReportsView />
      <CustomDataReportEditModal
        visible={showCustomDataReportCreateModal}
        onClose={() => setShowCustomDataReportCreateModal(false)}
        onFinish={() => setShowCustomDataReportCreateModal(false)}
        formId={formId}
        initialValues={undefined}
        customDataReportId={0}
      ></CustomDataReportEditModal>
    </PageSectionWrapper>
  );
};

export const CustomDataReportsAdminDashboard = withRouter(
  CustomDataReportsAdminDashboardFn,
);
