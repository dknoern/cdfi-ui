import React, { FC, useCallback, useContext, useEffect } from 'react';
import { EditFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import { FormPrimaryLabelWithAction } from 'components/FormPrimaryLabelWithAction';
import { FormStep } from 'forms/PCCreate/types';
import { stepInfo } from 'forms/PCCreate/constants';
import { stepIndexByKey } from 'forms/PCCreate/tools';
import { stepContext } from 'forms/PCCreate/context';
import GeneralInformation from '../CompanyInfo/Review';
import Metrics from '../AssignMetrics/Review';
import Library from '../CompanyLibrarySetup/Review';
import Notifications from '../NotificationsSetup/Review';
import ReportedDataTableSetup from '../ReportedDataTableSetup/Review';
import { sectionTitles } from './constants';
import styles from './CompanyReview.module.scss';

const { Title } = Typography;

type CompanyReviewProps = {};

export const CompanyReview: FC<CompanyReviewProps> = () => {
  const { dispatch: dispatchStep } = useContext(stepContext);

  useEffect(() => {
    dispatchStep({ type: 'available', step: stepIndexByKey(FormStep.review) });
  }, [dispatchStep]);

  const goToStep = useCallback(
    (stepIndex) => (): void => {
      dispatchStep({ type: 'goToStep', step: stepIndex });
    },
    [dispatchStep],
  );

  const renderSectionTitle = useCallback(
    (stepIndex: number): React.ReactElement => (
      <FormPrimaryLabelWithAction
        icon={<EditFilled className={styles.editIcon} />}
        text={sectionTitles[stepIndex].title}
        num={sectionTitles[stepIndex].num}
        className={styles.label}
        onActionClick={goToStep(stepIndex)}
        stepKey={stepInfo[stepIndex].key}
      />
    ),
    [goToStep],
  );

  return (
    <>
      <Title level={4} className={styles.title}>
        Review New Investment Set Up Details:
      </Title>
      <section className={styles.reviewSection}>
        {renderSectionTitle(0)}
        <GeneralInformation />
      </section>
      <section className={styles.reviewSection}>
        {renderSectionTitle(1)}
        <Metrics />
      </section>
      <section className={styles.reviewSection}>
        {renderSectionTitle(4)}
        <ReportedDataTableSetup />
      </section>
      <section className={styles.reviewSection}>
        {renderSectionTitle(5)}
        <Library />
      </section>
      <section className={styles.reviewSection}>
        {renderSectionTitle(6)}
        <Notifications />
      </section>
    </>
  );
};
