import React, { FC, useCallback, useContext, useEffect } from 'react';
import { Typography } from 'antd';
import { FormProps } from 'antd/es/form';
import { observer } from 'mobx-react';
import { ReportedDataTableConfig } from 'types/reportedDataTableConfig';
import { typography } from 'constants/typography';
import { CustomizeReportedDataTableForm } from 'forms/CustomizeReportedDataTableForm';
import { generateFormId } from 'tools/formTools';
import { FormStep } from '../../types';
import { stepIndexByKey } from '../../tools';
import { formName } from '../../constants';
import { stepContext } from '../../context';
import { formStore } from '../../formStore';
import { CURRENT_STEP, initialValues } from './constants';
import styles from './ReportedDataTableSetup.module.scss';

const { Title, Paragraph } = Typography;
const {
  configureDataReportingTitle,
  configureDataReportingDescription,
} = typography('portfolioCompanyCreation');

const ReportedDataTableSetupFn: FC = () => {
  const { state, dispatch: dispatchStep } = useContext(stepContext);
  const reportedDataTableConfig = formStore.data[
    CURRENT_STEP
  ] as ReportedDataTableConfig;

  const handleValuesChange = useCallback<
    NonNullable<FormProps['onValuesChange']>
  >((changedValues, values) => {
    formStore.setData(FormStep.reportingConfig, values);
  }, []);

  const handleNextClick = useCallback(() => {
    dispatchStep({ type: 'goNext' });
  }, [dispatchStep]);

  useEffect(() => {
    dispatchStep({
      type: 'available',
      step: stepIndexByKey(FormStep.reportingConfig),
    });
  }, [dispatchStep]);

  return (
    <>
      <Title level={2} className={styles.title}>
        {configureDataReportingTitle}
      </Title>
      <Paragraph type="secondary" className={styles.description}>
        {configureDataReportingDescription}
      </Paragraph>
      <CustomizeReportedDataTableForm
        formId={generateFormId(formName, state.step)}
        initialValues={reportedDataTableConfig ?? initialValues}
        onFinish={handleNextClick}
        onValuesChange={handleValuesChange}
      />
    </>
  );
};

export const ReportedDataTableSetup = observer(ReportedDataTableSetupFn);
