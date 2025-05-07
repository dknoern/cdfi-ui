import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Select, Spin, Table } from 'antd';
import { FormSubmitFn } from 'types/form';
import {
  GRID_GUTTER,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_THREE_QUARTERS_ROW_SPAN,
} from 'constants/ui';
import { recentActivitiesStore } from 'store';
import { Store } from 'antd/lib/form/interface';
import {
  getAlertSummaryCounts,
  mapAssignmentStatus,
  companyStatusActivityLogColumns,
} from 'scenes/Dashboard/scenes/AdminDashboard/scenes/GlobalDashboard/components/ActivitiesGlobal/constants';
import {
  CompanyDataVarianceStatus,
  AssignmentStatus,
} from 'types/dataVarianceStatus';
import styles from './CompanyAssignmentStatusEditForm.module.scss';

type CompanyAssignmentStatusEditFormProps = {
  formId: string;
  formData: CompanyDataVarianceStatus | undefined;
  onSubmit: FormSubmitFn;
};

export const CompanyAssignmentStatusEditForm = ({
  formId,
  formData,
  onSubmit,
}: CompanyAssignmentStatusEditFormProps): JSX.Element => {
  const [form] = Form.useForm();
  const companyAssignmentStatus = formData?.companyAssignmentStatus;
  const { assigned, assignmentStatus } = companyAssignmentStatus || {};
  const [formState, setFormState] = useState<Store>(
    companyAssignmentStatus as Store,
  );
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingActivityLog, setLoadingActivityLog] = useState(false);

  const { flaggedVariances, variances, requiredMetrics } =
    getAlertSummaryCounts(formData as CompanyDataVarianceStatus);

  const assignedUserIds = assigned?.map((user) => user.id) || [];

  const initialValues = {
    assigned: assignedUserIds,
    assignmentStatus,
  };

  const assignmentStatusOptions: { value: AssignmentStatus; label: string }[] =
    Object.values(AssignmentStatus).map((status) => ({
      value: status,
      label: mapAssignmentStatus(status),
    }));

  const {
    adminContractorUsers,
    getAdminContractorUsers,
    companyStatusActivityLog,
    getCompanyStatusActivityLog,
  } = recentActivitiesStore;

  useEffect(() => {
    if (!adminContractorUsers) {
      getAdminContractorUsers().then(() => setLoadingUsers(false));
    } else {
      setLoadingUsers(false);
    }
  }, [getAdminContractorUsers, adminContractorUsers]);

  useEffect(() => {
    if (companyAssignmentStatus) {
      setLoadingActivityLog(true);
      getCompanyStatusActivityLog(
        companyAssignmentStatus?.companyId as number,
        companyAssignmentStatus?.fiscalYear as number,
        companyAssignmentStatus?.fiscalQuarter as number,
      ).then(() => setLoadingActivityLog(false));
    }
  }, [getCompanyStatusActivityLog, companyAssignmentStatus]);

  return (
    <>
      <Row className={styles.infoRow}>
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>Company:</Col>{' '}
        <Col
          span={GRID_COL_THREE_QUARTERS_ROW_SPAN}
          className={styles.companyName}
        >
          {companyAssignmentStatus?.companyName}
        </Col>
      </Row>
      <Row className={styles.infoRow}>
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>Active Alerts:</Col>
        <Col span={GRID_COL_THREE_QUARTERS_ROW_SPAN}>
          {!flaggedVariances ? (
            'All Flags resolved'
          ) : (
            <>
              {requiredMetrics && (
                <span
                  className={styles.flagged}
                >{`${requiredMetrics} Required Metric${
                  requiredMetrics > 1 ? 's' : ''
                } not found.`}</span>
              )}
              {variances && (
                <span className={styles.flagged}>{` ${variances} Metric${
                  variances > 1 ? 's' : ''
                } exceed${variances > 1 ? '' : 's'} variance maximum.`}</span>
              )}
            </>
          )}
        </Col>
      </Row>
      <Form
        id={formId}
        form={form}
        onValuesChange={(changedValues, allValues): void => {
          setFormState((prevState) => ({
            ...allValues,
          }));
        }}
        onFinish={onSubmit(form)}
        initialValues={initialValues}
      >
        <Row gutter={[GRID_GUTTER, 12]}>
          <Col span={GRID_COL_FULL_ROW_SPAN}>
            <Form.Item
              name="assigned"
              label="Assign User(s)"
              className={styles.inputLabel}
            >
              {loadingUsers ? (
                <div className={styles.spinnerContainer}>
                  <Spin />
                </div>
              ) : (
                <Select
                  loading={loadingUsers}
                  mode="multiple"
                  options={adminContractorUsers?.map((user) => {
                    return {
                      value: user.id,
                      label: `${user.firstName} ${user.lastName}`,
                    };
                  })}
                  filterOption={(input, option): boolean =>
                    ((option?.label ?? '') as string)
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 12]}>
          <Col span={GRID_COL_FULL_ROW_SPAN}>
            <Form.Item
              name="assignmentStatus"
              label="Status"
              className={styles.inputLabel}
            >
              <Select aria-label="Status" options={assignmentStatusOptions} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row className={styles.infoRow}>
        <h2>Activity Log</h2>
        <Table
          className={styles.table}
          loading={loadingActivityLog}
          dataSource={companyStatusActivityLog}
          columns={companyStatusActivityLogColumns}
          pagination={false}
        />
      </Row>
      <div aria-live="polite" className="screenreader-only">
        {loadingUsers || loadingActivityLog ? 'Loading...' : 'Loading complete'}
      </div>
    </>
  );
};
