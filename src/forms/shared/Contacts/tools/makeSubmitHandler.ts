import {
  VoidFn,
  CdfiContactEditFormData,
  CdfiContact,
  PersonRole,
  SubscriberContact,
  SubscriberContactEditFormData,
} from 'types';
import { AntFieldProps } from 'types/form';

type HandlerDeps = AntFieldProps<CdfiContact[]> & {
  editingContact: null | CdfiContactEditFormData | undefined;
  finishContactEdit: VoidFn;
};

export const makeSubmitHandler = (deps: HandlerDeps) => {
  const { onChange, value, editingContact, finishContactEdit } = deps;

  return (newValues: CdfiContactEditFormData): void => {
    if (!onChange) return;
    let toSet = value ? [...value] : [];
    const isPubliContactVal = newValues.isPublicContact ? true : false;
    const uploadRemindersVal = newValues.uploadReminders ? true : false;
    const isActiveVal = newValues.isActive ? true : false;

    if (editingContact) {
      toSet = toSet.map((item) => {
        return item.id === editingContact.id
          ? {
              ...item,
              ...newValues,
              role: PersonRole.ANALYST,
            }
          : {
              ...item,
              role: PersonRole.ANALYST,
            };
      });
    } else {
      toSet.push({
        ...newValues,
        enabled: true,
        id: new Date().getTime(),
        role: PersonRole.ANALYST,
        isActive: isActiveVal,
        uploadReminders: uploadRemindersVal,
        isPublicContact: isPubliContactVal,
      });
    }

    onChange(toSet);
    finishContactEdit();
  };
};

type HandlerDepsSubscriber = AntFieldProps<SubscriberContact[]> & {
  editingContact: null | SubscriberContactEditFormData | undefined;
  finishContactEdit: VoidFn;
};

export const makeSubmitHandlerSubscriber = (deps: HandlerDepsSubscriber) => {
  const { onChange, value, editingContact, finishContactEdit } = deps;

  return (newValues: SubscriberContactEditFormData): void => {
    if (!onChange) return;
    let toSet = value ? [...value] : [];
    const isActiveVal = newValues.isActive ? true : false;
    const emailRemindersVal = newValues.emailReminders ? true : false;

    if (editingContact) {
      toSet = toSet.map((item) => {
        return item.id === editingContact.id
          ? {
              ...item,
              ...newValues,
              role: PersonRole.ANALYST,
            }
          : {
              ...item,
              role: PersonRole.ANALYST,
            };
      });
    } else {
      toSet.push({
        ...newValues,
        enabled: true,
        id: new Date().getTime(),
        role: PersonRole.ANALYST,
        isActive: isActiveVal,
        emailReminders: emailRemindersVal,
      });
    }

    onChange(toSet);
    finishContactEdit();
  };
};
