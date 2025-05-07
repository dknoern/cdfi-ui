import React, {FC, useCallback, useEffect, useState} from 'react';
import {IEmailReminders, IEmailTrigger, VoidFn} from 'types';
import {systemEmailStore} from 'store';
import { SystemEmailForm } from './SystemEmailForm';
import { createEmailTemplate } from 'dataManagement/operations/emailOperations';
import {observer} from 'mobx-react';
import {toJS} from "mobx";
import {textWithLine} from "../../../../../../tools";
import {PageSectionWrapper,} from '../../../../../../components';
import {actionButtons} from "./actionButtons";
import {useHistory} from "react-router-dom";
import {ConfirmModal} from "../ConfirmModal/ConfirmModal";

type SystemEmailProps = { onFinish: VoidFn; };

export const SystemEmail: FC<SystemEmailProps> = observer(({onFinish,}) => {
  const formId = 'MANAGE_SYSTEM_EMAIL';
  const history = useHistory();
  const [isCloseModalEmail, setIsCloseModalEmail] = useState<any>(false);
  const {
    isEditForm,
    setIsEditForm,
    setIsEditCustomEmail,
    getEmailCategories,
    emailCategories,
    getSenderEmails,
  } = systemEmailStore;

  useEffect(() => {
    getEmailCategories();
    getSenderEmails();
  },[])

  const getReminderType = (reminders:IEmailReminders[], value: string) => {
    return reminders.find(item => item?.description === value)?.reminderType
  }

  const getTriggerType = (trigger:IEmailTrigger[], value: string) => {
    return toJS(trigger).find(item => item?.description === value)?.triggerType
  }

  const saveHandler = useCallback(
    (values: any) => {
      const {
        setIsEditCustomEmail,
        reminders,
        trigger,
        isEditCustomEmail,
        getUpdateSystemEmail,
        ccEmailList,
        bccEmailList,
        senderEmails,
        emailCategories
      } = systemEmailStore;

      const data = {
        "id": values.id,
        "emailCategoryId": typeof values.emailCategoryId === 'string' ? emailCategories.find((item) => item.name === values.emailCategoryId )?.id : values.emailCategoryId,
        "subject": values.subject,
        "text": textWithLine(values.text).replaceAll('<p', '<p style="margin: 0 !important"'),
        "triggerType": getTriggerType(trigger, values.triggerType),
        "dependentOn": getReminderType(reminders, values.dependentOn),
        "numberOfDays": values.numberOfDays,
        "isBeforeDate": values.isBeforeDate === 'on' ? true : values.isBeforeDate,
        "isEnabled": values.isEnabled ?? false,
        'recipientGroup': values.recipientGroup,
        'ccEmailList': ccEmailList,
        'bccEmailList': bccEmailList,
        'emailSenderId': typeof values.senderEmail === 'string' ?  senderEmails.find((item) => item.email === values.senderEmail)?.id : values.senderEmail,
      }

      const proceedSave = (): ReturnType<any> => createEmailTemplate(data);
      if(isEditCustomEmail && data?.id !== null) {
        getUpdateSystemEmail(data).then(onFinish);
        setIsEditCustomEmail(false)
      } else {
        proceedSave().then(onFinish);
      }
      history.goBack();
    },
    [onFinish],
  );

  const goBack = () => {
    if(isEditForm) {
      setIsCloseModalEmail(true);
    } else {
      setIsEditCustomEmail(false)
      history.goBack()
    }
  }

  const closeConfirmEditManageEmail = async () => {
    setIsEditForm(false);
    setIsCloseModalEmail(false);
    setIsEditCustomEmail(false)
    history.goBack()
  }

  return (
    <PageSectionWrapper
      title="Manage Email"
      actionButtons={actionButtons(goBack)}
    >
      <SystemEmailForm onFinish={saveHandler} formId={formId} onCancel={goBack}/>
      <ConfirmModal
        visible={isCloseModalEmail}
        onClose={(): void => setIsCloseModalEmail(false)}
        onClick={closeConfirmEditManageEmail}
        text='Do you really want to cancel? All data entered will be lost.'
        buttonText="Yes"
      />
    </PageSectionWrapper>
  );
})
