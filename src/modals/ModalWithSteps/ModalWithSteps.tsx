import React, { FC } from 'react';
import { Modal, Typography, Steps, Row, Col, Button } from 'antd';
import { VoidFn } from 'types';
import { generateFormId } from 'tools/formTools';
import { ModalCommonProps, StepClickFn } from './types';
import styles from './ModalWithSteps.module.scss';

type ModalWithStepsViewProps = ModalCommonProps & {
  currentStepIndex: number;
  nextEnabled: boolean;
  handleReturnClick: VoidFn;
  handleStepClick: StepClickFn;
  onSecondaryButtonClick?: VoidFn;
  afterClose: VoidFn;
};

export const ModalWithSteps: FC<ModalWithStepsViewProps> = ({
  visible,
  currentStepIndex,
  nextEnabled,
  children,
  handleReturnClick,
  handleStepClick,
  onSecondaryButtonClick,
  onHide,
  onFinish,
  afterClose,
  formConfig,
}) => {
  const { steps, title, formId } = formConfig;
  const isLastStep = currentStepIndex === steps.length - 1;

  return (
    <Modal
      visible={visible}
      onCancel={onHide}
      afterClose={afterClose}
      destroyOnClose
      centered
      width="100%"
      wrapClassName={styles.modalWrap}
      title={
        <>
          <Typography.Title level={3} className={styles.titleText}>
            {title}
          </Typography.Title>
          <Steps current={currentStepIndex}>
            {steps.map(({ key, title: stepTitle }, index) => (
              <Steps.Step
                key={key}
                title={stepTitle}
                onClick={(): void => handleStepClick(index)}
                className={styles.step}
              />
            ))}
          </Steps>
        </>
      }
      footer={
        <Row justify="space-between" align="middle">
          <Col>
            {currentStepIndex > 0 && (
              <Button
                id="returnButton"
                htmlType="button"
                type="default"
                size="large"
                className={styles.defaultBtn}
                onClick={handleReturnClick}
              >
                Return
              </Button>
            )}
          </Col>
          <Col>
            {onSecondaryButtonClick && (
              <Button
                id="saveAndFinishButton"
                htmlType="button"
                type="default"
                size="large"
                className={styles.defaultBtn}
                onClick={onSecondaryButtonClick}
              >
                Save & Finish later
              </Button>
            )}
            <Button
              id="nextButton"
              type="primary"
              size="large"
              className={styles.primaryBtn}
              disabled={!nextEnabled}
              onClick={isLastStep ? onFinish : undefined}
              htmlType="submit"
              form={generateFormId(formId, currentStepIndex)}
            >
              {isLastStep ? 'Finish' : 'Next'}
            </Button>
          </Col>
        </Row>
      }
    >
      {children}
    </Modal>
  );
};
