import React from 'react';
import { formName, stepInfo } from './constants';
import { stepContext } from './context';
import {
  CompanyInfo,
  AssignMetrics,
  CustomizeMetrics,
  CompanyLibrarySetup,
  NotificationsSetup,
  CompanyReview,
  ReportedDataTableSetup,
} from './steps';

const components = [
  <CompanyInfo />,
  <AssignMetrics />,
  <CustomizeMetrics />,
  <ReportedDataTableSetup />,
  <CompanyLibrarySetup />,
  <NotificationsSetup />,
  <CompanyReview />,
];
export const formConfig = {
  title: 'Set up a new Reporting Entity',
  steps: stepInfo.map((stepItem, index) => ({
    ...stepItem,
    component: components[index],
  })),
  stepContext,
  onFinish: (): void => undefined,
  formId: formName,
};
