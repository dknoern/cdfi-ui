import React, { FC, useCallback, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Contact } from 'types/company';
import { FormStep } from 'forms/PCCreate/types';
import { stepContext } from 'forms/PCCreate/context';
import { formStore } from 'forms/PCCreate/formStore';
import { CompanyInfoForm } from 'forms/CompanyInfoForm';
import { GeneralInfoFormModel } from 'forms/CompanyInfoForm/types';
import { formName } from 'forms/PCCreate/constants';
import { generateFormId } from 'tools/formTools';
import { initialValues } from './constants';

const CURRENT_STEP = FormStep.generalInfo;

export const CompanyInfoFn: FC = () => {
  const { state, dispatch: dispatchStep } = useContext(stepContext);

  useEffect(() => {
    dispatchStep({ type: 'available', step: 0 });
  }, [dispatchStep]);

  const handleFormValuesChange = useCallback((_, values) => {
    // Reset selected contact email for initial notification
    // if it is not primary contact (doesn't have id) or no longer exists
    const notificationsSetup = formStore.data.notificationsSetup as any;

    if (
      notificationsSetup?.forPC?.initial?.email &&
      !values.additionalContacts.find(
        (item: Contact) =>
          item.id === notificationsSetup?.forPC?.initial?.email,
      )
    ) {
      formStore.setData(FormStep.notificationsSetup, {
        ...notificationsSetup,
        initial: {
          ...notificationsSetup?.forPC?.initial,
          email: undefined,
        },
      });
    }

    if (
      (notificationsSetup?.forPC?.pastDue?.email ||
        notificationsSetup?.forPC?.upcoming?.email) &&
      !values.additionalContacts.find(
        (item: Contact) =>
          item.id === notificationsSetup?.forPC?.pastDue?.email ||
          item.id === notificationsSetup?.forPC?.upcoming?.email,
      )
    ) {
      formStore.setData(FormStep.notificationsSetup, {
        ...notificationsSetup,
        forPC: {
          ...notificationsSetup?.forPC,
          pastDue: {
            ...notificationsSetup?.forPC?.pastDue,
            email: undefined,
          },
          upcoming: {
            ...notificationsSetup?.forPC?.upcoming,
            email: undefined,
          },
        },
      });
    }

    formStore.setData(CURRENT_STEP, {
      ...values,
      additionalContacts: (values.additionalContacts || []).map(
        (
          { name, surname, email, title }: { [key: string]: string },
          idx: number,
        ) => ({
          id: idx + 1, // add IDs to additional contacts to identify them
          name,
          surname,
          email,
          title,
        }),
      ),
    });
  }, []);

  const handleNextClick = useCallback(() => {
    dispatchStep({ type: 'goNext' });
  }, [dispatchStep]);

  return (
    <CompanyInfoForm
      formId={generateFormId(formName, state.step)}
      onFinish={handleNextClick}
      onValuesChange={handleFormValuesChange}
      initialValues={
        formStore.data[CURRENT_STEP]
          ? ((formStore.data[CURRENT_STEP] as unknown) as GeneralInfoFormModel)
          : initialValues
      }
    />
  );
};

export const CompanyInfo = observer(CompanyInfoFn);
