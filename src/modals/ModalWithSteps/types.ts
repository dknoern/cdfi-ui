import { MouseEvent } from 'react';
import { VoidFn } from 'types/misc';
import { FormConfigObj } from 'forms/multiStepForms/shared';

export interface ModalCommonProps {
  visible: boolean;
  formConfig: FormConfigObj;
  onHide: (event: MouseEvent) => void;
  onFinish: VoidFn;
}

export type StepClickFn = (step: number) => void;
