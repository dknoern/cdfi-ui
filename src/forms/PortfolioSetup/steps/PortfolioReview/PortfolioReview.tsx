import React, { FC, useCallback, useContext, useEffect } from 'react';
import { Typography } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { FormPrimaryLabelWithAction } from 'components';
import { stepInfo } from 'forms/PortfolioSetup/constants';
import { stepContext } from 'forms/PortfolioSetup/context';
import { sectionTitles } from './constants';
import { MetricsReview } from '../CustomizeMetrics';
import { TablesReview } from '../TablesAndCharts';
import General from '../GeneralInfo/Review';
import styles from './PortfolioReview.module.scss';

const { Title } = Typography;

export const PortfolioReview: FC = () => {
  const { state, dispatch: dispatchStep } = useContext(stepContext);
  const STEP_IDX = state.step;

  useEffect(() => {
    dispatchStep({ type: 'available', step: STEP_IDX });
  }, [dispatchStep, STEP_IDX]);

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
        <General />
      </section>
      <section className={styles.reviewSection}>
        {renderSectionTitle(1)}
        <MetricsReview />
      </section>
      <section className={styles.reviewSection}>
        {renderSectionTitle(3)}
        <TablesReview />
      </section>
    </>
  );
};
