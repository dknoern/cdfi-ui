import { CdfiContact, SubscriberContact } from 'types';
import { CdfiContactActionPerformer, SubscriberContactActionPerformer } from '../types';

const deleteFromList = (
  id: CdfiContact['id'],
  currentValue: CdfiContact[],
): CdfiContact[] => {
  const result = currentValue.filter((item) => item.id !== id).slice();

  return result;
};

export const makeActionHandlers = ({
  onChange,
  setEditingContact,
}: {
  onChange?: (newValue: CdfiContact[]) => void;
  setEditingContact: (contact: CdfiContact | undefined) => void;
}): CdfiContactActionPerformer => (
  operationName,
  id,
  currentValue,
): ReturnType<CdfiContactActionPerformer> => {

  if (!onChange) return;

  switch (operationName) {
    case 'toggleActive':
      onChange(
        currentValue.map((item) =>
          item.id === id ? { ...item, enabled: !item.enabled } : item,
        ),
      );
      break;
    case 'setPrimary':
      onChange(
        currentValue.map((item) =>
          item.id === id
            ? { ...item, primary: true }
            : { ...item, primary: false },
        ),
      );
      break;
    case 'delete':
      onChange(deleteFromList(id, currentValue));
      break;
    case 'edit':
      setEditingContact(currentValue.find((item) => item.id === id));
      break;
    default:
      break;
  }
};

const deleteFromListSubscriber = (
  id: SubscriberContact['id'],
  currentValue: SubscriberContact[],
): SubscriberContact[] => {
  const result = currentValue.filter((item) => item.id !== id).slice();

  return result;
};

export const makeActionHandlersSubscriber = ({
  onChange,
  setEditingContact,
}: {
  onChange?: (newValue: SubscriberContact[]) => void;
  setEditingContact: (contact: SubscriberContact | undefined) => void;
}): SubscriberContactActionPerformer => (
  operationName,
  id,
  currentValue,
): ReturnType<SubscriberContactActionPerformer> => {

  if (!onChange) return;

  switch (operationName) {
    case 'toggleActive':
      onChange(
        currentValue.map((item) =>
          item.id === id ? { ...item, enabled: !item.enabled } : item,
        ),
      );
      break;
    case 'setPrimary':
      onChange(
        currentValue.map((item) =>
          item.id === id
            ? { ...item, primary: true }
            : { ...item, primary: false },
        ),
      );
      break;
    case 'delete':
      onChange(deleteFromListSubscriber(id, currentValue));
      break;
    case 'edit':
      setEditingContact(currentValue.find((item) => item.id === id));
      break;
    default:
      break;
  }
};
