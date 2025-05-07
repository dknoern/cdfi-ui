import { SubscriberEditFormData, Subscriber } from 'types';

export type EditableSubscriber = SubscriberEditFormData & { id?: Subscriber['id'] };