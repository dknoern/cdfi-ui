import React from 'react';
import { FormConfigObj } from 'forms/multiStepForms/shared';
import { formName, stepInfo } from './constants';
import { stepContext } from './context';
import {
  GeneralInfo,
  AssignMetrics,
  CustomizeMetrics,
  TablesAndCharts,
  PortfolioReview,
} from './steps';

const components = [
  <GeneralInfo />,
  <AssignMetrics />,
  <CustomizeMetrics />,
  <TablesAndCharts />,
  <PortfolioReview />,
];

export const formConfig = (isEdit: boolean): FormConfigObj => ({
  title: isEdit ? 'Edit Portfolio' : 'Set Up A New Portfolio',
  steps: stepInfo.map((stepItem, index) => ({
    ...stepItem,
    component: components[index],
  })),
  stepContext,
  onFinish: (): void => undefined,
  formId: formName,
});
