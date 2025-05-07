import React from 'react';
import { typography } from 'constants/typography';
import { FormConfigObj } from 'forms/multiStepForms/shared';
import { formName, stepInfo } from './constants';
import {
  SelectTemplate,
  GeneralInfo,
  SelectMetrics,
  MakeEquations,
  FormatTable,
  FormatChart,
} from './steps';
import { stepContext } from './context';

const { createTitle, editTitle } = typography('chartsSetup');

const components = [
  SelectTemplate,
  GeneralInfo,
  SelectMetrics,
  MakeEquations,
  FormatTable,
  FormatChart,
];

export const formConfig = (isEdit: boolean): FormConfigObj => ({
  title: isEdit ? editTitle : createTitle,
  steps: stepInfo.slice(isEdit ? 1 : 0).map((stepItem, index) => {
    const Component = components[isEdit ? index + 1 : index];

    return {
      ...stepItem,
      component: <Component isEdit={isEdit} />,
    };
  }),
  stepContext,
  onFinish: (): void => undefined,
  formId: formName,
});
