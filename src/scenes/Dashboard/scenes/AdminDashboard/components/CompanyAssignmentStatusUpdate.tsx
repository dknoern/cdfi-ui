import React, { FC } from 'react';
import { notifyUser } from 'tools';
import { handleServerFormError } from 'tools/formTools';
import { recentActivitiesStore } from 'store';
import { ModalWithForm } from 'modals';
import { CompanyAssignmentStatusEditForm } from 'forms/AdminForms/CompanyAssignmentStatusEditForm';
import { MODAL_WIDTH } from 'constants/ui';
import { FormSubmitFn } from 'types/form';
import { CompanyDataVarianceStatus } from 'types/dataVarianceStatus';

const FORM_ID = 'StatusAssignment';

type CompanyAssignmentStatusUpdatetProps = {
  isVisible: boolean;
  onCancel: () => void;
  formData: CompanyDataVarianceStatus | undefined;
  onFinish: () => void;
};

export const CompanyAssignmentStatusUpdate: FC<
  CompanyAssignmentStatusUpdatetProps
> = ({ isVisible, onCancel, formData, onFinish }) => {
  const { updateUserAssignmentDataVariance } = recentActivitiesStore;

  const coAssignment = formData ? formData.companyAssignmentStatus : undefined;

  const onSubmit: FormSubmitFn =
    (form) =>
    (values: any): void => {
      const payload = {
        companyId: coAssignment?.companyId,
        fiscalYear: coAssignment?.fiscalYear,
        fiscalQuarter: coAssignment?.fiscalQuarter,
        assignmentStatus: values.assignmentStatus,
        assigned: values.assigned.map((id: number) => ({ id })),
      };

      updateUserAssignmentDataVariance(payload)
        .then(() => {
          notifyUser.ok('dataVarianceRecentActivities', 'updateOk');
          onFinish();
        })
        .catch(
          handleServerFormError({
            form,
            category: 'common',
            messId: 'updateError',
          }),
        );
    };

  return (
    <ModalWithForm
      visible={isVisible}
      title="Data Variance"
      formId={FORM_ID}
      onCancel={onCancel}
      actionButtonText="Apply"
      width={MODAL_WIDTH.MEDIUM_SMALL}
    >
      <CompanyAssignmentStatusEditForm
        formId={FORM_ID}
        formData={formData}
        onSubmit={onSubmit}
      />
    </ModalWithForm>
  );
};
