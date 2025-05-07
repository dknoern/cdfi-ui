export interface Subscriber {
  id: number;
  name: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  phoneExtension: string;
  fax: string;
  website: string;
  isActive: boolean;
  hideActivity: boolean;
  reportAllRows: boolean;
}

export type SubscriberEditFormData = Pick<
Subscriber,
  | 'name'
  | 'address'
  | 'address2'
  | 'city'
  | 'state'
  | 'zip'
  | 'phone'
  | 'phoneExtension'
  | 'fax'
  | 'website'
  | 'isActive'
  | 'hideActivity'
  | 'reportAllRows'
>;
