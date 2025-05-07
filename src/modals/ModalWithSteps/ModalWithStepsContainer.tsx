import React, { FC, useReducer, useMemo, useCallback } from 'react';
import { VoidFn } from 'types';
import { formStateReducer, initialState } from 'forms/multiStepForms/shared';
import { ModalCommonProps, StepClickFn } from './types';
import { ModalWithSteps } from './ModalWithSteps';

type ModalWithStepsContainerProps = ModalCommonProps & {
  secondaryAction?: VoidFn;
  afterClose?: VoidFn;
};

export const ModalWithStepsContainer: FC<ModalWithStepsContainerProps> = (
  props,
) => {
  const [state, dispatch] = useReducer(formStateReducer, initialState);

  const { formConfig, afterClose, secondaryAction, ...rest } = props;
  const { stepContext } = formConfig;
  const { Provider } = stepContext;

  const handleReturnClick = useCallback<VoidFn>(() => {
    dispatch({ type: 'goToStep', step: state.step - 1 });
  }, [state.step]);

  const handleStepClick = useCallback<StepClickFn>(
    (step) => {
      if (state.step !== step) {
        dispatch({ type: 'goToStep', step });
      }
    },
    [state.step],
  );

  const handleAfterClose = useCallback<VoidFn>(() => {
    if (afterClose) afterClose();

    dispatch({ type: 'reset' });
  }, [afterClose]);

  const renderedStage = useMemo<React.ReactNode>(() => {
    return formConfig.steps[state.step].component;
  }, [formConfig.steps, state.step]);

  const nextEnabled = useMemo<boolean>(() => {
    return state.nextAvailableFor.includes(state.step);
  }, [state.nextAvailableFor, state.step]);

  return (
    <Provider value={{ state, dispatch }}>
      <ModalWithSteps
        formConfig={formConfig}
        currentStepIndex={state.step}
        nextEnabled={nextEnabled}
        handleReturnClick={handleReturnClick}
        handleStepClick={handleStepClick}
        onSecondaryButtonClick={secondaryAction}
        afterClose={handleAfterClose}
        {...rest}
      >
        {renderedStage}
      </ModalWithSteps>
    </Provider>
  );
};
