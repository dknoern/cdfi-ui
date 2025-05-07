import React, { ReactNode } from 'react';
import { FormStepObject } from 'types';

export interface FormState {
  step: number; // step index
  nextAvailableFor: number[];
}

export type FormAction =
  | { type: 'goToStep'; step: number }
  | { type: 'goNext' }
  | { type: 'goPrev' }
  | { type: 'reset' }
  | { type: 'available'; step: number }
  | { type: 'unavailable'; step: number }
  | { type: 'toggle'; step: number };

export interface FormContext {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}

export interface FormConfigObj {
  title: ReactNode;
  steps: FormStepObject[];
  stepContext: React.Context<FormContext>;
  onFinish: () => void;
  formId: string;
}

export const initialState: FormState = { step: 0, nextAvailableFor: [] };

export const initialContext: FormContext = {
  state: initialState,
  dispatch: (): void => undefined,
};

const updateStep = (
  nextAvailableFor: number[],
  step: number,
  status?: boolean,
): number[] => {
  const currentValue = nextAvailableFor.includes(step) || false;

  if (typeof status === 'undefined') {
    return updateStep(nextAvailableFor, step, !currentValue);
  }

  if ((status && currentValue) || (!status && !currentValue))
    return nextAvailableFor;

  if (status) {
    return [...nextAvailableFor, step];
  }
  return nextAvailableFor.filter((item) => item !== step);
};

export const formStateReducer: React.Reducer<FormState, FormAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'goToStep':
      return { ...state, step: action.step };
    case 'goNext':
      return { ...state, step: state.step + 1 };
    case 'goPrev':
      return { ...state, step: state.step - 1 };
    case 'reset':
      return initialState;
    case 'available':
      return {
        ...state,
        nextAvailableFor: updateStep(state.nextAvailableFor, action.step, true),
      };
    case 'unavailable':
      return {
        ...state,
        nextAvailableFor: updateStep(
          state.nextAvailableFor,
          action.step,
          false,
        ),
      };
    case 'toggle':
      return {
        ...state,
        nextAvailableFor: updateStep(state.nextAvailableFor, action.step),
      };
    default:
      return state;
  }
};
