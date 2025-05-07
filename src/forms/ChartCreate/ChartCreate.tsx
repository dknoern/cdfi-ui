import React, { FC, useState, useCallback, useMemo, useEffect } from 'react';
import { VoidFn } from 'types';
import { GraphMeta } from 'types/graphs';
import { uiText } from 'constants/uiText';
import { typography } from 'constants/typography';
import { ModalTypes } from 'constants/ui';
import { showAPIError } from 'tools/APITools';
import { showFormHideConfirmation } from 'tools/formTools';
import { ModalWithSteps, NotificationModal } from 'modals';
import { workDataStore } from 'store';
import { graphs } from 'dataManagement/graphs';
import { formConfig } from './formConfig';
import { store } from './store';
import { metricsStore } from './metricsStore';

const { finalMessageCreate, finalMessageEdit } = typography('chartsSetup');

const resetData = (): void => {
  store.reset();
  metricsStore.reset();
};

type ChartCreateProps = {
  graphId: GraphMeta['id'] | null;
  onHide: VoidFn;
  reload: VoidFn;
};

export const ChartCreate: FC<ChartCreateProps> = ({
  onHide,
  graphId,
  reload,
}) => {
  const [finished, setFinished] = useState<boolean>(false);

  const onClose = useCallback(() => {
    onHide();
    resetData();
  }, [onHide]);

  const handleHide = useCallback(() => {
    showFormHideConfirmation(onClose);
  }, [onClose]);

  const handleFinish = useCallback(async () => {
    try {
      const setData = {
        ...store.data,
        portfolioId: workDataStore.viewModeConfig.portfolioId,
      };

      if (graphId) {
        await graphs.edit(graphId, setData);
      } else {
        await graphs.create(setData);
      }

      resetData();
      setFinished(true);
    } catch (e) {
      showAPIError(uiText('graphs', 'createError'))(e);
    }
  }, [graphId]);

  const finishAfterMess = useCallback(() => {
    resetData();
    reload();
    onHide();
  }, [onHide, reload]);

  const config = useMemo(() => {
    return formConfig(!!graphId);
  }, [graphId]);

  // Reset all stores data on modal with steps destroying
  useEffect(() => resetData, []);

  if (finished) {
    return (
      <NotificationModal
        title={graphId ? finalMessageEdit : finalMessageCreate}
        type={ModalTypes.Success}
        isVisible
        buttonsConfig={[
          {
            action: finishAfterMess,
            key: 'primary',
            text: 'Got it!',
            id: 'okButton',
            type: 'primary',
          },
        ]}
      />
    );
  }

  return (
    <ModalWithSteps
      visible
      onHide={handleHide}
      onFinish={handleFinish}
      formConfig={config}
    />
  );
};
