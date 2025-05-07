import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { ModalWithForm } from 'modals';
import { ChoosePeriodForm } from 'forms/DataInputParts';
import { newPeriodStore } from './newPeriodStore';

const formId = 'NEW_PERIOD_CONFIG_FORM';

export const NewPeriodConfig: FC = observer(() => {
  return (
    <ModalWithForm
      visible={newPeriodStore.modalActive}
      formId={formId}
      onCancel={newPeriodStore.reset}
      title="Add Reporting Period"
      showCloseButton={false}
      forceRender={false}
    >
      <ChoosePeriodForm
        formId={formId}
        onFinish={newPeriodStore.setNewPeriodConfig}
        occupiedPeriods={newPeriodStore.occupiedPeriods}
      />
    </ModalWithForm>
  );
});
