import { UserEditFormData } from 'types';
import { userStore } from 'store';

export const userCreateDefaultValues: UserEditFormData = {
  name: '',
  surname: '',
  title: '',
  phone: '',
  email: '',
  enabled: true,
  role: userStore.info.auth,
  notes: '',
  firstName: '',
  lastName: '',
  isActive: true,
};
